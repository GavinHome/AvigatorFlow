<template>
  <div class="Drawer">
    <a-drawer
      :title="title"
      :width="width"
      :visible="true"
      :body-style="bodyStyle"
      :closable="true"
      :destroyOnClose="true"
      @close="onClose"
      ><slot></slot>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Drawer extends Vue {
  @Prop({ default: "", type: String }) readonly title!: string;
  @Prop({ default: "65%", type: String }) readonly width!: string;

  @Prop({
    default: () => {
      return {
        padding: "10px 15px",
      };
    },
    type: Object,
  })
  readonly bodyStyle!: Record<string, unknown>;

  @Emit("close")
  onClose(): void {}
}
</script>
