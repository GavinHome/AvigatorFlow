<template>
  <a-radio-group v-model="column" button-style="solid">
    <a-radio-button
      :value="option.value"
      v-for="option of options"
      :key="option.value"
      >{{ option.text }}</a-radio-button
    >
  </a-radio-group>
</template>

<script lang="ts">
import { DataOption } from "../../common/model";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class FieldClumns extends Vue {
  @Prop() column!: number;

  get options(): Array<DataOption> {
    const options = [1, 2, 3, 4].map((col) =>
      Object({
        value: col,
        text: `${col * 25}%`,
      })
    );

    return options;
  }
}
</script>
