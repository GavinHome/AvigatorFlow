<template>
  <div class="home">
    <Flow
      :isSilentMode="false"
      :bodyStyle="{
        'padding-left': '50px',
        'padding-right': '50px',
        height: '85%',
      }"
    >
      <h3 slot="title" class="text-center" style="margin: 20px">
        AvigatorFlow
      </h3>
    </Flow>
  </div>
</template>

<script>
// @ is an alias to /src
import Flow from "@/components/Flow/index.vue";

export default {
  name: "Home",
  components: {
    Flow,
  },
  provide: {
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
    roles: [
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
    ],
    users: [
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
    ],
  },
};
</script>
