<template>
  <div>
    <vue-json-pretty :path="'res'" :data="graphData" class="text-left">
    </vue-json-pretty>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

@Component({
  components: {
    VueJsonPretty,
  },
})
export default class DataPanel extends Vue {
  //eslint-disable-next-line
  @Prop() private graphData!: any;
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
