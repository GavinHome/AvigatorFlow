<template>
  <div class="avigator-report-view" :style="viewStyle">报表设计</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ReportComponent extends Vue {
  //eslint-disable-next-line
  @Prop() private viewStyle!: any;
}
</script>

<style scoped lang="scss">
.avigator-report-view {
  height: 100vh;
  position: relative;
}
</style>
