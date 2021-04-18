<template>
  <component
    :is="widgetPropertyComponentName"
    :key="widgetType"
    :field="widget"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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
export default class FormComponent extends Vue {
  @Prop() widget!: WidgetSchema;

  get widgetType() {
    return this.widget && this.widget.type ? this.widget.type : "default";
  }

  get widgetPropertyComponentName() {
    return `${this.widgetType}Property`;
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
