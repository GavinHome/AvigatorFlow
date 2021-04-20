import { Vue, Component, Prop } from "vue-property-decorator";
import RenderField from "./renderField";
import draggable from "vuedraggable";
import { FieldSchema, FormRowModel, WidgetTypeEnum } from "../../common/model";

@Component({
  props: ["fields", "row"],
  components: {
    draggable,
    RenderField,
  },
})
export default class Container extends Vue {
  @Prop() fields!: FieldSchema[];
  @Prop() row!: FormRowModel;

  /// 新增
  handleAdd(): void {
    console.log("handleAdd");
  }

  /// 选中
  handleFormItemClick(index: number): void {
    this.$emit("selectedField", this.row, this.fields[index]);
  }

  /// changed
  //eslint-disable-next-line
  changed(e: any): void {
    if (e.added) {
      this.$emit("addField", this.row, e.added.element);
    } else if (e.removed) {
      this.$emit("removeField", this.row, e.removed.element);
    }
  }

  displayName(field: FieldSchema): string {
    if (
      field.type === WidgetTypeEnum.Number &&
      field.setting &&
      field.setting.unit
    ) {
      const unit = field.setting.unit ? `（${field.setting.unit}）` : "";
      return field.title ? `${field.title}${unit}：` : "";
    }

    return field.title ? `${field.title}：` : "";
  }
}
