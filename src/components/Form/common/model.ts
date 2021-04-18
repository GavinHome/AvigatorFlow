export enum WidgetTypeEnum {
  Label = "Label",
  SingleText = "SingleText",
  MultipleText = "MultipleText",
  Number = "Number",
  Date = "Date",
  DateRange = "DateRange",
  Select = "Select",
  Radio = "Radio",
  CheckBox = "CheckBox",
}

export function toWidgetText(type: WidgetTypeEnum): string {
  switch (type) {
    case WidgetTypeEnum.Label:
      return "描述文本";
    case WidgetTypeEnum.SingleText:
      return "单行文本";
    case WidgetTypeEnum.MultipleText:
      return "多行文本";
    case WidgetTypeEnum.Number:
      return "数字";
    case WidgetTypeEnum.Date:
      return "日期";
    case WidgetTypeEnum.DateRange:
      return "日期区间";
    case WidgetTypeEnum.Select:
      return "下拉选择";
    case WidgetTypeEnum.Radio:
      return "单项选择";
    case WidgetTypeEnum.CheckBox:
      return "多项选择";
    default:
      throw new Error("field type enum error");
  }
}

export interface WidgetNodeModel {
  type: WidgetTypeEnum;
  icon: string;
  text: string;
  name: string;
}

export interface WidgetSchema {
  id: string;
  type: WidgetTypeEnum;
  icon: string;
  name: string;
  title: string;
  code: string;
  // placeHolder: string;
  prompt: string;
  description: string;
  isRequired: boolean; //是否必填
  isReadonly: boolean; //是否只读
  setting: FieldSettingModel;
  cols: number; //列号
  //eslint-disable-next-line
  value?: any;
}

///选项类型
export interface DataOption {
  value: string;
  text: string;
}

export interface FieldSettingModel {
  isMultipleSelect?: boolean; //是否为多选，仅Select有效
  maxStringLength?: number; //长度（文本）
  maxNumberValue?: number; //最大值（数字）
  minNumberValue?: number; //最小值（数字）
  numberDigits?: number; //精度（数字）
  unit?: string; //单位（数字）
  isPercentage?: boolean; //百分比（数字）
  //eslint-disable-next-line
  defaultValue?: any; //默认值
  // dataSourceType?: WidgetDataSourceTypeEnum;
  options?: DataOption[];
}

export const WidgetsData: WidgetNodeModel[] = [
  {
    type: WidgetTypeEnum.Label,
    icon: "label_icon.png",
    text: toWidgetText(WidgetTypeEnum.Label),
    name: "label",
  },
  {
    type: WidgetTypeEnum.SingleText,
    icon: "single_text_icon.png",
    text: toWidgetText(WidgetTypeEnum.SingleText),
    name: "a-input",
  },
  {
    icon: "multiple_text_icon.png",
    type: WidgetTypeEnum.MultipleText,
    text: toWidgetText(WidgetTypeEnum.MultipleText),
    name: "a-textarea",
  },
  {
    type: WidgetTypeEnum.Number,
    icon: "number_icon.png",
    text: toWidgetText(WidgetTypeEnum.Number),
    name: "a-input-number",
  },
  {
    type: WidgetTypeEnum.Date,
    icon: "date_icon.png",
    text: toWidgetText(WidgetTypeEnum.Date),
    name: "a-date-picker",
  },
  {
    type: WidgetTypeEnum.DateRange,
    icon: "date_range_icon.png",
    text: toWidgetText(WidgetTypeEnum.DateRange),
    name: "a-range-picker",
  },
  {
    type: WidgetTypeEnum.Select,
    icon: "select_icon.png",
    text: toWidgetText(WidgetTypeEnum.Select),
    name: "a-select",
  },
  {
    type: WidgetTypeEnum.Radio,
    icon: "radio_icon.png",
    text: toWidgetText(WidgetTypeEnum.Radio),
    name: "a-radio-group",
  },
  {
    type: WidgetTypeEnum.CheckBox,
    icon: "checkbox_icon.png",
    text: toWidgetText(WidgetTypeEnum.CheckBox),
    name: "a-checkbox-group",
  },
];

export function getComponentName(type: WidgetTypeEnum): string {
  if (!type) {
    return "";
  }

  const comp = WidgetsData.filter((x) => x.type == type)[0];
  return comp ? comp.name : "";
}

export function canSetDataSource(
  type: WidgetTypeEnum | null | undefined
): boolean {
  if (!type) {
    return false;
  }

  const result = [
    WidgetTypeEnum.Select,
    WidgetTypeEnum.Radio,
    WidgetTypeEnum.CheckBox,
  ].includes(type);
  return result;
}

export function getFieldTypeIcon(type: WidgetTypeEnum): string {
  if (!type) {
    return "";
  }

  // if (type == WidgetTypeEnum.Custom) {
  //     return "custom_icon.png";
  // }

  const comp = WidgetsData.filter((x) => x.type == type)[0];
  return comp ? comp.icon : "";
}

// export function getEmptyFieldInfo() {
//     return {
//         id: "",
//         name: "",
//         code: "",
//         description: "",
//         placeHolder: "",
//         prompt: "",
//         setting: {
//             isMultipleSelect: false,
//             isPercentage: false,
//             options: [],
//         },
//     };
// }

/****************************** page form start ********************************/

export interface PageModel {
  name: string; //页面名称
  description: string; //页面描述
  rows: Array<FormRowModel>; //行元素
}

export interface FormRowModel {
  fields: FieldSchema[]; //列元素, 字段集合
}

export type FieldSchema = WidgetSchema;

/****************************** page form end ********************************/
