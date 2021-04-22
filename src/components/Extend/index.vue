<template>
  <div class="avigator-extend-view">
    扩展设置，包括提交设置，提醒设置，自动化设置
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ExtendComponent extends Vue {}
</script>

<style scoped lang="scss">
.avigator-extend-view {
  height: 100vh;
  position: relative;
}
</style>
