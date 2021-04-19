/*eslint-disable */

import { FieldSchema, WidgetTypeEnum } from "./model";
export const getRules = (fieldDetail: FieldSchema): any[] => {
  const rules: any[] = [];

  if (!fieldDetail.isReadonly) {
    if (fieldDetail.isRequired) {
      let messagePrefix = "请输入";
      switch (fieldDetail.type) {
        case WidgetTypeEnum.Date:
        case WidgetTypeEnum.DateRange:
        case WidgetTypeEnum.Select:
        case WidgetTypeEnum.CheckBox:
          messagePrefix = "请选择";
          break;
      }

      const message =
        fieldDetail.placeHolder || `${messagePrefix}${fieldDetail.name}`;

      if (fieldDetail.type === WidgetTypeEnum.DateRange) {
        rules.push({ required: fieldDetail, message, type: "array" });
      } else {
        rules.push({ required: fieldDetail, message });
      }
    }
  }

  return rules;
};
