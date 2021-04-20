/*eslint-disable */

import { REGEX_CHINESE, REGEX_NO_SPACE } from "./const";
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



function nonChinese(rule: any, value: any, callback: any) {
  if (!value) {
    callback();
  }

  let message: string = rule.message;
  if (message) {
    message = rule.message;
  } else {
    message = `不能输入中文字符`;
  }

  const regExp = new RegExp(REGEX_CHINESE);
  if (regExp.test(value)) {
    callback(message);
  } else {
    callback();
  }
}

function nonSpace(rule: any, value: any, callback: any) {
  let message: string = rule.message;
  if (message) {
    message = rule.message;
  } else {
    message = `不能输入空格`;
  }

  const regExp = new RegExp(REGEX_NO_SPACE);

  if (regExp.test(value)) {
    callback();
  } else {
    callback(message);
  }
}

function numberMin(rule: any, value: any, callback: any) {
  let message: string = rule.message;

  const min = (rule.data as number) || 0;

  if (message) {
    message = rule.message;
  } else {
    message = `值不能小于${min}`;
  }

  if (value >= min) {
    callback();
  } else {
    callback(message);
  }
}

export function getMaxLengthRule(maxLength: number, msg?: string) {
  return { max: maxLength, message: msg || `长度不能超过${maxLength}位` };
}

export function getRequireRule(msg: string) {
  return { required: true, message: msg };
}

export function getNonChineseRule(msg?: string) {
  return { validator: nonChinese, message: msg, trigger: "blur" };
}

export function getNonSpaceRule(msg?: string) {
  return { validator: nonSpace, message: msg, trigger: "blur" };
}

export function getNumberMinRule(min: number, msg?: string) {
  return { validator: numberMin, data: min, message: msg || `值不能小于${min}` };
}

// export function getRemoteRule(url: string, data: any, msg?: string) {
//   return { validator: remote, url: url, data: data, message: msg, trigger: "blur" };
// }
