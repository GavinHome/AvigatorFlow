<template>
  <draggable
    :group="{ name: 'fields', pull: true, put: fields.length <= 1 }"
    filter=".undraggable"
    :list="fields"
    :sort="true"
    @add="handleAdd"
    @change="changed"
    :ghostClass="'draggable-ghost'"
    handle=".drag-item"
  >
    <template v-for="(field, index) of fields">
      <div :class="'single-field-container drag-item'" :key="index">
        <RenderField v-if="field.type === 'Description'" :field="field" />
        <a-form-item
          v-else
          :key="index"
          :label="displayName(field)"
          @click.native="handleFormItemClick(index)"
          :class="
            'p-form-field ' +
            (field.isRequired && !field.isReadonly
              ? 'p-form-field-required'
              : '')
          "
        >
          <RenderField :field="field" />
        </a-form-item>
      </div>
    </template>
    <div class="p-field-actions">
      <slot name="actions"></slot>
    </div>
    <div
      class="single-field-container p-empty-field"
      v-if="fields.length === 0 && row.fields.length === 0"
    >
      从左侧拖拽添加字段项
    </div>
  </draggable>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss">
@import "../../form.scss";
.single-field-container {
  padding: 10px 0px;
  min-height: 90px;
}

.p-empty-field {
  min-height: 90px;
  text-align: center;
  padding: 34px 0px;
}

.drag-item {
  min-height: 90px;
  &:hover {
    border: 1px dashed #1890ff;
  }
}

.p-form-field {
  padding: 0px 10px;
}

.p-field-actions {
  margin: 5px;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 101;
}

.p-form-field-required {
  ::v-deep.ant-form-item-label {
    label {
      &::before {
        display: inline-block;
        margin-right: 4px;
        color: #f5222d;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
        content: "*";
      }
    }
  }
}
</style>
