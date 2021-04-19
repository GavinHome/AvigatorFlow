import { Component, Prop, Vue } from "vue-property-decorator";
import {
  DATE_FORMAT_NO_TIME,
  INPUT_MAX_NUMBER,
  INPUT_NUMBER_MAX,
  INPUT_NUMBER_MIN,
} from "../../common/const";
import {
  FieldSchema,
  WidgetDataSourceTypeEnum,
  WidgetTypeEnum,
} from "../../common/model";
import { getRules } from "../../common/validators";

@Component({
  components: {},
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
      case WidgetTypeEnum.Label:
        return this.renderLabel(this.field);
      case WidgetTypeEnum.SingleText:
        return this.renderSingleText(this.field);
      case WidgetTypeEnum.MultipleText:
        return this.renderMultipleText(this.field);
      case WidgetTypeEnum.Select:
        return this.renderSelect(this.field);
      case WidgetTypeEnum.Radio:
        return this.renderRadio(this.field);
      case WidgetTypeEnum.CheckBox:
        return this.renderCheckBox(this.field);
      case WidgetTypeEnum.Date:
        return this.renderDate(this.field);
      case WidgetTypeEnum.DateRange:
        return this.renderDateRange(this.field);
      case WidgetTypeEnum.Number:
        return this.renderNumber(this.field);
      default:
        throw new Error("field type is error");
    }
  }

  renderLabel(field: FieldSchema): JSX.Element | undefined {
    return <label>{field.value}</label>;
  }

  renderSingleText(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-input
        placeholder={field.placeHolder}
        maxLength={Number(field.setting?.maxStringLength) || INPUT_MAX_NUMBER}
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
        maxLength={Number(field.setting?.maxStringLength) || INPUT_MAX_NUMBER}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      />
    );
  }

  renderSelect(field: FieldSchema): JSX.Element | undefined {
    if (field.setting.dataSourceType == WidgetDataSourceTypeEnum.Basic) {
      return (
        <a-select
          placeholder={field.placeHolder}
          mode={field.setting.isMultipleSelect ? "multiple" : "default"}
          v-decorator={[
            `${field.code}`,
            { rules: getRules(field), initialValue: field.value },
          ]}
        >
          {/* {this.getRemoteItemSource.map((s) => (
            <a-select-option value={s.value}>{s.text}</a-select-option>
          ))} */}
        </a-select>
      );
    } else {
      return (
        <a-select
          placeholder={field.placeHolder}
          mode={field.setting.isMultipleSelect ? "multiple" : "default"}
          v-decorator={[
            `${field.code}`,
            { rules: getRules(field), initialValue: field.value },
          ]}
        >
          {/* {this.getItemSourceFilter(this.getSimpleItemSource(field)).map((s) => (
            <a-select-option value={s.value}>{s.text}</a-select-option>
          ))} */}
        </a-select>
      );
    }
  }

  // eslint-disable-next-line
  renderSwitch(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-switch
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      />
    );
  }

  renderRadio(field: FieldSchema): JSX.Element | undefined {
    if (field.setting.dataSourceType == WidgetDataSourceTypeEnum.Basic) {
      return (
        <a-radio-group
          v-decorator={[
            `${field.code}`,
            { rules: getRules(field), initialValue: field.value },
          ]}
        >
          {/* {this.getRemoteItemSource.map((s) => (
            <a-radio value={s.value}>{s.text}</a-radio>
          ))} */}
        </a-radio-group>
      );
    } else {
      return (
        <a-radio-group
          v-decorator={[
            `${field.code}`,
            { rules: getRules(field), initialValue: field.value },
          ]}
        >
          {/* {this.getItemSourceFilter(this.getSimpleItemSource(field)).map((s) => (
            <a-radio value={s.value}>{s.text}</a-radio>
          ))} */}
        </a-radio-group>
      );
    }
  }

  renderCheckBox(field: FieldSchema): JSX.Element | undefined {
    if (field.setting.dataSourceType == WidgetDataSourceTypeEnum.Basic) {
      return (
        <a-checkbox-group
          v-decorator={[
            `${field.code}`,
            { rules: getRules(field), initialValue: field.value },
          ]}
        >
          {/* {this.getRemoteItemSource.map((s) => (
            <a-checkbox value={s.value}>{s.text}</a-checkbox>
          ))} */}
        </a-checkbox-group>
      );
    } else {
      return (
        <a-checkbox-group
          v-decorator={[
            `${field.code}`,
            { rules: getRules(field), initialValue: field.value },
          ]}
        >
          {/* {this.getItemSourceFilter(this.getSimpleItemSource(field)).map((s) => (
            <a-radio value={s.value}>{s.text}</a-radio>
          ))} */}
        </a-checkbox-group>
      );
    }
  }

  renderDate(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-date-picker
        class={"calendarPicker"}
        placeholder={field.placeHolder}
        format={DATE_FORMAT_NO_TIME}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      />
    );
  }

  // eslint-disable-next-line
  renderDateRange(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-range-picker
        class={"calendarPicker"}
        format={DATE_FORMAT_NO_TIME}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      />
    );
  }

  renderNumber(field: FieldSchema): JSX.Element | undefined {
    return (
      <a-input-number
        class={"inputNumber"}
        max={Number(field.setting.maxNumberValue) || INPUT_NUMBER_MAX}
        min={Number(field.setting.minNumberValue) || INPUT_NUMBER_MIN}
        precision={Number(field.setting.numberDigits) || 0}
        formatter={(value: number) =>
          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value: string) => value.replace(/$s?|(,*)/g, "")}
        placeholder={field.placeHolder}
        v-decorator={[
          `${field.code}`,
          { rules: getRules(field), initialValue: field.value },
        ]}
      />
    );
  }
}
