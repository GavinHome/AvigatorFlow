export const REGEX_NO_SPACE = "^[^\\s]*$"; // 禁止空格
export const REGEX_MOBILE = /^1[3456789]\d{9}$/;
export const REGEX_CHINESE = "[\u4E00-\u9FA5]"; // 中文

export const INPUT_MAX_LENGTH_5 = 5; // 文本框最大输入长度5
export const INPUT_MAX_LENGTH_10 = 10; // 文本框最大输入长度10
export const INPUT_MAX_LENGTH_15 = 15; // 文本框最大输入长度15
export const INPUT_MAX_LENGTH_30 = 30; // 文本框最大输入长度30
export const INPUT_MAX_LENGTH_50 = 50; // 文本框最大输入长度50
export const INPUT_MAX_LENGTH_100 = 100; // 文本框最大输入长度100
export const INPUT_MAX_LENGTH_200 = 200; // 文本框最大输入长度200
export const INPUT_MAX_LENGTH_500 = 500; // 文本框最大输入长度500
export const INPUT_MAX_LENGTH_1000 = 1000; // 文本框最大输入长度1000
export const INPUT_MAX_NUMBER = 99999;

export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DATE_FORMAT_NO_SECOND = "YYYY-MM-DD HH:mm";
export const DATE_FORMAT_NO_TIME = "YYYY-MM-DD";
export const DATE_FORMAT_NO_TIME_ZH = "YYYY年MM月DD日";
export const DATE_FORMAT_NO_SECOND_ZH = "YYYY年MM月DD日 HH:mm";

export const NUMBER_FORMAT_N2 = "0,0.00";
export const NUMBER_FORMAT_N = "0,0";
export const INPUT_NUMBER_MAX = 9999999999999; //数字框最大值
export const INPUT_NUMBER_MIN = -9999999999999; // 数字框最小值
export const INPUT_NUMBER_STEP = 0.01; // 步进

export const RULE_NO_SPACE = {
  pattern: REGEX_NO_SPACE,
  message: `禁止输入空格`,
};
export const DOUBLE_CLICK_SELECT_TIP = "注：双击即可选中";
export const SELECT_OK_TIP = "注：选中后，点击确认按钮";

export const RICH_TEXT_MAX_LENGTH = 2000; // 富文本最大长度

export const OPERATIONS_CONST = ["+", "-", "*", "/", "(", ")"]; // 公式运算符号

export const FORM_LAYOUT = "horizontal";
