<template>
  <div class="a-custom-description">
    <label :style="{ 'font-size': fontSize + 'px' }">{{ showValue }}</label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Label extends Vue {
  @Prop({ default: "描述文本", type: String }) readonly value!: string;
  @Prop({ default: 14, type: Number }) readonly fontSize!: number;
  showValue = "";

  @Watch("value", { deep: true, immediate: true }) watchValueChange(
    val: string,
    oldVal: string
  ): void {
    debugger;
    if (val !== oldVal) {
      this.showValue = val;
    }
  }
}
</script>

<style lang="scss" scoped>
// $form-filed-min-height: 93px;
// .a-custom-description {
//   height: $form-filed-min-height;
// }
</style>
