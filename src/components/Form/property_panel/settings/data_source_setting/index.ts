import { Component, Vue, Prop } from "vue-property-decorator";
import {
  DataOption,
  FieldSchema,
  WidgetDataSourceTypeData,
  WidgetDataSourceTypeEnum,
} from "@/components/Form/common/model";
import SimpleDataSource from "./simpleDataSource.vue";

@Component({
  components: {
    SimpleDataSource,
  },
})
export default class DataSourceConfig extends Vue {
  @Prop() field!: FieldSchema;
  @Prop() disabled!: boolean;

  codeSources: DataOption[] = [];

  async created(): Promise<void> {
    if (!this.field.setting.dataSourceType) {
      this.field.setting.dataSourceType = WidgetDataSourceTypeEnum.Simple;
      this.field.setting.options = [];
      this.field.setting.options.push({
        text: "选项1",
        value: "选项1",
      });
    }
  }

  //eslint-disable-next-line
  get dataSourceTypeOptions(): Array<any> {
    const options = WidgetDataSourceTypeData.filter(
      (x) =>
        x.value != WidgetDataSourceTypeEnum.Dynamic &&
        x.value != WidgetDataSourceTypeEnum.Basic
    ).map((item) =>
      Object({
        value: item.value,
        label: item.text,
      })
    );
    return options;
  }

  get displaySimpleOptions(): boolean {
    return (
      this.field &&
      this.field.setting &&
      this.field.setting.dataSourceType == WidgetDataSourceTypeEnum.Simple
    );
  }

  get displayBasicOptions(): boolean {
    return (
      this.field &&
      this.field.setting &&
      this.field.setting.dataSourceType == WidgetDataSourceTypeEnum.Basic
    );
  }

  //eslint-disable-next-line
  get basicSourceOptions(): Array<any> {
    return this.codeSources
      ? this.codeSources.map((k) => Object({ value: k.value, label: k.text }))
      : [];
  }

  changeDataSourceType(): void {
    if (this.field && this.field.setting) {
      if (this.field.setting.dataSourceType == WidgetDataSourceTypeEnum.Basic) {
        if (this.field.setting.options) {
          this.field.setting.options.splice(0);
        }
      } else if (
        this.field.setting.dataSourceType == WidgetDataSourceTypeEnum.Simple
      ) {
        // if (this.field.setting.sourceTypeId) {
        //   this.field.setting.sourceTypeId = undefined;
        // }

        if (!this.field.setting.options) {
          this.field.setting.options = [];
        }

        this.field.setting.options.splice(0);
        this.field.setting.options.push({ value: "", text: "" });
      } else if (
        this.field.setting.dataSourceType == WidgetDataSourceTypeEnum.Dynamic
      ) {
        if (this.field.setting.options) {
          this.field.setting.options.splice(0);
        }

        // if (this.field.setting.sourceTypeId) {
        //   this.field.setting.sourceTypeId = undefined;
        // }
      }
    }
  }
}
