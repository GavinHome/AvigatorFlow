<template>
  <div class="card">
    <a-card
      type="inner"
      :bordered="bordered"
      :hoverable="hoverable"
      :loading="loading"
      :headStyle="headStyle"
      :bodyStyle="bodyStyle"
    >
      <template #title>
        <slot name="title">
          {{ title }}
        </slot>
      </template>
      <template #extra>
        <slot name="extra"> </slot>
      </template>
      <slot></slot>
    </a-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ default: "", type: String }) readonly title!: string;
  @Prop({ default: false, type: Boolean }) readonly loading!: boolean;
  @Prop({ default: true, type: Boolean }) readonly bordered!: boolean;
  @Prop({ default: false, type: Boolean }) readonly hoverable!: boolean;
  @Prop({
    default: () => {
      return {
        padding: "10px 15px",
      };
    },
    type: Object,
  })
  readonly bodyStyle!: Record<string, unknown>;
  @Prop({
    default: () => {
      return {
        padding: "0 10px",
        "min-height": "30px",
        "font-weight": "bold",
      };
    },
    type: Object,
  })
  readonly headStyle!: Record<string, unknown>;
}
</script>
<style scoped lang="scss">
.card {
  margin-bottom: 10px;
  ::v-deep.ant-card-head-title {
    padding: 10px 0 !important;
  }
}
</style>
