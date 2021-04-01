<template>
  <div class="avigator-flow-view">
    <h3 class="text-center m-20">{{ title }}</h3>

    <!-- 辅助工具栏 -->
    <Control
      class="control-menus"
      v-if="instance"
      :lf="instance"
      @catData="catData"
    ></Control>
    <!-- 节点面板 -->
    <NodePanel :lf="lf"></NodePanel>

    <!-- 画布 -->
    <div id="workspace-view"></div>
    <!-- 用户节点自定义操作面板 -->

    <!-- 属性面板 -->

    <!-- 数据面板 -->
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
import NodePanel from "@/components/panel/index.vue";

@Component({
  components: {
    Control,
    NodePanel,
  },
})
export default class Portal extends Vue {
  @Prop() private title!: string;

  private instance: LogicFlow | null = null;
  private showAddPanel = false;
  private addPanelStyle = {
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
    this.instance = new LogicFlow({ ...config });

    // 菜单配置文档：http://logic-flow.org/guide/extension/extension-components.html#%E8%8F%9C%E5%8D%95
    // 重置，增加，节点自由配置(以user节点为示例)
    this.instance.setMenuConfig({
      nodeMenu: [],
      edgeMenu: [],
    });

    // MenuConfig
    const menuConfig = this.getMenuConfig();
    this.instance.addMenuConfig(menuConfig);

    // 设置主题
    this.instance.setTheme(theme);

    // 注册节点
    this.registerNodes();

    // 注册连接
    this.registerEdges();
  }

  // register node
  private registerNodes() {
    console.log("register");
  }

  // register node
  private registerEdges() {
    console.log("register");
  }

  // instance config
  private getFlowConfig() {
    return {
      container: document.querySelector("#workspace-view"),
      background: {
        color: "#f7f9ff",
      },
      grid: {
        size: 10,
        visible: false,
      },
      keyboard: {
        enabled: true,
      },
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
          text: "分享",
          callback() {
            alert("分享成功！");
          },
        },
        {
          text: "属性",
          // eslint-disable-next-line
          callback(node: any) {
            alert(`
                节点id：${node.id}
                节点类型：${node.type}
                节点坐标：(x: ${node.x}, y: ${node.y})`);
          },
        },
      ],
      edgeMenu: [
        {
          text: "属性",
          // eslint-disable-next-line
          callback(edge: any) {
            alert(`
                边id：${edge.id}
                边类型：${edge.type}
                边坐标：(x: ${edge.x}, y: ${edge.y})
                源节点id：${edge.sourceNodeId}
                目标节点id：${edge.targetNodeId}`);
          },
        },
      ],
    };
  }

  // 查看数据
  private catData() {
    this.graphData = this.instance ? this.instance.getGraphData() : null;
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
}

#workspace-view {
  width: calc(100% - 100px);
  height: 80%;
  outline: none;
  margin-left: 50px;
}
</style>
