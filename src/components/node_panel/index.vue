<template>
  <div class="node-panel">
    <div
      class="node-item"
      v-for="item in nodeList"
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
import { NodeModel } from "@/common/model";

@Component
export default class NodePanel extends Vue {
  @Prop() private lf!: LogicFlow;

  private nodeList: Array<NodeModel> = [
    {
      text: "开始",
      type: "start",
      class: "node-start",
    },
    // {
    //   text: "任务",
    //   type: "task",
    //   class: "node-rect",
    // },
    // {
    //   text: "用户",
    //   type: "user",
    //   class: "node-user",
    // },
    // {
    //   text: "推送",
    //   type: "push",
    //   class: "node-push",
    // },
    // {
    //   text: "下载",
    //   type: "download",
    //   class: "node-download",
    // },
    {
      text: "审批节点",
      type: "approval",
      class: "node-approval",
    },
    // {
    //   text: "系统任务",
    //   type: "system",
    //   class: "node-system",
    // },
    {
      text: "网关节点",
      type: "gateway",
      class: "node-gateway",
    },
    {
      text: "结束",
      type: "end",
      class: "node-end",
    },
  ];

  dragNode(item: NodeModel): void {
    this.lf.dnd.startDrag({
      type: item.type,
      text: item.text,
    });
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/common.scss";

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
  margin-left: 20px;
  background-size: cover;
}
.node-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}
.node-start {
  background: url("./node_type_icon/start.png") no-repeat;
  background-size: cover;
}
.node-rect {
  border: 1px solid black;
}
.node-user {
  background: url("./node_type_icon/user.png") no-repeat;
  background-size: cover;
}
.node-time {
  background: url("./node_type_icon/time.png") no-repeat;
  background-size: cover;
}
.node-push {
  background: url("./node_type_icon/push.png") no-repeat;
  background-size: cover;
}
.node-download {
  background: url("./node_type_icon/download.png") no-repeat;
  background-size: cover;
}
.node-click {
  background: url("./node_type_icon/click.png") no-repeat;
  background-size: cover;
}
.node-end {
  background: url("./node_type_icon/end.png") no-repeat;
  background-size: cover;
}
.node-approval {
  background: url("./node_type_icon/user.png") no-repeat;
  background-size: cover;
}
.node-system {
  background: url("./node_type_icon/click.png") no-repeat;
  background-size: cover;
}
.node-gateway {
  background: url("./node_type_icon/time.png") no-repeat;
  background-size: cover;
}
</style>
