<template>
  <div>
    <a-form-model
      labelAlign="right"
      :rules="rules"
      :ref="formRef"
      :model="field"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <Card>
        <template #title> 基本属性 </template>
        <a-row>
          <a-col :span="24">
            <a-form-model-item has-feedback label="标题" prop="title">
              <a-input
                v-model="field.title"
                type="input"
                autocomplete="off"
                :maxLength="INPUT_MAX_LENGTH_15"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="标识" prop="code">
              <a-input
                v-model="field.code"
                type="input"
                autocomplete="off"
                :maxLength="INPUT_MAX_LENGTH_10"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="提示" prop="prompt">
              <a-input
                v-model="field.prompt"
                type="input"
                :maxLength="INPUT_MAX_LENGTH_50"
                autocomplete="off"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="描述" prop="description">
              <a-textarea
                v-model="field.description"
                type="input"
                autocomplete="off"
                :maxLength="INPUT_MAX_LENGTH_50"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="占比" prop="isRequired">
              <FieldColumnSetting v-model="field.cols" :disabled="readonly" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="是否必填" prop="isRequired">
              <a-switch
                checked-children="是"
                un-checked-children="否"
                v-model="field.isRequired"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="是否只读" prop="isReadonly">
              <a-switch
                checked-children="是"
                un-checked-children="否"
                v-model="field.isReadonly"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="是否多选"
              prop="setting.isMultipleSelect"
            >
              <a-switch
                checked-children="是"
                un-checked-children="否"
                v-model="field.setting.isMultipleSelect"
                :disabled="readonly"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </Card>
      <Card>
        <template #title> 数据源 </template>
        <!-- <a-row>
          <a-col :span="24">
            <DataSourceConfig :field="field" :disabled="readonly" />
          </a-col>
        </a-row> -->
      </Card>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { WidgetSchema } from "../../common/model";
import Card from "../../common/card.vue";
import FieldColumnSetting from "./field_column_setting.vue";
import FormMixin from "../minxins/formMixin";

@Component({
  components: {
    Card,
    FieldColumnSetting,
  },
})
export default class LabelProperty extends Mixins(FormMixin) {
  @Prop() field!: WidgetSchema;
  @Prop() readonly!: boolean;
  formRef = "form";
  rules = !this.readonly
    ? {
        // title: [this.getRequireRule("请输入标题"), this.getNonSpaceRule()],
        // code: [
        //   this.getRequireRule("请输入标识"),
        //   this.getRemoteRule(API_FIELD_CHECK_CODE, this.field, "标识重复"),
        //   this.getNonChineseRule(),
        //   this.getNonSpaceRule(),
        // ],
        // "setting.dataSourceType": [this.getRequireRule("请选择数据来源")],
        // "setting.sourceTypeId": [this.getRequireRule("请选择基础参数")],
      }
    : {};
}
</script>
<style scoped lang="scss">
@import "../../common/style.scss";
</style>
