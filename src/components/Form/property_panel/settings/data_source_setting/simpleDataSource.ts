import { Component, Prop, Mixins } from "vue-property-decorator";
import { DataOption, FieldSchema } from "@/components/Form/common/model";
import FormMixin from "../../minxins/formMixin";

@Component({
  components: {},
})
export default class SimpleDataSource extends Mixins(FormMixin) {
  @Prop() field!: FieldSchema;
  @Prop() disabled!: boolean;

  removeOption(item: DataOption): void {
    if (this.field.setting.options) {
      const index = this.field.setting.options.indexOf(item);
      if (index !== -1) {
        this.field.setting.options.splice(index, 1);
      }
    }
  }

  addOption(): void {
    if (this.field.setting.options) {
      this.field.setting.options.push({
        value: "",
        text: "",
      });
    }
  }

  //eslint-disable-next-line
  getArrayOptionUniqueRule(msg: string): any {
    return {
      validator: this.arrayOptionUniqueRule,
      array: this.field.setting.options,
      message: msg,
      trigger: "blur",
    };
  }

  //eslint-disable-next-line
  private arrayOptionUniqueRule(rule: any, value: any, callback: any): any {
    const array: Array<DataOption> = rule.array;
    if (array.length === 0) {
      callback();
    }

    if (!value) {
      return callback();
    }

    let message: string = rule.message;
    if (message) {
      message = rule.message;
    } else {
      message = `'${value}'已存在`;
    }

    if (array.filter((x) => x.value == value).length > 1) {
      callback(message);
    } else {
      callback();
    }
  }
}
