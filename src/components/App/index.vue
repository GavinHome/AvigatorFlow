<template>
  <div class="avigator-app-view">
    <Setting :app="app" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppModel } from "./model";
import Setting from "./setting.vue";

@Component({
  components: {
    Setting,
  },
})
export default class AppComponent extends Vue {
  @Prop() app!: AppModel;
}
</script>

<style scoped lang="scss">
.avigator-app-view {
  height: 100vh;
  position: relative;
}
</style>
