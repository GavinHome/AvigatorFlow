<template>
  <a-radio-group
    v-model="cols"
    button-style="solid"
    :disabled="readonly"
    @change="onChange"
  >
    <a-radio-button
      :value="option.value"
      v-for="option of options"
      :key="option.value"
      :disabled="option.disabled"
      >{{ option.text }}</a-radio-button
    >
  </a-radio-group>
</template>

<script lang="ts">
import { DataOption } from "../../common/model";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  model: {
    prop: "columns",
    event: "change",
  },
  components: {},
})
export default class FieldClumns extends Vue {
  @Prop({ default: 4 }) maxCols!: number;
  @Prop() columns!: number;
  @Prop() readonly!: boolean;
  cols: number = this.columns | 4;

  get options(): Array<DataOption> {
    const options = [1, 2, 3, 4].map((col) =>
      Object({
        value: col,
        text: `${col * 25}%`,
        disabled: col <= this.maxCols ? false : true,
      })
    );
    return options;
  }

  //eslint-disable-next-line
  onChange(e: any): void {
    this.$emit("change", e.target.value);
  }
}
</script>
<style scoped lang="scss">
@import "../../form.scss";
</style>
