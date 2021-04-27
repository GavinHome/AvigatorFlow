import { Component, Prop, Vue } from "vue-property-decorator";
import {
  INPUT_MAX_LENGTH_50,
  INPUT_NUMBER_MAX,
  INPUT_NUMBER_MIN,
} from "../../common/const";
import { FieldSchema, WidgetTypeEnum, getDataSource } from "../../common/model";
import { getRules } from "../../common/validators";

import {
  DatePicker,
  DateRangePicker,
  Label,
  Number,
  Description,
} from "../../widgets/index";

@Component({
  components: {
    DatePicker,
    DateRangePicker,
    Label,
    Number,
    Description,
  },
})
export default class RenderField extends Vue {
  @Prop() field!: FieldSchema;

  updateState = true;

  get readonly(): boolean {
    return this.field.isReadonly;
  }

  render(): JSX.Element | undefined {
    ////TODO: readonly
    if (this.readonly) {
      return <span class={"readonly"}>{this.field.value}</span>;
    }

    switch (this.field.type) {
      case WidgetTypeEnum.Description:
        return this.renderDescription(this.field);
      case WidgetTypeEnum.Label:
        return this.renderLabel(this.field);
      case WidgetTypeEnum.SingleText:
        return this.renderSingleText(this.field);
      case WidgetTypeEnum.MultipleText:
        return this.renderMultipleText(this.field);
      case WidgetTypeEnum.Number:
        return this.renderNumber(this.field);
      case WidgetTypeEnum.Date:
        return this.renderDate(this.field);
      case WidgetTypeEnum.DateRange:
        return this.renderDateRange(this.field);
      case WidgetTypeEnum.Select:
        return this.renderSelect(this.field);
      case WidgetTypeEnum.Radio:
        return this.renderRadio(this.field);
      case WidgetTypeEnum.CheckBox:
        return this.renderCheckBox(this.field);
      default:
        throw new Error("组件类型错误");
    }
  }

  renderDescription(field: FieldSchema): JSX.Element | undefined {
    return (
      <Description
        font-size={field.style?.fontSize}
        v-model={field.title}
        v-decorator={[`${field.code}`, { initialValue: field.title }]}
      />
    );
  }

  renderLabel(field: FieldSchema): JSX.Element | undefined {
    return (
      <Label v-decorator={[`${field.code}`, { initialValue: field.value }]} />
    );
  }

  renderSingleText(field: FieldSchema): JSX.Element | undefined {
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
  }

  renderMultipleText(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-textarea
        rows={1}
        placeholder={field.placeHolder}
        disabled={field.isReadonly}
        maxLength={field.setting?.maxStringLength || INPUT_MAX_LENGTH_50}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      />
    );
  }

  renderNumber(field: FieldSchema): JSX.Element | undefined {
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
      />
    );
  }

  renderDate(field: FieldSchema): JSX.Element | undefined {
    return (
      <DatePicker
        // @ts-ignore
        placeholder={field.placeHolder}
        disabled={field.isReadonly}
        v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
      />
    );
  }

  renderDateRange(field: FieldSchema): JSX.Element | undefined {
    return (
      <DateRangePicker
        // @ts-ignore
        placeholder={field.placeHolder}
        disabled={field.isReadonly}
        v-decorator={[`${field.code}`, { rules: getRules(field), initialValue: field.value }]}
      />
    );
  }

  renderSelect(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-select
        placeholder={field.placeHolder}
        disabled={field.isReadonly}
        mode={field.setting.isMultipleSelect ? "multiple" : "default"}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      >
        {getDataSource(field).map((s) => (
          <a-select-option value={s.value}>{s.text}</a-select-option>
        ))}
      </a-select>
    );
  }

  renderRadio(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-radio-group
        disabled={field.isReadonly}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      >
        {getDataSource(field).map((s) => (
          <a-radio value={s.value}>{s.text}</a-radio>
        ))}
      </a-radio-group>
    );
  }

  renderCheckBox(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-checkbox-group
        disabled={field.isReadonly}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      >
        {getDataSource(field).map((s) => (
          <a-checkbox value={s.value}>{s.text}</a-checkbox>
        ))}
      </a-checkbox-group>
    );
  }
}
