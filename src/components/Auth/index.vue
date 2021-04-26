<template>
  <div class="avigator-auth-view" :style="viewStyle">
    权限设置：发起，导入，导出，报表
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class AuthComponent extends Vue {
  //eslint-disable-next-line
  @Prop() private viewStyle!: any;
}
</script>

<style scoped lang="scss">
.avigator-auth-view {
  height: 100vh;
  position: relative;
}
</style>
