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
              <FieldColumnSetting
                v-model="field.cols"
                :disabled="readonly"
                :maxCols="maxCols"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="是否必填" prop="isRequired">
              <a-switch
                checked-children="是"
                un-checked-children="否"
                v-model="field.isRequired"
                :disabled="readonly"
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
              label="最大长度"
              prop="setting.maxStringLength"
            >
              <a-input-number
                v-model="field.setting.maxStringLength"
                :min="1"
                :max="INPUT_MAX_NUMBER"
                :step="1"
                :precision="0"
                class="p-input-number"
                :disabled="readonly"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
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
  @Prop({ default: 4 }) maxCols!: number;
  formRef = "form";
  rules = !this.readonly
    ? {
        title: [this.getRequireRule("请输入标题"), this.getNonSpaceRule()],
        code: [
          this.getRequireRule("请输入标识"),
          this.getUniqueRule(this.field, "标识重复"),
          this.getNonChineseRule(),
          this.getNonSpaceRule(),
        ],
        "setting.maxStringLength": [this.getRequireRule("请输入最大长度")],
      }
    : {};
}
</script>
<style scoped lang="scss">
@import "../../form.scss";
</style>
