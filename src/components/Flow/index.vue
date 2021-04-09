<template>
  <div class="avigator-flow-view">
    <slot name="title"></slot>

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
    <div id="flow-view" :style="bodyStyle"></div>

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

import LogicFlow, { Definition } from "@logicflow/core";
import { Menu, SelectionSelect, Snapshot, MiniMap } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import { theme } from "./theme";

import Control from "./tools.vue";
import NodePanel from "./node_panel/index.vue";
import DataPanel from "./data_panel/index.vue";
import PropertyPanel from "./property_panel/index.vue";

import {
  registerStart,
  registerApproval,
  registerGateway,
  registerSystem,
  registerEnd,
} from "./register_nodes";

import { registerPolyline } from "./register_edges";

import { flowConfig } from "./config";
import {
  GraphConfigData,
  loadInitDodes,
  NodeSchema,
  NodesData,
  schemaAdapter,
} from "@/common/model";
import demoData from "./example.json";

@Component({
  components: {
    Control,
    NodePanel,
    DataPanel,
    PropertyPanel,
  },
})
export default class Portal extends Vue {
  //eslint-disable-next-line
  @Prop() private bodyStyle!: any;
  @Prop() private isSilentMode!: boolean;

  private lf: LogicFlow | null = null;

  private clickNode = null;
  private dialogVisible = false;
  private graphData: GraphConfigData | null = null;
  private dataVisible = false;

  mounted(): void {
    this.init();
  }

  //eslint-disable-next-line
  public getData(): any {
    if (this.lf) {
      const data = this.lf.getGraphData();
      // console.log(JSON.stringify(data));
      return data;
    }

    return null;
  }

  /// 初始化
  private init() {
    let container = document.querySelector("#flow-view") as HTMLElement;
    if (!container) {
      return;
    }

    // 使用插件
    LogicFlow.use(Menu);
    LogicFlow.use(Snapshot);
    LogicFlow.use(MiniMap);
    LogicFlow.use(SelectionSelect);

    // 画布配置
    // eslint-disable-next-line
    const config: Definition = flowConfig(container, this.isSilentMode);
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

    // 加载默认节点
    // loadInitDodes(this.lf);

    // 注册事件
    this.register_event();

    // MiniMap
    // MiniMap.show(200, 200);
  }

  /// 设置节点菜单
  private setMenu() {
    if (this.lf) {
      this.lf.setMenuConfig({
        nodeMenu: [],
        edgeMenu: [],
      });

      // 设置节点菜单
      if (!this.isSilentMode) {
        const menuConfig = {
          nodeMenu: [
            {
              text: "属性",
              // eslint-disable-next-line
              callback: (node: any) => {
                this.clickNode = node;
                this.dialogVisible = true;
              },
            },
            {
              text: "删除",
              // eslint-disable-next-line
              callback: (node: any) => {
                console.log("node delete: ", node);
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
                this.dialogVisible = true;
              },
            },
            {
              text: "删除",
              // eslint-disable-next-line
              callback: (node: any) => {
                console.log("edge delete: ", node);
                this.lf && this.lf.deleteEdge(node.id);
              },
            },
          ],
        };
        this.lf.addMenuConfig(menuConfig);
      }
    }
  }

  /// register node
  private registerNodes() {
    if (this.lf) {
      registerStart(this.lf);
      registerApproval(this.lf);
      registerGateway(this.lf);
      registerSystem(this.lf);
      registerEnd(this.lf);
    }
  }

  /// register edges
  private registerEdges() {
    if (this.lf) {
      registerPolyline(this.lf);
    }
  }

  /// register event
  private register_event(): void {
    if (this.lf) {
      this.lf.on("node:click", ({ data }) => {
        this.clickNode = data;
      });

      this.lf.on("node:dbclick", ({ data }) => {
        this.clickNode = data;
        this.dialogVisible = true;
      });

      this.lf.on("edge:dbclick", ({ data }) => {
        this.clickNode = data;
        this.dialogVisible = true;
      });

      this.lf.on("edge:click", ({ data }) => {
        this.clickNode = data;
      });

      this.lf.on("connection:not-allowed", (data) => {
        this.$message({
          type: "error",
          message: data.msg,
        });
      });

      this.lf.on("node:add", ({ data }) => {
        let n = NodesData.find((n) => n.type === data.type);
        var properties: NodeSchema | null = n ? schemaAdapter(n) : null;

        if (this.lf && properties) {
          this.lf.setProperties(data.id, properties);
          data = this.lf.getNodeData(data.id);
        }

        this.clickNode = data;
        this.dialogVisible = true;
      });

      this.lf.on("edge:add", ({ data }) => {
        var properties = {
          name: "",
          enName: "Condition",
          condition: "",
        };
        if (this.lf) {
          this.lf.setProperties(data.id, properties);
        }
      });
    }
  }

  //关闭弹框
  private closeDialog(): void {
    this.dialogVisible = false;
  }

  // 查看数据
  private catData() {
    this.graphData = this.lf ? this.lf.getGraphData() : null;
    this.dataVisible = true;
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
    height: 100%;
    outline: none;
  }

  .el-drawer__body {
    height: 80%;
    overflow: auto;
    margin-top: -30px;
    z-index: 3;
  }
}
</style>
