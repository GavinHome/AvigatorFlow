<template>
  <div class="avigator-form-view">表单设计</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class FormComponent extends Vue {
  //eslint-disable-next-line
//   @Prop() private bodyStyle!: any;
}
</script>

<style scoped lang="scss">
@import "./common/style.scss";

.avigator-form-view {
  height: 100vh;
  position: relative;
}
</style>
