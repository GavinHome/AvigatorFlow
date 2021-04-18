import { Vue, Component, Prop } from "vue-property-decorator";
import { WidgetSchema } from "../common/model";
import RenderField from "./renderField";
import draggable from "vuedraggable";

@Component({
  components: {
    draggable,
    RenderField,
  },
})
export default class DraggleContainer extends Vue {
  @Prop() fields!: Array<WidgetSchema>;
  newIndex = 0;
  draggable = true;
  // displayName(field: FieldModel) {
  //   if (field.fieldType === FieldTypeEnum.Number && field.setting.unitTypeId) {
  //     const unit = this.unitCodes.find((x) => x.id === field.setting.unitTypeId);
  //     return field.name ? field.name + (field.setting.unitTypeId && unit ? `（${unit.name}）` : "") + "：" : "";
  //   }

  //   return field.name ? field.name : "";
  // }

  // unitName(field: FieldModel) {
  //   let unitName = "";
  //   if (field.fieldType === FieldTypeEnum.Number && field.setting.unitTypeId) {
  //     const unit = this.unitCodes.find((x) => x.id === field.setting.unitTypeId);
  //     if (field.name && unit) {
  //       unitName = unit.name;
  //     }
  //   }
  //   return unitName;
  // }

  // 新增
  handleAdd(res: any) {
    this.newIndex = res.newIndex;
    this.$emit("addField", this.fields[res.newIndex]);
  }

  // 选中
  handleFormItemClick(index: number) {
    this.$emit("selectedField", this.fields[index]);
  }

  // changed
  changed(e: any) {
    if (e.added) {
      console.log("added");
    }
  }

  // getComponentName(type: FieldTypeEnum) {
  //   return getComponentName(type);
  // }

  // get draggable() {
  //   return this.canDrag;
  // }
}
