<template>
  <div>
    <a-form-model-item
      v-bind="
        index === 0 ? { span: 16 } : { wrapperCol: { span: 16, offset: 8 } }
      "
      v-for="(option, index) in field.setting.options"
      :key="index"
      :label="index === 0 ? '选项' : ''"
      :prop="'setting.options.' + index + '.value'"
      :rules="
        !disabled
          ? [
              { required: true, message: '选项不能为空', trigger: 'blur' },
              getNonSpaceRule(),
              getArrayOptionUniqueRule('选项已存在'),
            ]
          : []
      "
    >
      <a-input
        v-model="option.value"
        placeholder="请输入选项"
        style="width: 85%; margin-right: 8px"
        :disabled="disabled"
        @change="option.text = option.value"
      />
      <a-icon
        v-if="field.setting.options.length > 1 && !disabled"
        type="minus-circle-o"
        :disabled="field.setting.options.length === 1"
        @click="removeOption(option)"
      />
    </a-form-model-item>
    <a-form-model-item :wrapperCol="{ span: 16, offset: 8 }" v-if="!disabled">
      <a-button type="dashed" style="width: 100%" @click="addOption">
        <a-icon type="plus" />添加选项
      </a-button>
    </a-form-model-item>
  </div>
</template>

<script lang="ts" src="./simpleDataSource.ts"></script>
