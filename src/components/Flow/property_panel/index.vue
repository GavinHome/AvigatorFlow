<template>
  <div class="property-dialog">
    <StartProperty
      v-if="nodeData.type === 'start'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <EndProperty
      v-if="nodeData.type === 'end'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <EdgeProperty
      v-if="nodeData.type === 'polyline'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <ApprovalProperty
      v-if="nodeData.type === 'approval'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <GatewayProperty
      v-if="nodeData.type === 'gateway'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LogicFlow from "@logicflow/core";
import StartProperty from "./StartProperty.vue";
import EndProperty from "./EndProperty.vue";
import EdgeProperty from "./EdgeProperty.vue";
import ApprovalProperty from "./ApprovalProperty.vue";
import GatewayProperty from "./GatewayProperty.vue";

@Component({
  components: {
    StartProperty,
    EndProperty,
    EdgeProperty,
    ApprovalProperty,
    GatewayProperty,
  },
})
export default class PropertyPanel extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  handleClose(): void {
    this.$emit("setPropertiesFinish");
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
.property-dialog {
  padding: 0px 10px;
}
</style>
