<template>
  <div class="design">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="表单设计" name="form">
        <Form :page="app.page" />
      </el-tab-pane>

      <el-tab-pane label="流程设计" name="flow">
        <Flow
          :isSilentMode="false"
          :bodyStyle="{
            height: '85%',
          }"
          :controlStyle="{
            position: 'absolute',
            top: '10px',
            right: '10px',
            'z-index': '2',
          }"
          :nodeStyle="{
            left: '15px',
          }"
        >
        </Flow>
      </el-tab-pane>

      <el-tab-pane label="列表设计" name="list">
        <List />
      </el-tab-pane>

      <el-tab-pane label="权限设置" name="auth">
        <Auth />
      </el-tab-pane>

      <el-tab-pane label="报表设计" name="report">
        <Report />
      </el-tab-pane>

      <el-tab-pane label="扩展设置" name="extend">
        <Extend />
      </el-tab-pane>

      <el-tab-pane label="应用发布" name="publish">
        <App :app="app" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import Flow from "../components/Flow/index.vue";
import Form from "../components/Form/index.vue";
import List from "../components/List/index.vue";
import Auth from "../components/Auth/index.vue";
import Report from "../components/Report/index.vue";
import Extend from "../components/Auth/index.vue";
import App from "../components/App/index.vue";
import { AppModel } from "../common/model";

@Component({
  components: {
    Form,
    Flow,
    List,
    Auth,
    Report,
    Extend,
    App,
  },
})
export default class FlowComponent extends Vue {
  activeName = "form";

  @Provide()
  flowFormProvider = {
    fields: [
      {
        key: "abc",
        name: "变量1",
        type: "string",
      },
      {
        key: "bcd",
        name: "变量2",
        type: "string",
      },
      {
        key: "cde",
        name: "变量3",
        type: "select",
        options: [
          {
            value: "Yes",
            text: "是",
          },
          {
            value: "No",
            text: "否",
          },
        ],
      },
      {
        key: "def",
        name: "变量4",
        type: "number",
      },
      {
        key: "efg",
        name: "变量5",
        type: "checkbox",
        options: [
          {
            value: "1",
            text: "选项1",
          },
          {
            value: "2",
            text: "选项2",
          },
        ],
      },
      {
        key: "fgh",
        name: "变量6",
        type: "radiobox",
        options: [
          {
            value: "a",
            text: "选项a",
          },
          {
            value: "b",
            text: "选项b",
          },
        ],
      },
    ],
  };

  @Provide()
  roles = [
    {
      value: "ProjectManager",
      text: "项目经理",
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

  app: AppModel = {
    id: "",
    title: "发票管理",
    description: "申请开票",
    page: {
      name: "",
      description: "",
      rows: [
        {
          fields: [],
        },
      ],
    },
    permissions: [],
    flow: {
      nodes: [],
      edges: [],
    },
  };
}
</script>

<style scoped lang="scss">
.design {
  padding: 20px 50px;
  // background: red;
}
</style>
