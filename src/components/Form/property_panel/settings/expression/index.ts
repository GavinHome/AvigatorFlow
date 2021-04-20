import {
  ExpressionDetailModel,
  FieldSchema,
  PageModel,
  WidgetTypeEnum,
} from "@/components/Form/common/model";
import { getNumberExpression } from "@/components/Form/common/utils";
import { Component, Vue, Prop } from "vue-property-decorator";
import SetExpression from "./setExpression.vue";

@Component({
  components: {
    SetExpression,
  },
})
export default class NumberProperty extends Vue {
  //Mixins(FormMixin, ComMixin) {
  @Prop() field!: FieldSchema;
  @Prop() page!: PageModel;
  showDialog = false;

  setExpression(): void {
    this.showDialog = true;
  }

  setCallback(exps: ExpressionDetailModel[]): void {
    ////this.field.expression = JSON.stringify(exps);
    if (this.field.expression.length > 0) {
      this.field.expression.splice(0, this.field.expression.length);
    }

    exps.forEach((item) =>
      this.field.expression.push({ type: item.type, value: item.value })
    );
    this.showDialog = false;
  }

  onCancel(): void {
    this.showDialog = false;
  }

  // 数值字段
  get allNumberFields(): Array<FieldSchema> {
    const fields: FieldSchema[] = [];
    this.page.rows
      .filter((r) => r.fields.length > 0)
      .forEach((r) => {
        r.fields
          .filter((r) => r.type === WidgetTypeEnum.Number)
          .forEach((f) => {
            fields.push(f);
          });
      });
    return fields;
  }

  get displayExpression(): string {
    const expression = getNumberExpression(
      this.field.expression,
      this.allNumberFields
    );
    return expression.length ? expression : "无";
  }
}
