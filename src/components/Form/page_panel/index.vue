<template>
  <a-form layout="horizontal" class="field-container form">
    <draggable
      :animation="200"
      :disabled="false"
      :list="fields"
      tag="a-row"
      @add="handleAdd"
      @change="changed"
      :sort="false"
      :group="{ name: 'widgets', pull: false, put: draggable }"
      :ghostClass="'draggable-ghost'"
    >
      <div class="empty-placeholder" v-if="fields.length === 0">
        从左侧拖拽添加字段项
      </div>

      <template v-else>
        <a-col :span="22" v-for="(field, index) of fields" :key="index">
          <a-form-item
            :key="index"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            @click.native="handleFormItemClick(index)"
          >
            <template #label>
              <slot name="label">
                <span>
                  {{ field.name }}
                  <a-tooltip :title="field.prompt" v-if="field.prompt">
                    <a-icon type="question-circle-o" />
                  </a-tooltip>
                </span>
              </slot>
            </template>
            <RenderField :field="field" />
            <slot></slot>
          </a-form-item>
        </a-col>
      </template>
    </draggable>
  </a-form>
</template>

<script lang="ts" src="./index.tsx"></script>
<style scoped lang="scss">
// @import url("../common/style.scss");
.empty-placeholder {
  text-align: center;
  margin: 25% auto;
  min-height: 100px;
  line-height: 100px;
  border: 1px dashed #888;
}

.field-container {
  // margin: 25% auto;
  min-height: 250px;
  line-height: 250px;
  // border: 1px dashed #888;
  // padding: 30px 0px;
}

.inputNumber {
  width: 100%;
}
.calendarPick {
  width: 100%;
}
// .old-drag-item
//     opacity: 0.5
// .green {
//   color: $green-color;
// }
// .red {
//   color: $red-color;
// }
</style>
