<template>
  <el-tabs v-model="activeName" stretch>
    <el-tab-pane label="表单设计" name="form">
      <Form :page="page" />
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
    <el-tab-pane label="权限设置" name="auth">权限设置</el-tab-pane>
    <el-tab-pane label="应用设置" name="app">应用设置</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import Form from "../components/Form/index.vue";
import Flow from "../components/Flow/index.vue";
import { PageModel, WidgetTypeEnum } from "@/components/Form/common/model";

@Component({
  components: {
    Form,
    Flow,
  },
})
export default class FlowComponent extends Vue {
  activeName = "form";

  @Provide()
  fields = [
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
  ];

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

  page: PageModel = {
    name: "",
    description: "",
    rows: [
      {
        fields: [
          {
            id: "",
            type: WidgetTypeEnum.SingleText,
            icon: "",
            name: "",
            title: "单行文本",
            code: "",
            placeHolder: "",
            prompt: "",
            description: "",
            isRequired: false,
            isReadonly: false,
            setting: {},
            cols: 4,
          },
        ],
      },
    ],
  };
}
</script>

<style scoped lang="scss"></style>
