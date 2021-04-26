<template>
  <div class="avigator-extend-view" :style="viewStyle">
    扩展设置，包括提交设置，提醒设置，自动化设置
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ExtendComponent extends Vue {
  //eslint-disable-next-line
  @Prop() private viewStyle!: any;
}
</script>

<style scoped lang="scss">
.avigator-extend-view {
  height: 100vh;
  position: relative;
}
</style>
