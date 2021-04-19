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
        <a-form-item
          :key="index"
          :label="displayName(field)"
          @click.native="handleFormItemClick(index)"
          :class="
            'drag-item-display ' +
            (field.isRequired && !field.isReadonly
              ? 'field-form-item-required'
              : '')
          "
        >
          <RenderField :field="field" />
        </a-form-item>
      </div>
    </template>
    <div class="drag-item-actions">
      <slot name="actions"></slot>
    </div>
    <div
      class="single-field-container no-field-container"
      v-if="fields.length === 0 && row.fields.length === 0"
    >
      从左侧拖拽添加字段项
    </div>
  </draggable>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss">
.single-field-container {
  padding: 10px 0px;
  min-height: 90px;
}

.no-field-container {
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

.drag-item-display {
  padding: 0px 10px;
}

.drag-item-actions {
  margin: 5px;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 101;
}

.inputNumber {
  width: 100%;
}
.calendarPicker {
  width: 100%;
}
</style>
