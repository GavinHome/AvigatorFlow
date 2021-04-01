<template>
  <div class="property-dialog">
    <StartProperty
      v-if="nodeData.type === 'start'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <UserProperty
      v-if="nodeData.type === 'user'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <PushProperty
      v-if="nodeData.type === 'push'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <DownloadProperty
      v-if="nodeData.type === 'download'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <TaskProperty
      v-if="nodeData.type === 'rect'"
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LogicFlow from "@logicflow/core";
import StartProperty from "./StartProperty.vue";
import UserProperty from "./UserProperty.vue";
import EndProperty from "./EndProperty.vue";
import PushProperty from "./PushProperty.vue";
import DownloadProperty from "./DownloadProperty.vue";
import TaskProperty from "./TaskProperty.vue";
import EdgeProperty from "./EdgeProperty.vue";

@Component({
  components: {
    StartProperty,
    UserProperty,
    EndProperty,
    PushProperty,
    DownloadProperty,
    TaskProperty,
    EdgeProperty,
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
@import "@/assets/common.scss";
.property-dialog {
  padding: 20px;
}
</style>
