<template>
  <div class="avigator-list-view" :style="viewStyle">
    <SettingComponent :data="{}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SettingComponent from "./setting.vue";

@Component({
  components: {
    SettingComponent,
  },
})
export default class ListComponent extends Vue {
  //eslint-disable-next-line
  @Prop() private viewStyle!: any;
}
</script>

<style scoped lang="scss">
.avigator-list-view {
  height: 100vh;
  position: relative;
}
</style>
