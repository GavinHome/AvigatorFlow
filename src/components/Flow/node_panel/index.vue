<template>
  <div class="node-panel">
    <div
      class="node-item"
      v-for="item in nodes"
      :key="item.text"
      @mousedown="dragNode(item)"
    >
      <div class="node-item-icon" :class="item.class">
        <div
          v-if="item.type === 'user' || item.type === 'time'"
          class="shape"
        ></div>
      </div>
      <span class="node-label">{{ item.text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LogicFlow from "@logicflow/core";
import { NodeModel, NodesData } from "../common/model";

@Component
export default class NodePanel extends Vue {
  @Prop() private lf!: LogicFlow;

  private nodes: Array<NodeModel> = NodesData.map((n) =>
    Object({
      text: n.text,
      type: n.type,
      class: n.class,
    })
  );

  dragNode(item: NodeModel): void {
    this.lf.dnd.startDrag({
      type: item.type,
      text: item.text,
    });
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";

.node-panel {
  position: absolute;
  top: 100px;
  left: 50px;
  width: 70px;
  padding: 20px 10px;
  background-color: white;
  box-shadow: 0 0 10px 1px rgb(228, 224, 219);
  border-radius: 6px;
  text-align: center;
  z-index: 101;
}
.node-item {
  margin-bottom: 20px;
}
.node-item-icon {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background-size: cover;
}
.node-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}
.node-start {
  background: url("./icon/start.png") no-repeat;
  background-size: cover;
}
.node-rect {
  border: 1px solid black;
}
.node-user {
  background: url("./icon/user.png") no-repeat;
  background-size: cover;
}
.node-time {
  background: url("./icon/time.png") no-repeat;
  background-size: cover;
}
.node-push {
  background: url("./icon/push.png") no-repeat;
  background-size: cover;
}
.node-download {
  background: url("./icon/download.png") no-repeat;
  background-size: cover;
}
.node-click {
  background: url("./icon/click.png") no-repeat;
  background-size: cover;
}
.node-end {
  background: url("./icon/end.png") no-repeat;
  background-size: cover;
}
.node-approval {
  background: url("./icon/user.png") no-repeat;
  background-size: cover;
}
.node-system {
  background: url("./icon/click.png") no-repeat;
  background-size: cover;
}
.node-gateway {
  background: url("./icon/time.png") no-repeat;
  background-size: cover;
}
</style>
