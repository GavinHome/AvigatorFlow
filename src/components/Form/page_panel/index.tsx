import { Vue, Component, Prop } from "vue-property-decorator";
import { FieldSchema, FormRowModel, PageModel } from "../common/model";
import Container from "./container/index.vue";
import draggable from "vuedraggable";
import { openConfirmModal, openInfoModal } from "../common/modal";
import { getPageFields } from "../common/utils";

@Component({
  components: {
    draggable,
    Container,
  },
})
export default class PagePanel extends Vue {
  @Prop() page!: PageModel;
  selectRow: FormRowModel | null = null;
  selectItem: FieldSchema | null = null;

  pageFormRef = "pageForm";
  loading = false;

  //事件-增加行
  async handleAddRow(): Promise<void> {
    this.page.rows.push({
      fields: [],
    });
  }

  //事件-选中行
  async handleSelectRowClick(row: FormRowModel): Promise<void> {
    this.selectRow = row;
  }

  // 事件-删除行
  async handleDeleteRow(row: FormRowModel): Promise<void> {
    if (row.fields.length > 0) {
      // 检查是否被公式引用
      // if (!this.validIsRef(row.fields, group.groupName)) return;
      openConfirmModal("提示", "是否删除该行？", () => this.deleteRow(row));
    } else {
      this.deleteRow(row);
    }
  }

  //事件-新增字段
  async handleAddField(row: FormRowModel, field: FieldSchema): Promise<void> {
    if (row.fields.length >= 4) {
      openInfoModal("提示", "本行已有四列，禁止拖放");
    } else {
      try {
        this.addField(row, field);
      } catch (error) {
        console.log("新增字段出错： " + error);
      }
    }
  }

  //事件-选中字段
  async handleSelectField(
    row: FormRowModel,
    field: FieldSchema
  ): Promise<void> {
    this.selectItem = field;
    this.$emit("selectedField", row, field);
  }

  //事件-移除字段
  async handleRemoveField(
    row: FormRowModel,
    field: FieldSchema
  ): Promise<void> {
    this.deleteField(row, field);
  }

  //事件-移除字段
  async handleDeleteField(
    row: FormRowModel,
    field: FieldSchema
  ): Promise<void> {
    this.deleteField(row, field);
  }

  // 删除行
  private deleteRow(row: FormRowModel): void {
    const index = this.page.rows.indexOf(row);
    if (index !== -1) {
      this.page.rows.splice(index, 1);
    }
  }

  // 删除字段
  private deleteField(row: FormRowModel, field: FieldSchema): void {
    const index = row.fields.indexOf(field);
    if (index !== -1) {
      row.fields.splice(index, 1);
    }
  }

  // 增加字段
  private addField(row: FormRowModel, field: FieldSchema): void {
    //TODO: title and code
    const fields = getPageFields(this.page);
    field.title = this.getTitle(fields, field.title, field.title, 1, field.id);
    field.code = this.getCode(fields, field.code, field.code, 1, field.id);
    const item: FieldSchema = Object.assign({}, field);
    row.fields.push(item);
    //处理列数
    if (row.fields.map((x) => x.cols).reduce((sum, x) => sum + x) > 4) {
      row.fields.forEach((e, index) => {
        e.cols = this.getColumns(row.fields.length, index + 1);
      });
    }
    this.handleSelectField(row, item);
  }

  private getColumns(fieldsCount: number, fieldIndex: number): number {
    const count = fieldsCount === 3 ? 4 : fieldsCount;
    if (fieldsCount === 3 && fieldIndex === 3) {
      return (24 / (count * 6)) * 2;
    } else {
      return 24 / (count * 6);
    }
  }

  private getCode(
    fields: Array<FieldSchema>,
    code: string,
    current: string,
    next: number,
    id: string
  ): string {
    const count: number = fields.filter(
      (n) => n.code === current && n.id !== id
    ).length;
    if (count === 0) {
      return current;
    }

    return this.getCode(fields, code, code + next, next + 1, id);
  }

  private getTitle(
    fields: Array<FieldSchema>,
    title: string,
    current: string,
    next: number,
    id: string
  ): string {
    const count: number = fields.filter(
      (n) => n.title === current && n.id !== id
    ).length;
    if (count === 0) {
      return current;
    }

    return this.getTitle(fields, title, title + next, next + 1, id);
  }
}
