<template>
  <div class="page-preview">
    <Drawer title="界面预览" @close="onClose">
      <RenderPage v-if="page" :page="page" />
    </Drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import Drawer from "../common/drawer.vue";
import { PageModel } from "../common/model";
import RenderPage from "./renderPage/index";

@Component({
  components: {
    Drawer,
    RenderPage,
  },
})
export default class PagePreview extends Vue {
  @Prop() readonly page!: PageModel;
  loading = true;

  @Emit("close")
  onClose(): void {}
}
</script>
