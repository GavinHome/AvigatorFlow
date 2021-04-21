<template>
  <div class="avigator-list-view">
    <SettingComponent :data="{}" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SettingComponent from "./setting.vue";

@Component({
  components: {
    SettingComponent,
  },
})
export default class ListComponent extends Vue {}
</script>

<style scoped lang="scss">
.avigator-list-view {
  height: 100vh;
  position: relative;
}
</style>
