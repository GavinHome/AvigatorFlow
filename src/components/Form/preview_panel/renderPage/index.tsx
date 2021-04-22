import { Component, Prop, Vue } from "vue-property-decorator";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import Card from "../../common/card.vue";
import {
  ExpressionType,
  FieldFormulaModel,
  FieldSchema,
  FormRowModel,
  PageModel,
  WidgetSchema,
  WidgetTypeEnum,
} from "../../common/model";

import {
  DatePicker,
  DateRangePicker,
  Label,
  Number,
  Description,
} from "../../widgets/index";
import { getRules } from "../../common/validators";
import {
  INPUT_MAX_LENGTH_50,
  INPUT_NUMBER_MAX,
  INPUT_NUMBER_MIN,
} from "../../common/const";
import { getFieldFormula, getNumberExpression } from "../../common/utils";

@Component({
  components: {
    Card,
    DatePicker,
    DateRangePicker,
    Label,
    Number,
    Description,
  },
})
export default class RenderInterface extends Vue {
  @Prop({ default: () => {}, type: Object, required: true })
  readonly page!: PageModel;

  form!: WrappedFormUtils;

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  get fields(): Array<FieldSchema> {
    const fields: FieldSchema[] = [];
    this.page.rows
      .filter((r) => r.fields.length > 0)
      .forEach((r) => {
        r.fields.forEach((f) => {
          fields.push(f);
        });
      });
    return fields;
  }

  get fieldFormulas(): FieldFormulaModel[] {
    return getFieldFormula(this.page);
  }

  beforeCreate(): void {
    this.form = this.$form.createForm(this);
  }

  render(): JSX.Element | undefined {
    return (
      <div class="renderInterface">
        <a-form hideRequiredMark={false} form={this.form}>
          {this.page.rows.map((row) => this.renderRow(row))}
        </a-form>
      </div>
    );
  }

  renderRow(rows: FormRowModel): JSX.Element | undefined {
    return (
      <a-row gutter={16}>
        {rows.fields.map((field) => {
          return (
            <a-col span={field.cols * 6}>
              {
                <a-form-item {...this.formItemLayout}>
                  {field.type != WidgetTypeEnum.Description
                    ? this.renderTitle(field)
                    : ""}
                  {this.renderField(field)}
                </a-form-item>
              }
            </a-col>
          );
        })}
      </a-row>
    );
  }

  renderField(field: FieldSchema): JSX.Element | undefined {
    switch (field.type) {
      case WidgetTypeEnum.Description:
        // const style = {
        //   "font-size": field.style?.fontSize + "px",
        // };

        // return (
        //   <Label
        //     v-decorator={[
        //       `${field.code}`,
        //       { initialValue: field.value },
        //     ]}
        //   />
        // );
        return (
          <Description
            font-size={field.style?.fontSize}
            v-model={field.title}
            v-decorator={[`${field.code}`, { initialValue: field.title }]}
          />
        );
      case WidgetTypeEnum.Label:
        return (
          <Label
            v-decorator={[`${field.code}`, { initialValue: field.value }]}
          />
        );
      case WidgetTypeEnum.SingleText:
        return (
          <a-input
            placeholder={field.placeHolder}
            max-length={field.setting?.maxStringLength || INPUT_MAX_LENGTH_50}
            disabled={field.isReadonly}
            v-decorator={[
              `${field.code}`,
              { rules: getRules(field), initialValue: field.value },
            ]}
          />
        );
      case WidgetTypeEnum.MultipleText:
        return (
          <a-textarea
            rows={3}
            placeholder={field.placeHolder}
            disabled={field.isReadonly}
            max-length={field.setting?.maxStringLength || INPUT_MAX_LENGTH_50}
            v-decorator={[
              `${field.code}`,
              { rules: getRules(field), initialValue: field.value },
            ]}
          />
        );
      case WidgetTypeEnum.Number:
        /* eslint-disable */
        let maxNumberValue = INPUT_NUMBER_MAX;
        let minNumberValue = INPUT_NUMBER_MIN;
        let precision = 2;
        if (field.setting && field.setting.maxNumberValue != null) {
          maxNumberValue = field.setting.maxNumberValue;
        }

        if (field.setting && field.setting.minNumberValue != null) {
          minNumberValue = field.setting.minNumberValue;
        }

        if (field.setting && field.setting.numberDigits != null) {
          precision = field.setting.numberDigits;
        }

        return (
          <Number
            // @ts-ignore
            maxNumberValue={maxNumberValue}
            minNumberValue={minNumberValue}
            precision={precision}
            placeholder={field.placeHolder}
            disabled={field.isReadonly}
            isPercentage={field.setting?.isPercentage || false}
            v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
            on-formula={(value: any) => this.handleFormulaEvent(value, field.code)}
          />
        );
      case WidgetTypeEnum.Date:
        return (
          <DatePicker
            // @ts-ignore
            placeholder={field.placeHolder}
            disabled={field.isReadonly}
            v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
          />
        );
      case WidgetTypeEnum.DateRange:
        return (
          <DateRangePicker
            // @ts-ignore
            placeholder={field.placeHolder}
            disabled={field.isReadonly}
            v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
          />
        );
      case WidgetTypeEnum.Select:
        return (
          <a-select
            placeholder={field.placeHolder}
            disabled={field.isReadonly}
            v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
          >
            {/* {getItemSource(field, this.fieldDataSource).map((s) => (
              <a-select-option value={s.value}>{s.text}</a-select-option>
            ))} */}
          </a-select>
        );
      case WidgetTypeEnum.Radio:
        return (
          <a-radio-group
            disabled={field.isReadonly}
            v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
          >
            {/* {getItemSource(field, this.fieldDataSource).map((s) => (
              <a-radio value={s.value}>{s.text}</a-radio>
            ))} */}
          </a-radio-group>
        );
      case WidgetTypeEnum.CheckBox:
        return (
          <a-checkbox-group
            disabled={field.isReadonly}
            v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
          >
            <a-row>
              {/* {getItemSource(field, this.fieldDataSource).map((s) => (
                <a-col span={8}>
                  <a-checkbox value={s.value}>{s.text}</a-checkbox>
                </a-col>
              ))} */}
            </a-row>
          </a-checkbox-group>
        );
    }
  }

  private renderTitle(field: FieldSchema): JSX.Element | undefined {
    let title = field.title;
    if (field.type === WidgetTypeEnum.Number) {
      if (field.setting) {
        if (field.setting.isPercentage) {
          title = `${field.title}（%）`;
        } else if (field.setting.unit) {
          title = `${field.title}（${field.setting.unit}）`;
        }
      }
    }

    let fieldTip = this.renderTip(field);
    debugger
    return <span slot={"label"}>
      {title}
      {fieldTip && (
        <a-tooltip title={fieldTip}>
          <a-icon type="question-circle-o" />
        </a-tooltip>
      )}
    </span>;
  }

  private renderTip(field: WidgetSchema): string {
    const expression = getNumberExpression(field.expression, this.fields, false);
    let prompt = "";
    if (field.prompt) {
      prompt = field.prompt;
    }
    let showStr = "";
    if (expression && field.prompt) {
      showStr = field.prompt + "\r\n" + expression;
    } else if (expression && prompt === "") {
      showStr = expression;
    } else if (prompt && expression === "") {
      showStr = field.prompt;
    }
    return showStr;
  }

  private handleFormulaEvent(value: number, code: string): void {
    const fieldFormula = this.fieldFormulas.find((f) => f.fieldCode === code);
    if (fieldFormula && fieldFormula.formulas?.length > 0) {
      fieldFormula.formulas.forEach((code: any) => {
        const field = this.fields.find((x) => x.code === code);
        if (field) {
          const expression: string[] = [];
          field.expression.forEach((e) => {
            if (e.type === ExpressionType.Field) {
              const value = this.form.getFieldValue(e.value);
              expression.push(value ? value : e.value);
            } else {
              expression.push(e.value);
            }
          });

          const exp = expression.join("");
          try {
            console.log(`${field.title}(${field.code})公式：`, exp);
            const value = eval(exp);
            if (!isNaN(value) && isFinite(value)) {
              const field = {
                [code]: value,
              };
              this.form.setFieldsValue(field);
            } else {
              const field = {
                [code]: "",
              };
              this.form.setFieldsValue(field);
            }
          } catch (e) {
            console.log(`${field.title}(${field.code})计算错误：`, e);
          }
        }
      });
    }
  }
}
