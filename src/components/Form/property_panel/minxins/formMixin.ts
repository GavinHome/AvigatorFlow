/*eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import {
  REGEX_NO_SPACE,
  INPUT_MAX_LENGTH_15,
  INPUT_MAX_LENGTH_30,
  INPUT_MAX_LENGTH_50,
  INPUT_NUMBER_MIN,
  INPUT_NUMBER_MAX,
  INPUT_MAX_LENGTH_100,
  INPUT_MAX_LENGTH_200,
  INPUT_MAX_LENGTH_10,
  INPUT_MAX_LENGTH_5,
  INPUT_MAX_NUMBER,
  FORM_LAYOUT,
} from "../../common/const";
import { FormModel } from "ant-design-vue";
import {
  getMaxLengthRule,
  getNonChineseRule,
  getNonSpaceRule,
  getNumberMinRule,
  getRequireRule,
} from "../../common/validators";
@Component
export default class FormMixin extends Vue {
  REGEX_NO_SPACE: string = REGEX_NO_SPACE;
  INPUT_MAX_LENGTH_5: number = INPUT_MAX_LENGTH_5;
  INPUT_MAX_LENGTH_10: number = INPUT_MAX_LENGTH_10;
  INPUT_MAX_LENGTH_15: number = INPUT_MAX_LENGTH_15;
  INPUT_MAX_LENGTH_30: number = INPUT_MAX_LENGTH_30;
  INPUT_MAX_LENGTH_50: number = INPUT_MAX_LENGTH_50;
  INPUT_MAX_LENGTH_100: number = INPUT_MAX_LENGTH_100;
  INPUT_MAX_LENGTH_200: number = INPUT_MAX_LENGTH_200;
  INPUT_MAX_LENGTH: number = INPUT_MAX_LENGTH_50;
  INPUT_MAX_NUMBER: number = INPUT_MAX_NUMBER;
  INPUT_NUMBER_MAX: number = INPUT_NUMBER_MAX;

  formLayout = FORM_LAYOUT;

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  formItemLayoutOnPage = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 21 },
    },
  };

  formInputIntDefault = {
    min: INPUT_NUMBER_MIN,
    max: INPUT_NUMBER_MAX,
    step: 1,
    precision: 0,
    formatter: (value: number): string =>
      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    parser: (value: string): string => value.replace(/$s?|(,*)/g, ""),
  };

  form(refName: string): FormModel {
    return this.$refs[refName] as FormModel;
  }

  getMaxLengthRule(maxLength: number, msg?: string) {
    return getMaxLengthRule(maxLength, msg);
  }

  getRequireRule(msg: string) {
    return getRequireRule(msg);
  }

  getNonChineseRule(msg?: string) {
    return getNonChineseRule(msg);
  }

  getNonSpaceRule(msg?: string) {
    return getNonSpaceRule(msg);
  }

  getNumberMinRule(min: number, msg?: string) {
    return getNumberMinRule(min, msg);
  }

  getUniqueRule(data: any, msg?: string) {
    // return getRemoteRule(url, data, msg);
    return false;
  }
}
