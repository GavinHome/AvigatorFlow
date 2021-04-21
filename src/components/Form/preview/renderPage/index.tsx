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
                  {this.renderTitle(field)}
                  {this.renderField(field)}
                </a-form-item>
              }
            </a-col>
          );
        })}
      </a-row>
    );
  }

  renderField(fieldDetail: FieldSchema): JSX.Element | undefined {
    switch (fieldDetail.type) {
      case WidgetTypeEnum.Description:
        return (
          <Label
            v-decorator={[
              `${fieldDetail.code}`,
              { initialValue: fieldDetail.value },
            ]}
          />
        );
      case WidgetTypeEnum.Label:
        return (
          <Label
            v-decorator={[
              `${fieldDetail.code}`,
              { initialValue: fieldDetail.value },
            ]}
          />
        );
      case WidgetTypeEnum.SingleText:
        return (
          <a-input
            placeholder={fieldDetail.placeHolder}
            max-length={
              fieldDetail.setting?.maxStringLength || INPUT_MAX_LENGTH_50
            }
            disabled={fieldDetail.isReadonly}
            v-decorator={[
              `${fieldDetail.code}`,
              { rules: getRules(fieldDetail), initialValue: fieldDetail.value },
            ]}
          />
        );
      case WidgetTypeEnum.MultipleText:
        return (
          <a-textarea
            rows={3}
            placeholder={fieldDetail.placeHolder}
            disabled={fieldDetail.isReadonly}
            max-length={
              fieldDetail.setting?.maxStringLength || INPUT_MAX_LENGTH_50
            }
            v-decorator={[
              `${fieldDetail.code}`,
              { rules: getRules(fieldDetail), initialValue: fieldDetail.value },
            ]}
          />
        );
      case WidgetTypeEnum.Number:
        /* eslint-disable */
        let maxNumberValue = INPUT_NUMBER_MAX;
        let minNumberValue = INPUT_NUMBER_MIN;
        let precision = 2;
        if (fieldDetail.setting && fieldDetail.setting.maxNumberValue != null) {
          maxNumberValue = fieldDetail.setting.maxNumberValue;
        }

        if (fieldDetail.setting && fieldDetail.setting.minNumberValue != null) {
          minNumberValue = fieldDetail.setting.minNumberValue;
        }

        if (fieldDetail.setting && fieldDetail.setting.numberDigits != null) {
          precision = fieldDetail.setting.numberDigits;
        }

        return (
          <Number
            // @ts-ignore
            maxNumberValue={maxNumberValue}
            minNumberValue={minNumberValue}
            precision={precision}
            placeholder={fieldDetail.placeHolder}
            disabled={fieldDetail.isReadonly}
            isPercentage={fieldDetail.setting?.isPercentage || false}
            v-decorator={[`${fieldDetail.code}`, { rules: getRules(fieldDetail), initialValue: fieldDetail.value }]}
            on-formula={(value: any) => this.handleFormulaEvent(value, fieldDetail.code)}
          />
        );
      case WidgetTypeEnum.Date:
        return (
          <DatePicker
            // @ts-ignore
            placeholder={fieldDetail.placeHolder}
            disabled={fieldDetail.isReadonly}
            v-decorator={[`${fieldDetail.code}`, { rules: getRules(fieldDetail), initialValue: fieldDetail.value }]}
          />
        );
      case WidgetTypeEnum.DateRange:
        return (
          <DateRangePicker
            // @ts-ignore
            placeholder={fieldDetail.placeHolder}
            disabled={fieldDetail.isReadonly}
            v-decorator={[`${fieldDetail.code}`, { rules: getRules(fieldDetail), initialValue: fieldDetail.value }]}
          />
        );
      case WidgetTypeEnum.Select:
        return (
          <a-select
            placeholder={fieldDetail.placeHolder}
            disabled={fieldDetail.isReadonly}
            v-decorator={[`${fieldDetail.code}`, { rules: getRules(fieldDetail), initialValue: fieldDetail.value }]}
          >
            {/* {getItemSource(fieldDetail, this.fieldDataSource).map((s) => (
              <a-select-option value={s.value}>{s.text}</a-select-option>
            ))} */}
          </a-select>
        );
      case WidgetTypeEnum.Radio:
        return (
          <a-radio-group
            disabled={fieldDetail.isReadonly}
            v-decorator={[`${fieldDetail.code}`, { rules: getRules(fieldDetail), initialValue: fieldDetail.value }]}
          >
            {/* {getItemSource(fieldDetail, this.fieldDataSource).map((s) => (
              <a-radio value={s.value}>{s.text}</a-radio>
            ))} */}
          </a-radio-group>
        );
      case WidgetTypeEnum.CheckBox:
        return (
          <a-checkbox-group
            disabled={fieldDetail.isReadonly}
            v-decorator={[`${fieldDetail.code}`, { rules: getRules(fieldDetail), initialValue: fieldDetail.value }]}
          >
            <a-row>
              {/* {getItemSource(fieldDetail, this.fieldDataSource).map((s) => (
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
