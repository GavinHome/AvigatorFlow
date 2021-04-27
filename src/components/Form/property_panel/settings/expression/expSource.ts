import { OPERATIONS_CONST } from "@/components/Form/common/const";
import {
  ExpressionDetailModel,
  ExpressionType,
  FieldSchema,
  PageModel,
  WidgetSchema,
  WidgetTypeEnum,
} from "@/components/Form/common/model";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Card from "../../../common/card.vue";
import Dialog from "../../../common/dialog.vue";

@Component({
  components: {
    Card,
    Dialog,
  },
})
export default class ExpSource extends Vue {
  @Prop() readonly value!: string[];
  @Prop() readonly field!: FieldSchema;
  @Prop() readonly page!: PageModel;

  selectValue: string[] = [];
  data: ExpressionDetailModel[] = [];
  options: ExpressionDetailModel[] = [];
  exps: ExpressionDetailModel[] = [];
  loading = true;
  fetching = false;

  async created(): Promise<void> {
    this.loading = true;
    const fields = this.fields.map<ExpressionDetailModel>(
      (item) =>
        Object({
          type: ExpressionType.Field,
          value: item.code,
          name: item.name,
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

    if (this.value) {
      this.selectValue = this.value;
    }

    this.loading = false;
  }

  // 数值字段
  get fields(): Array<WidgetSchema> {
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

  async fetchData(name?: string): Promise<void> {
    this.fetching = true;
    this.options =
      name && this.data.length > 0
        ? this.data.filter((x) => x.name.includes(name))
        : this.data;
    this.fetching = false;
  }

  async onChange(value: string | string[]): Promise<void> {
    this.selectValue = value as string[];
    this.$emit("input", value);
    this.triggerChange(this.selectValue);
  }

  //eslint-disable-next-line
  @Emit("change") triggerChange(val: string[] | string): void {}
}
