<template>
  <div class="dateRangePicker">
    <a-range-picker
      class="p-calendar-picker"
      :allowClear="false"
      :format="format"
      :disabled="disabled"
      v-model="selectValue"
      @change="onChange"
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
import { DATE_FORMAT, DATE_FORMAT_NO_TIME } from "../common/const";
import moment from "moment";
import { formatDateTime } from "../common/utils";

@Component({
  components: {},
})
export default class DateRangePicker extends Vue {
  @Prop({ type: String, default: "请选择时间" }) readonly placeholder!: string;
  @Prop({ type: String, default: DATE_FORMAT_NO_TIME })
  readonly format!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Model("change", { type: Array }) readonly value!: string[];

  selectValue: (moment.Moment | null)[] | null = null;

  @Watch("value", { deep: true, immediate: true }) watchValueChange(
    val: string[]
  ): void {
    if (val) {
      this.selectValue = [];
      if (val.length > 1) {
        this.selectValue = [moment(val[0]), moment(val[1])];
      } else if (val.length === 1) {
        this.selectValue = [moment(val[0]), null];
      }
    }
  }

  onChange(val: moment.Moment[]): void {
    if (val && val.length > 0) {
      const dateStr = val.map((x) => formatDateTime(x.toDate(), DATE_FORMAT));
      this.triggerChange(dateStr);
    } else {
      this.triggerChange(null);
    }
  }

  //eslint-disable-next-line
  @Emit("change") triggerChange(value: string[] | null): void {}
}
</script>
<style lang="scss" scoped>
.p-calendar-picker {
  width: 100%;
}
</style>
