<template>
  <div class="property-dialog">
    <User
      v-if="nodeData.type === 'user'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <CommonProperty
      v-else
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LogicFlow from "@logicflow/core";
import CommonProperty from "./CommonProperty.vue";
import User from "./User.vue";

@Component({
  components: {
    CommonProperty,
    User,
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
