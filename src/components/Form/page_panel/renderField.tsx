import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WidgetSchema } from "../common/model";
// import { FieldModel, ItemSourceModel, TreeItemModel } from "@/commons/models";
// import { FieldTypeEnum, FieldDataSourceTypeEnum } from "@/commons/enums";
// import { DATE_FORMAT_NO_TIME, INPUT_NUMBER_MAX, INPUT_NUMBER_MIN, INPUT_MAX_NUMBER } from "@/commons/constants";
// import { TreeSelect, File } from "@/components";
// import { apiGetCodeSourceByCodeType } from "@/apis/apis";
// import { setTreeCanSelect } from "@/commons/method";
// import { InputNumber } from "@/components";

@Component({
  components: {},
})
export default class RenderField extends Vue {
  @Prop() fields!: Array<WidgetSchema>;
  // updateState = true;

  // get getRemoteItemSource(): ItemSourceModel[] {
  //   return this.remoteOptions.map(
  //     (s) =>
  //       Object({
  //         value: s.id,
  //         text: s.name,
  //       }),
  //     []
  //   );
  // }

  // get getRemoteItemTreeSource(): TreeItemModel[] {
  //   return this.remoteOptions;
  // }

  // render() {
  //   switch (this.field.fieldType) {
  //     case FieldTypeEnum.Label:
  //       return this.renderLabel(this.field);
  //     case FieldTypeEnum.SingleText:
  //       return this.renderSingleText(this.field);
  //     case FieldTypeEnum.MultipleText:
  //       return this.renderMultipleText(this.field);
  //     case FieldTypeEnum.Select:
  //       return this.renderSelect(this.field);
  //     case FieldTypeEnum.Switch:
  //       return this.renderSwitch(this.field);
  //     case FieldTypeEnum.TreeSelect:
  //       return this.renderTreeSelect(this.field);
  //     case FieldTypeEnum.Radio:
  //       return this.renderRadio(this.field);
  //     case FieldTypeEnum.CheckBox:
  //       return this.renderCheckBox(this.field);
  //     case FieldTypeEnum.Date:
  //       return this.renderDate(this.field);
  //     case FieldTypeEnum.DateRange:
  //       return this.renderDateRange(this.field);
  //     case FieldTypeEnum.Number:
  //       return this.renderNumber(this.field);
  //     case FieldTypeEnum.Custom:
  //       return this.renderCustom(this.field);
  //     case FieldTypeEnum.File:
  //       return this.renderFile(this.field);
  //     default:
  //       throw new Error("field type is error");
  //   }
  // }

  // renderLabel(field: FieldModel): JSX.Element | undefined {
  //   return <label>{field.defaultValue}</label>;
  // }

  // renderSingleText(field: FieldModel): JSX.Element | undefined {
  //   return <a-input placeholder={field.placeHolder} maxLength={Number(field.setting?.maxStringLength) || INPUT_MAX_NUMBER} />;
  // }

  // renderMultipleText(field: FieldModel): JSX.Element | undefined {
  //   return <a-textarea placeholder={field.placeHolder} maxLength={Number(field.setting?.maxStringLength) || INPUT_MAX_NUMBER} />;
  // }

  // renderSelect(field: FieldModel): JSX.Element | undefined {
  //   if (field.setting.dataSourceType == FieldDataSourceTypeEnum.Basic) {
  //     return (
  //       <a-select placeholder={field.placeHolder} mode={field.setting.isMultipleSelect ? "multiple" : "default"}>
  //         {this.getRemoteItemSource.map((s) => (
  //           <a-select-option value={s.value}>{s.text}</a-select-option>
  //         ))}
  //       </a-select>
  //     );
  //   } else {
  //     return (
  //       <a-select placeholder={field.placeHolder} mode={field.setting.isMultipleSelect ? "multiple" : "default"}>
  //         {this.getItemSourceFilter(this.getSimpleItemSource(field)).map((s) => (
  //           <a-select-option value={s.value}>{s.text}</a-select-option>
  //         ))}
  //       </a-select>
  //     );
  //   }
  // }

  // // eslint-disable-next-line
  // renderSwitch(field: FieldModel): JSX.Element | undefined {
  //   return <a-switch />;
  // }

  // renderTreeSelect(field: FieldModel): JSX.Element | undefined {
  //   if (field.setting.dataSourceType == FieldDataSourceTypeEnum.Basic) {
  //     const treeData = this.getRemoteItemTreeSource;
  //     if (this.updateState) {
  //       return (
  //         <TreeSelect
  //           // @ts-ignore
  //           treeData={treeData}
  //           placeholder={field.placeHolder}
  //           multiple={field.setting.isMultipleSelect}
  //         />
  //       );
  //     } else {
  //       return <a-tree-select placeholder={field.placeHolder} />;
  //     }
  //   } else {
  //     const treeData: ItemSourceModel[] = this.getItemSourceFilter(this.getSimpleItemSource(field), false).map(
  //       (s) =>
  //         Object({
  //           value: s.value,
  //           label: s.text,
  //         }),
  //       []
  //     );

  //     if (treeData && treeData.length > 0) {
  //       return (
  //         <TreeSelect
  //           // @ts-ignore
  //           treeData={treeData}
  //           placeholder={field.placeHolder}
  //           multiple={field.setting.isMultipleSelect}
  //         />
  //       );
  //     } else {
  //       return <a-tree-select placeholder={field.placeHolder} />;
  //     }
  //   }
  // }

  // renderRadio(field: FieldModel): JSX.Element | undefined {
  //   if (field.setting.dataSourceType == FieldDataSourceTypeEnum.Basic) {
  //     return (
  //       <a-radio-group>
  //         {this.getRemoteItemSource.map((s) => (
  //           <a-radio value={s.value}>{s.text}</a-radio>
  //         ))}
  //       </a-radio-group>
  //     );
  //   } else {
  //     return (
  //       <a-radio-group>
  //         {this.getItemSourceFilter(this.getSimpleItemSource(field)).map((s) => (
  //           <a-radio value={s.value}>{s.text}</a-radio>
  //         ))}
  //       </a-radio-group>
  //     );
  //   }
  // }

  // renderCheckBox(field: FieldModel): JSX.Element | undefined {
  //   if (field.setting.dataSourceType == FieldDataSourceTypeEnum.Basic) {
  //     return (
  //       <a-checkbox-group>
  //         {this.getRemoteItemSource.map((s) => (
  //           <a-checkbox value={s.value}>{s.text}</a-checkbox>
  //         ))}
  //       </a-checkbox-group>
  //     );
  //   } else {
  //     return (
  //       <a-checkbox-group>
  //         {this.getItemSourceFilter(this.getSimpleItemSource(field)).map((s) => (
  //           <a-radio value={s.value}>{s.text}</a-radio>
  //         ))}
  //       </a-checkbox-group>
  //     );
  //   }
  // }

  // renderDate(field: FieldModel): JSX.Element | undefined {
  //   return <a-date-picker class={"calendarPicker"} placeholder={field.placeHolder} format={DATE_FORMAT_NO_TIME} />;
  // }

  // // eslint-disable-next-line
  // renderDateRange(field: FieldModel): JSX.Element | undefined {
  //   return <a-range-picker class={"calendarPicker"} format={DATE_FORMAT_NO_TIME} />;
  // }

  // renderNumber(field: FieldModel): JSX.Element | undefined {
  //   return (
  //     <InputNumber
  //       // @ts-ignore
  //       maxNumberValue={field.setting?.maxNumberValue || INPUT_NUMBER_MAX}
  //       minNumberValue={field.setting?.minNumberValue || INPUT_NUMBER_MIN}
  //       precision={field.setting?.numberDigits || 2}
  //       placeholder={field.placeHolder}
  //       isPercentage={field.setting?.isPercentage || false}
  //     />
  //   );
  // }

  // // eslint-disable-next-line
  // renderCustom(field: FieldModel): JSX.Element | undefined {
  //   return undefined;
  // }

  // renderFile(field: FieldModel): JSX.Element | undefined {
  //   //@ts-ignore
  //   return <File isJustShow={true} />;
  // }

  // getSimpleItemSource(field: FieldModel): ItemSourceModel[] {
  //   return field.setting.options ? field.setting.options : [];
  // }

  // getItemSourceFilter(value: Array<ItemSourceModel>, includeEmpty = true) {
  //   const obj = {};
  //   const result = value
  //     .filter((x) => includeEmpty || x.value)
  //     .reduce((cur: Array<ItemSourceModel>, next) => {
  //       ////obj[next.value] ? "" : (obj[next.value] = true && cur.push(next));
  //       if (!obj[next.value]) {
  //         obj[next.value] = true;
  //         cur.push(next);
  //       }

  //       return cur;
  //     }, []);

  //   return result;
  // }

  // // eslint-disable-next-line
  // @Watch("field", { deep: true, immediate: true }) watchFieldChange(val: FieldModel, oldVal: FieldModel) {
  //   this.updateState = false;
  //   if (!val.setting.sourceTypeId) {
  //     return [];
  //   }

  //   apiGetCodeSourceByCodeType(val.setting.sourceTypeId).then((data: TreeItemModel[]) => {
  //     this.remoteOptions = data;
  //     setTreeCanSelect(this.remoteOptions);

  //     this.$nextTick(() => {
  //       this.updateState = true;
  //     });
  //   });
  // }
}
