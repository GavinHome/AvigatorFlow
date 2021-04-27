import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { INPUT_NUMBER_MAX, INPUT_NUMBER_MIN } from "../common/const";

@Component
export default class InputNumber extends Vue {
  @Prop({ type: Number }) readonly value!: number;
  @Prop({ default: "", type: String }) readonly placeholder!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ default: false, type: Boolean }) readonly isRequired!: boolean;
  @Prop({ default: INPUT_NUMBER_MAX, type: Number })
  readonly maxNumberValue!: number;
  @Prop({ default: INPUT_NUMBER_MIN, type: Number })
  readonly minNumberValue!: number;
  @Prop({ default: 1, type: Number }) readonly step!: number;
  @Prop({ default: 2, type: Number }) readonly precision!: number;
  @Prop({ default: false, type: Boolean }) readonly isPercentage!: boolean;

  inputValue: number | undefined = undefined;

  created(): void {
    this.inputValue = this.value;
  }

  @Watch("value", { deep: true, immediate: true }) watchValueChange(
    val: number,
    oldVal: number
  ): void {
    if (
      val !== oldVal &&
      oldVal !== undefined &&
      this.inputValue !== this.value
    ) {
      this.inputValue = this.value;
    }
  }

  formatter(value: number): string {
    const v = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (this.isPercentage && v) {
      return `${v}%`;
    } else {
      return v;
    }
  }

  parser(value: string): string {
    const v = value.replace(/$s?|(,*)/g, "");
    if (this.isPercentage) {
      return v.replace("%", "");
    } else {
      return v;
    }
  }

  render(): JSX.Element | undefined {
    return (
      <a-input-number
        style="width:100%"
        max={this.maxNumberValue}
        min={this.minNumberValue}
        precision={this.precision}
        formatter={this.formatter}
        parser={this.parser}
        placeholder={this.placeholder}
        disabled={this.disabled}
        on-change={this.onchange}
        step={this.step}
        value={this.inputValue}
      />
    );
  }

  onchange(value: number): void {
    this.$emit("input", value);
    this.$emit("change", value);
    this.$emit("formula", value);
  }
}
