<template>
  <Dialog
    :visible="true"
    :width="dialogWidth"
    :height="dialogHeight"
    :title="`【${this.field.title}】公式设置`"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div class="field-expression">
      <a-skeleton avatar active :loading="loading">
        <template>
          <Card :bodyStyle="{ 'min-height': '250px' }">
            <template #title>
              公式编辑
              <span style="font-size: 12px; color: #4693fd"
                >（字段最多可选择{{ MAX_FIELDS_NUMBER }}项）</span
              >
              <a-button
                type="dash"
                size="small"
                style="float: right"
                @click="clearAll"
              >
                <a-icon type="delete" />清除所有
              </a-button>
            </template>
            <div
              class="expressionPreview"
              v-for="(item, index) in exps"
              :key="index"
            >
              <div
                class="expssionItem marginRight"
                v-if="item.type !== 'Number'"
              >
                <a-button
                  type="link"
                  v-if="!item.editable"
                  @click="setExp(item)"
                  >{{ item.name }}</a-button
                >
                <ExpSource
                  :value="item.value"
                  :field="field"
                  :page="page"
                  @change="(val) => onUpdate(item, val)"
                  v-if="item.editable"
                />
                <a class="delete" @click="onDelete(index)">x</a>
              </div>

              <div class="expssionItem marginRight" v-else>
                <a-input-number
                  :max="INPUT_NUMBER_MAX"
                  v-model="item.value"
                  @change="onNumberChange"
                />
                <a class="delete" @click="onDelete(index)">x</a>
              </div>
            </div>
            <div class="addExpression" v-if="showAdd">
              <a-tooltip>
                <template slot="title">添加公式项或运算符号</template>
                <a-icon
                  type="plus-circle"
                  class="userAdd expssionPlus"
                  @click="showSelect = true"
                  v-if="!showSelect"
                  :style="!showSelect ? 'padding:10px' : ''"
                ></a-icon>
                <div class="expssionPlus" v-if="showSelect">
                  <a-select
                    showArrow
                    showSearch
                    :filterOption="false"
                    :placeholder="'搜索'"
                    @search="fetchData"
                    @change="onAdd"
                  >
                    <a-spin
                      v-if="fetching"
                      slot="notFoundContent"
                      size="small"
                    />
                    <!-- <a-select-option
                        v-for="option in options"
                        :key="option.value"
                      >{{ `${option.name}${option.unit ? '（' + option.unit + '）' : ''}` }}</a-select-option>-->

                    <a-select-opt-group
                      label="字段"
                      v-if="
                        options.filter((x) => x.type === 'Field').length > 0
                      "
                    >
                      <a-select-option
                        v-for="option in options.filter(
                          (x) => x.type === 'Field'
                        )"
                        :key="option.value"
                        >{{
                          `${option.name}${
                            option.unit ? "（" + option.unit + "）" : ""
                          }`
                        }}</a-select-option
                      >
                    </a-select-opt-group>

                    <a-select-opt-group
                      label="自定义"
                      v-if="
                        options.filter((x) => x.type === 'Number').length > 0
                      "
                    >
                      <a-select-option
                        v-for="option in options.filter(
                          (x) => x.type === 'Number'
                        )"
                        :key="option.value"
                        >{{ `${option.name}` }}</a-select-option
                      >
                    </a-select-opt-group>

                    <a-select-opt-group
                      label="运算"
                      v-if="options.filter((x) => x.type === 'Ops').length > 0"
                    >
                      <a-select-option
                        v-for="option in options.filter(
                          (x) => x.type === 'Ops'
                        )"
                        :key="option.value"
                        >{{ `${option.name}` }}</a-select-option
                      >
                    </a-select-opt-group>
                  </a-select>
                  <a class="delete" @click="showSelect = false">x</a>
                </div>
              </a-tooltip>
            </div>
          </Card>

          <Card title="动态预览">
            <a-row>
              <a-col :span="24">
                <div class="expressionPreview">
                  <div class="expssionItem marginRight">
                    {{ "[" + field.title + "] = " }}
                  </div>
                </div>

                <div class="expressionPreview" v-if="exps.length">
                  <div class="expssionItem marginRight">
                    <span
                      style="margin-left: 5px"
                      v-for="(item, index) in exps"
                      :key="index"
                      >{{
                        item.type === "Field"
                          ? "[" + item.name + "]"
                          : item.type === "Number"
                          ? item.value
                          : item.name
                      }}</span
                    >
                  </div>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <div class="error" v-if="showError">
                  公式设置有误，请修改！可能的错误原因：括号不闭合；运算项和运算符号设置不合理；除数存在0；两字段项之间没有运算符号；数字框为空；公式为空；
                </div>
              </a-col>
            </a-row>
          </Card>
        </template>
      </a-skeleton>
    </div>
  </Dialog>
</template>

<script lang="ts" src="./setExpression.ts"></script>
<style scoped lang="sass" src="./setExpression.sass"></style>
