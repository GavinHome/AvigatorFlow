<template>
  <div class="avigator-designer-view">
    <div class="content">
      <a-row>
        <a-col span="4">
          <slot name="navigator_back" />
        </a-col>
        <a-col span="16">
          <a-steps v-model="current" type="navigation" :style="stepStyle">
            <a-step :status="getStatus(0)" title="表单设计" />
            <a-step :status="getStatus(1)" title="流程设计" />
            <a-step :status="getStatus(2)" title="列表设计" />
            <a-step :status="getStatus(3)" title="权限设计" />
            <a-step :status="getStatus(4)" title="应用发布" />
          </a-steps>
        </a-col>
        <a-col span="4"> </a-col>
      </a-row>

      <div v-if="current === 0">
        <Form :page="app.page" />
      </div>
      <div v-if="current === 1">
        <Flow
          :isSilentMode="false"
          :bodyStyle="{ height: '85%' }"
          :controlStyle="flowControlStyle"
          :nodeStyle="{ left: '15px' }"
        >
        </Flow>
      </div>
      <div v-if="current === 2">
        <List :data="app.list" />
      </div>
      <div v-if="current === 3">
        <Auth :data="app.auth" />
      </div>
      <div v-if="current === 4">
        <App :app="app" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AppModel } from "../common/model";
import { Component, Provide, Vue, Watch } from "vue-property-decorator";
import App from "../components/App/index.vue";
import Flow from "../components/Flow/index.vue";
import Form from "../components/Form/index.vue";
import List from "../components/List/index.vue";
import Auth from "../components/Auth/index.vue";
// import Extend from "../components/Auth/index.vue";

@Component({
  components: {
    Form,
    Flow,
    List,
    Auth,
    // Extend,
    App,
  },
})
export default class DesignerComponent extends Vue {
  current = 0;
  stepStyle = {
    boxShadow: "0px -1px 0 0 #e8e8e8 inset",
  };

  flowControlStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    "z-index": "2",
  };

  app: AppModel = {
    id: "",
    title: "发票管理",
    description: "发票管理",
    page: {
      name: "",
      description: "",
      rows: [
        {
          fields: [],
        },
      ],
    },
    flow: {},
    list: {},
    auth: {},
  };

  getStatus(step: number): string {
    return this.current >= step ? "process" : "wait";
  }

  @Provide()
  fields = [];

  @Provide()
  roles = [
    {
      value: "ProjectManager",
      text: "项目经理",
    },
    {
      value: "DepartmentManager",
      text: "部门经理",
    },
    {
      value: "Cash",
      text: "出纳",
    },
    {
      value: "Ceo",
      text: "总裁",
    },
  ];

  @Provide()
  users = [
    {
      value: "user001",
      text: "用户1",
    },
    {
      value: "user002",
      text: "用户2",
    },
    {
      value: "user003",
      text: "用户3",
    },
  ];

  @Watch("app", { immediate: true, deep: true }) appDataChanged() {
    const fields: Array<any> = [];
    this.app.page?.rows
      .filter((r: any) => r.fields.length > 0)
      .forEach((r: any) => {
        r.fields.forEach((f: any) => {
          fields.push({
            key: f.code,
            name: f.title,
            type: f.type,
          });
        });
      });
    this.fields = fields as Array<never>;
    debugger
  }
}
</script>
<style lang="scss" scoped>
$padding: 15px;
.avigator-designer-view {
  padding: $padding;
  background: #e8e8e8;
  height: 100vh;

  .content {
    background: white;
    height: 100%;
    padding: $padding;
  }
}
</style>
