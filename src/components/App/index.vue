<template>
  <div class="avigator-app-view" :style="viewStyle">
    <Setting :app="app" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppModel } from "../../common/model";
import Setting from "./setting.vue";

@Component({
  components: {
    Setting,
  },
})
export default class AppComponent extends Vue {
  @Prop() app!: AppModel;
  //eslint-disable-next-line
  @Prop() private viewStyle!: any;
}
</script>

<style scoped lang="scss">
.avigator-app-view {
  height: 100vh;
  position: relative;
}
</style>
