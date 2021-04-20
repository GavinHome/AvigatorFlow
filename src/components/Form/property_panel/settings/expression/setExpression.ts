import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import ExpSource from "./expSource.vue";
import {
  ExpressionDetailModel,
  ExpressionType,
  FieldSchema,
  PageModel,
  WidgetTypeEnum,
} from "@/components/Form/common/model";
import {
  INPUT_NUMBER_MAX,
  OPERATIONS_CONST,
} from "@/components/Form/common/const";
import Card from "../../../common/card.vue";
import Dialog from "../../../common/dialog.vue";

@Component({
  components: {
    Card,
    Dialog,
    ExpSource,
  },
})
export default class SetExpression extends Vue {
  @Prop() readonly field!: FieldSchema;
  @Prop() readonly page!: PageModel;

  dialogWidth = 800;
  dialogHeight = 500;
  MAX_FIELDS_NUMBER = 5;
  data: ExpressionDetailModel[] = [];
  options: ExpressionDetailModel[] = [];
  exps: ExpressionDetailModel[] = [];
  loading = true;
  fetching = false;
  showSelect = false;
  showError = false;
  INPUT_NUMBER_MAX = INPUT_NUMBER_MAX;

  async created(): Promise<void> {
    this.loading = true;
    const fields = this.fields.map<ExpressionDetailModel>(
      (item) =>
        Object({
          type: ExpressionType.Field,
          value: item.code,
          name: item.title,
          unit: item.setting.unit,
        }),
      []
    );
    this.data =
      fields.length > 0
        ? [
            {
              type: ExpressionType.Number,
              value: "custom_number",
              name: "数字",
            },
          ]
            .concat(fields)
            .concat(this.operations)
        : [];
    await this.fetchData();
    await this.Init();
    this.loading = false;
  }

  // 数值字段
  get fields(): Array<FieldSchema> {
    const fields: FieldSchema[] = [];
    this.page.rows
      .filter((r) => r.fields.length > 0)
      .forEach((r) => {
        r.fields
          .filter(
            (r) => r.type === WidgetTypeEnum.Number && r.id !== this.field.id
          )
          .forEach((f) => {
            fields.push(f);
          });
      });
    return fields;
  }

  // 运算符号
  get operations(): Array<ExpressionDetailModel> {
    return OPERATIONS_CONST.map<ExpressionDetailModel>(
      (item) =>
        Object({
          type: ExpressionType.Ops,
          name: item,
          value: item,
        }),
      []
    );
  }

  get showAdd(): boolean {
    return (
      this.exps.filter((x) => x.type === ExpressionType.Field).length <
      this.MAX_FIELDS_NUMBER
    );
  }

  async fetchData(name?: string): Promise<void> {
    this.fetching = true;
    this.options =
      name && this.data.length > 0
        ? this.data.filter((x) => x.name.includes(name))
        : this.data;
    this.fetching = false;
  }

  setExp(item: ExpressionDetailModel): void {
    this.exps.forEach((e) => (e.editable = false));
    item.editable = true;
  }

  async onAdd(value: string): Promise<void> {
    this.showError = false;
    this.showSelect = false;
    const item = this.data.filter((x) => x.value === value)[0];
    this.exps.push({
      type: item.type,
      value: item.type === ExpressionType.Number ? "" : item.value,
      name: item.name,
      unit: item.unit,
    });
    await this.fetchData();
  }

  onUpdate(exp: ExpressionDetailModel, value: string): void {
    this.showError = false;
    this.showSelect = false;
    const item = this.data.find((x) => x.value === value);
    if (item) {
      exp.name = item.name;
      exp.unit = item.unit;
      exp.value = item.type === ExpressionType.Number ? "" : item.value;
      exp.type = item.type;
      exp.editable = false;
    }
    this.exps.forEach((e) => (e.editable = false));
  }

  onDelete(index: number): void {
    this.showError = false;
    this.exps.splice(index, 1);
  }

  onOk(): void {
    if (!this.valid()) {
      this.showError = true;
      return;
    }

    this.triggerChange(this.exps);
  }

  clearAll(): void {
    this.exps.splice(0, this.exps.length);
  }

  onNumberChange(): void {
    this.showError = false;
    if (!this.valid()) {
      this.showError = true;
      return;
    }
  }

  private valid(): boolean {
    this.showError = false;

    if (!this.exps || this.exps.length === 0) return true;

    //检查两字段之间是否有运算符
    for (let i = 1; i < this.exps.length; i++) {
      if (
        (this.exps[i].type === ExpressionType.Field ||
          this.exps[i].type === ExpressionType.Number) &&
        (this.exps[i - 1].type === ExpressionType.Field ||
          this.exps[i - 1].type === ExpressionType.Number)
      ) {
        return false;
      }

      if (this.exps[i].type === ExpressionType.Number && !this.exps[i].value) {
        return false;
      }
    }
    // 公式设置时，检查是否只有一个数字
    if (this.exps.length == 1 && this.exps[0].type === ExpressionType.Number) {
      return false;
    }

    let expression = this.exps.map((x) => x.value).join("");
    this.fields.forEach((item) => {
      if (expression.includes(item.code)) {
        expression = expression.replace(new RegExp(`${item.code}`, "gm"), "1");
      }
    });

    try {
      // 是否可以正常计算
      const value = eval(expression);
      if (!isNaN(value) && isFinite(value)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  private async Init(): Promise<void> {
    if (this.field.expression && this.field.expression.length > 0) {
      const exps = this.field.expression;
      exps.forEach((item) => {
        const exp = this.data.filter((x) => x.value === item.value)[0];
        if (item.type === ExpressionType.Field && exp) {
          this.exps.push({
            type: item.type,
            value: item.value,
            name: exp.name,
            unit: exp.unit,
            editable: false,
          });
        } else if (item.type === ExpressionType.Number) {
          this.exps.push({
            type: item.type,
            value: item.value,
            name: "数字",
            editable: true,
          });
        } else if (item.type === ExpressionType.Ops) {
          this.exps.push({
            type: item.type,
            value: item.value,
            name: item.value,
            editable: false,
          });
        }
      });
    }
  }

  //eslint-disable-next-line
  @Emit("change") triggerChange(exp: ExpressionDetailModel[]): void {}
  @Emit("cancel") onCancel(): void {}
}
