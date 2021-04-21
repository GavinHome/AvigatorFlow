<template>
  <div class="datePicker">
    <a-date-picker
      :allowClear="false"
      :placeholder="placeholder"
      :format="format"
      :disabled="disabled"
      v-model="selectValue"
      change="onChange"
    />
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
  Emit,
  Model,
} from "vue-property-decorator";
import moment from "moment";
import { DATE_FORMAT, DATE_FORMAT_NO_TIME } from "../common/const";
import { formatDateTime } from "../common/utils";

@Component({
  components: {},
})
export default class DatePicker extends Vue {
  @Prop({ type: String, default: "请选择时间" }) readonly placeholder!: string;
  @Prop({ type: String, default: DATE_FORMAT_NO_TIME })
  readonly format!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Model("change", { type: String }) readonly value!: string;

  selectValue: moment.Moment | null = null;

  @Watch("value", { deep: true, immediate: true }) watchValueChange(
    val: string
  ): void {
    if (val) {
      const temp = moment(this.value);
      if (
        this.selectValue === null ||
        this.selectValue.toDate().getTime() !== temp.toDate().getTime()
      ) {
        this.selectValue = temp;
      }
    }
  }

  onChange(val: moment.Moment): void {
    const dateStr = formatDateTime(val.toDate(), DATE_FORMAT);
    this.triggerChange(dateStr);
  }

  //eslint-disable-next-line
  @Emit("change") triggerChange(value: string): void {}
}
</script>
