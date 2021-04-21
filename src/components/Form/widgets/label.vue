<template>
  <div class="customLabel">
    <label class="renderContent">{{ showValue }}</label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Label extends Vue {
  @Prop({ default: "暂无", type: String }) readonly value!: string;
  showValue = "";

  @Watch("value", { deep: true, immediate: true }) watchSelectedValueChange(
    val: string,
    oldVal: string
  ): void {
    if (val !== oldVal) {
      this.showValue = val;
    }
  }
}
</script>
