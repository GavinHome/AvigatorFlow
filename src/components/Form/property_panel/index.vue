<template>
  <component
    :is="widgetPropertyComponentName"
    :key="widgetType"
    :field="widget"
    :maxCols="maxCols"
  />
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from "vue-property-decorator";
import { WidgetSchema } from "../common/model";
import {
  DefaultProperty,
  LabelProperty,
  SingleTextProperty,
  MultipleTextProperty,
  NumberProperty,
  DateProperty,
  DateRangeProperty,
  SelectProperty,
  RadioProperty,
  CheckBoxProperty,
} from "./index";
@Component({
  components: {
    DefaultProperty,
    LabelProperty,
    SingleTextProperty,
    MultipleTextProperty,
    NumberProperty,
    DateProperty,
    DateRangeProperty,
    SelectProperty,
    RadioProperty,
    CheckBoxProperty,
  },
})
export default class PropertyPanel extends Vue {
  @Prop() widget!: WidgetSchema;

  @Provide("maxCols")
  @Prop()
  maxCols!: number;

  get widgetType(): string {
    return this.widget && this.widget.type ? this.widget.type : "default";
  }

  get widgetPropertyComponentName(): string {
    return `${this.widgetType}Property`;
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
