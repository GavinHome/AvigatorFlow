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
            <a-form-model-item has-feedback label="占比" prop="isRequired">
              <FieldColumnSetting v-model="field.cols" :disabled="readonly" />
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
              label="是否百分比"
              prop="isPercentage"
            >
              <a-switch
                checked-children="是"
                un-checked-children="否"
                v-model="field.setting.isPercentage"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="最大数值"
              prop="setting.maxNumberValue"
            >
              <a-input-number
                v-model="field.setting.maxNumberValue"
                :step="1"
                :precision="0"
                class="inputNumber"
                :max="INPUT_NUMBER_MAX"
                :formatter="formatter"
                :parser="parser"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="最小数值"
              prop="setting.minNumberValue"
            >
              <a-input-number
                v-model="field.setting.minNumberValue"
                :step="1"
                :precision="0"
                :min="INPUT_NUMBER_MAX * -1"
                class="inputNumber"
                :formatter="formatter"
                :parser="parser"
                :disabled="readonly"
              />
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              label="字段精度"
              prop="setting.numberDigits"
            >
              <a-input-number
                v-model="field.setting.numberDigits"
                :min="0"
                :max="9"
                :step="1"
                :precision="0"
                class="inputNumber"
                :disabled="readonly"
              />
            </a-form-model-item>
            <!-- <a-form-model-item
              has-feedback
              label="单位"
              prop="setting.unitTypeId"
            >
              <a-select
                v-model="field.setting.unitTypeId"
                :options="unitTypeOptions"
                :disabled="readonly"
              />
            </a-form-model-item> -->
          </a-col>
        </a-row>
      </Card>
      <Card>
        <template #title> 计算规则 </template>
        <!-- <Expression :field="field" :page="page" /> -->
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
        title: [this.getRequireRule("请输入标题"), this.getNonSpaceRule()],
        code: [
          this.getRequireRule("请输入标识"),
          this.getUniqueRule(this.field, "标识重复"),
          this.getNonChineseRule(),
          this.getNonSpaceRule(),
        ],
        "setting.maxNumberValue": [
          this.getRequireRule("请输入最大数值"),
          this.getMaxGreetThanMinRule("不能小于最小值"),
        ],
        "setting.minNumberValue": [
          this.getRequireRule("请输入最小数值"),
          this.getMinLessThanMaxRule("不能大于最大值"),
        ],
        "setting.numberDigits": [this.getRequireRule("请输入字段精度")],
      }
    : {};

  formatter(value: number): string {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  parser(value: string): string {
    return value.replace(/$s?|(,*)/g, "");
  }

  //eslint-disable-next-line
  getMaxGreetThanMinRule(msg: string) : any{
    return {
      validator: this.maxGreetThanMinRule,
      message: msg,
      trigger: "blur",
    };
  }

  //eslint-disable-next-line
  getMinLessThanMaxRule(msg: string): any {
    return {
      validator: this.minLessThanMaxRule,
      message: msg,
      trigger: "blur",
    };
  }

  //eslint-disable-next-line
  private maxGreetThanMinRule(rule: any, value: any, callback: any) {
    const minValue = Number(this.field.setting.minNumberValue);
    if (!minValue) {
      return callback();
    }

    if (!value) {
      return callback();
    }

    let message: string = rule.message;
    if (message) {
      message = rule.message;
    } else {
      message = `'${value}'不能小于${minValue}`;
    }

    if (value < minValue) {
      callback(message);
    } else {
      callback();
    }
  }

  //eslint-disable-next-line
  private minLessThanMaxRule(rule: any, value: any, callback: any) {
    const maxValue = Number(this.field.setting.maxNumberValue);
    if (!maxValue) {
      return callback();
    }

    if (!value) {
      return callback();
    }

    let message: string = rule.message;
    if (message) {
      message = rule.message;
    } else {
      message = `'${value}'不能大于${maxValue}`;
    }

    if (value > maxValue) {
      callback(message);
    } else {
      callback();
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../form.scss";
</style>
