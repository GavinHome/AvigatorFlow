<template>
  <div>
    <a-form-model-item
      :label="'[' + field.title + '] = '"
      class="field-exp-label"
    >
      <p class="expression">{{ displayExpression }}</p>
      <!-- <a-icon type="minus-circle-o" @click="() => (field.expression = '')" /> -->
    </a-form-model-item>
    <a-form-model-item :wrapperCol="{ span: 16, offset: 8 }">
      <a-button type="dashed" style="width: 100%" @click="setExpression">
        <a-icon type="plus" />公式设置
      </a-button>
    </a-form-model-item>

    <SetExpression
      :field="field"
      :page="page"
      v-if="showDialog"
      @change="setCallback"
      @cancel="onCancel"
    ></SetExpression>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss">
.expression {
  color: #4693fd;
  line-height: 40px;
}
.field-exp-label {
  ::v-deep.ant-form-item-label {
    label {
      color: #4693fd;
    }
    label::after {
      content: "";
    }
  }
}
</style>
