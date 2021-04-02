<template>
  <div class="avigator-flow-view">
    <h3 class="text-center" style="margin: 20px">{{ title }}</h3>

    <!-- 辅助工具栏 -->
    <Control
      class="control-menus"
      v-if="lf"
      :lf="lf"
      @catData="catData"
    ></Control>
    <!-- 节点面板 -->
    <NodePanel :lf="lf"></NodePanel>

    <!-- 画布 -->
    <div id="flow-view"></div>

    <!-- 用户节点自定义操作面板 -->
    <!-- <AddPanel
      v-if="showAddPanel"
      class="add-panel"
      :style="addPanelStyle"
      :lf="lf"
      :nodeData="addClickNode"
      @addNodeFinish="hideAddPanel"
    >
    </AddPanel> -->

    <!-- 属性面板 -->
    <el-drawer
      title="设置节点属性"
      :visible.sync="dialogVisible"
      direction="rtl"
      size="500px"
      :before-close="closeDialog"
    >
      <PropertyPanel
        v-if="dialogVisible"
        :nodeData="clickNode"
        :lf="lf"
        @setPropertiesFinish="closeDialog"
      ></PropertyPanel>
    </el-drawer>

    <!-- 数据面板 -->
    <el-dialog title="数据" :visible.sync="dataVisible" width="50%">
      <DataPanel :graphData="graphData"></DataPanel>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import LogicFlow from "@logicflow/core";
import { Menu, Snapshot } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import { theme } from "@/components/theme";

import Control from "@/components/control_menus/index.vue";
import NodePanel from "@/components/node_panel/index.vue";
import DataPanel from "@/components/data_panel/index.vue";
import PropertyPanel from "@/components/property_settings/PropertyPanel.vue";
import AddPanel from "@/components/custom_panel/AddPanel.vue";

import {
  registerDownload,
  registerEnd,
  // registerPolyline,
  registerPush,
  registerStart,
  registerUser,
} from "./register_nodes";

import { registerPolyline } from "./register_edges";

import demoData from "@/components/data_new.json";

@Component({
  components: {
    Control,
    NodePanel,
    DataPanel,
    PropertyPanel,
    AddPanel,
  },
})
export default class Portal extends Vue {
  @Prop() private title!: string;
  @Prop() private isSilentMode!: boolean;

  private lf: LogicFlow | null = null;
  private showAddPanel = false;
  //eslint-disable-next-line
  private addPanelStyle: any = {
    top: 0,
    left: 0,
  };

  private addClickNode = null;
  private clickNode = null;
  private dialogVisible = false;
  private graphData = null;
  private dataVisible = false;

  mounted(): void {
    this.init();
  }

  private init() {
    // 使用插件
    LogicFlow.use(Menu);
    LogicFlow.use(Snapshot);

    // 画布配置
    // eslint-disable-next-line
    const config: any = this.getFlowConfig();
    this.lf = new LogicFlow({ ...config });

    // 设置节点菜单
    this.setMenu();

    // 设置主题
    this.lf.setTheme(theme);

    // 注册节点
    this.registerNodes();

    // 注册连接
    this.registerEdges();

    // 加载数据
    this.lf.render(demoData);

    // 注册事件
    this.register_event();
  }

  // 设置节点菜单
  private setMenu() {
    // 菜单配置文档：http://logic-flow.org/guide/extension/extension-components.html#%E8%8F%9C%E5%8D%95
    // 重置，增加，节点自由配置(以user节点为示例)
    if (this.lf) {
      this.lf.setMenuConfig({
        nodeMenu: [],
        edgeMenu: [],
      });

      // 设置节点菜单
      if (!this.isSilentMode) {
        const menuConfig = this.getMenuConfig();
        this.lf.addMenuConfig(menuConfig);
      }
    }
  }

  // register node
  private registerNodes() {
    console.log("register Nodes");
    if (this.lf) {
      registerStart(this.lf);
      registerUser(this.lf);
      registerEnd(this.lf);
      registerPush(this.lf, this.clickPlus, this.mouseDownPlus);
      registerDownload(this.lf);
      // registerPolyline(this.lf);
    }
  }

  // register node
  private registerEdges() {
    console.log("register Edges");
    if (this.lf) {
      registerPolyline(this.lf);
    }
  }

  // instance config
  private getFlowConfig() {
    return {
      isSilentMode: this.isSilentMode,
      container: document.querySelector("#flow-view"),
      background: {
        color: "#f7f9ff",
      },
      style: {
        rect: {
          strokeWidth: 1,
        },
        circle: {
          r: 20,
          strokeWidth: 1,
        },
        ellipse: {
          strokeWidth: 1,
        },
        diamond: {
          strokeWidth: 1,
        },
        polygon: {
          strokeWidth: 1,
        },
        anchor: {
          strokeWidth: 1,
        },
        line: {
          strokeWidth: 1,
        },
        arrow: {
          strokeWidth: 1,
        },
        polyline: {
          strokeWidth: 1,
        },
      },
      grid: {
        size: 10,
        visible: false,
      },
      keyboard: {
        enabled: true,
      },
      hoverOutline: true,
      edgeTextDraggable: true,
      guards: {
        // eslint-disable-next-line
        beforeClone(data: any) {
          console.log("beforeClone", data);
          return true;
        },
        // eslint-disable-next-line
        beforeDelete(data: any) {
          // 可以根据data数据判断是否允许删除，允许返回true,不允许返回false
          // 文档： http://logic-flow.org/guide/basic/keyboard.html#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E5%88%A0%E9%99%A4%E6%88%96%E8%80%85%E6%8B%B7%E8%B4%9D%E8%A1%8C%E4%B8%BA
          console.log("beforeDelete", data);
          // _this.$message('不允许删除', 'error')
          return true;
        },
      },
    };
  }

  // menu config
  private getMenuConfig() {
    return {
      nodeMenu: [
        {
          text: "属性",
          // eslint-disable-next-line
          callback: (node: any) => {
            console.log(`
                节点id：${node.id}
                节点类型：${node.type}
                节点坐标：(x: ${node.x}, y: ${node.y})`);
            this.clickNode = node;
            this.dialogVisible = true;
          },
        },
        {
          text: "删除",
          // eslint-disable-next-line
          callback: (node: any) => {
            this.lf && this.lf.deleteNode(node.id);
          },
        },
      ],
      edgeMenu: [
        {
          text: "属性",
          // eslint-disable-next-line
          callback: (edge: any) => {
            this.clickNode = edge;
            console.log(`
                边id：${edge.id}
                边类型：${edge.type}
                边坐标：(x: ${edge.x}, y: ${edge.y})
                源节点id：${edge.sourceNodeId}
                目标节点id：${edge.targetNodeId}`);
            this.dialogVisible = true;
          },
        },
        {
          text: "删除",
          // eslint-disable-next-line
          callback: (node: any) => {
            this.lf && this.lf.deleteEdge(node.id);
          },
        },
      ],
    };
  }

  private register_event(): void {
    if (this.lf) {
      this.lf.on("node:click", ({ data }) => {
        console.log("node:click", data);
        this.clickNode = data;
        // this.dialogVisible = true;
      });

      this.lf.on("edge:click", ({ data }) => {
        console.log("edge:click", data);
        this.clickNode = data;
        // this.dialogVisible = true;
      });

      this.lf.on("element:click", () => {
        this.hideAddPanel();
      });

      this.lf.on("blank:click", () => {
        this.hideAddPanel();
      });

      this.lf.on("connection:not-allowed", (data) => {
        this.$message({
          type: "error",
          message: data.msg,
        });
      });

      this.lf.on("node:mousemove", () => {
        console.log("on mousemove");
      });
    }
  }

  //eslint-disable-next-line
  clickPlus(e: any, attributes: any): void {
    e.stopPropagation();
    console.log("clickPlus", e, attributes);
    const { clientX, clientY } = e;
    console.log(clientX, clientY);
    this.addPanelStyle.top = clientY - 40 + "px";
    this.addPanelStyle.left = clientX + "px";
    this.showAddPanel = true;
    this.addClickNode = attributes;
  }

  //eslint-disable-next-line
  mouseDownPlus(e: any, attributes: any): void {
    e.stopPropagation();
    console.log("mouseDownPlus", e, attributes);
  }

  hideAddPanel(): void {
    this.showAddPanel = false;
    this.addPanelStyle.top = 0;
    this.addPanelStyle.left = 0;
    this.addClickNode = null;
  }

  closeDialog(): void {
    this.dialogVisible = false;
  }

  // 查看数据
  private catData() {
    this.graphData = this.lf ? this.lf.getGraphData() : null;
    this.dataVisible = true;
  }

  private getData() {
    if (this.lf) {
      const data = this.lf.getGraphData();
      console.log(JSON.stringify(data));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/common.scss";

.avigator-flow-view {
  height: 100vh;
  position: relative;

  .control-menus {
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 2;
  }

  #flow-view {
    width: calc(100% - 100px);
    height: 85%;
    outline: none;
    margin-left: 50px;
  }

  .time-plus {
    cursor: pointer;
  }

  .add-panel {
    position: absolute;
    z-index: 11;
    background-color: white;
    padding: 10px 5px;
  }

  .el-drawer__body {
    height: 80%;
    overflow: auto;
    margin-top: -30px;
    z-index: 3;
  }
}
</style>
