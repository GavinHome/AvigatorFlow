<!--
  - Copyright (c) QJJS. All rights reserved.
  - ProjectName: Qjps.Configuration.Web
  - FileName : labelProperty.vue
  - Author : yangxiaomin
  - Date : 2020-06-09 08:02:43
  -->

<template>
  <div>
    <a-form-model
      labelAlign="right"
      :rules="rules"
      :ref="formRef"
      :model="selectItem"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <Card>
        <template #title> 基本属性 </template>
        <a-row>
          <a-col :span="24">
            <a-form-model-item has-feedback label="标题" prop="title">
              <a-input
                v-model="selectItem.title"
                type="input"
                autocomplete="off"
                :maxLength="INPUT_MAX_LENGTH_15"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="标识" prop="code">
              <a-input
                v-model="selectItem.code"
                type="input"
                autocomplete="off"
                :maxLength="INPUT_MAX_LENGTH_10"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="提示" prop="prompt">
              <a-input
                v-model="selectItem.prompt"
                type="input"
                :maxLength="INPUT_MAX_LENGTH_50"
                autocomplete="off"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="描述" prop="description">
              <a-textarea
                v-model="selectItem.description"
                type="input"
                autocomplete="off"
                :maxLength="INPUT_MAX_LENGTH_50"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="字段列宽" prop="isRequired">
              <FieldColumnSetting v-model="selectItem.column" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </Card>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { WidgetSchema } from "../../common/model";
import Card from "../../common/card.vue";
import FieldColumnSetting from "./field_column_setting.vue";

@Component({
  components: {
    Card,
    FieldColumnSetting,
  },
})
export default class LabelProperty extends Vue {
  @Prop() selectItem!: WidgetSchema;
  @Prop() readonly!: boolean;
  formRef = "form";
  rules = !this.readonly
    ? {
        // title: [this.getRequireRule("请输入标题"), this.getNonSpaceRule()],
        // code: [
        //   this.getRequireRule("请输入标识"),
        //   this.getRemoteRule(API_FIELD_CHECK_CODE, this.selectItem, "标识重复"),
        //   this.getNonChineseRule(),
        //   this.getNonSpaceRule(),
        // ],
        // defaultValue: [this.getRequireRule("请输入字段内容")],
      }
    : {};
}
</script>
