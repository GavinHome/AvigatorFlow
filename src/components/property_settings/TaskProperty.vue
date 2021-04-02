<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="节点名称">
        <el-input v-model="formData.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="执行人员">
        <el-input v-model="formData.executor.code"></el-input>
      </el-form-item>
      <!-- <el-form-item label="任务表单">
        <el-input v-model="formData.form"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="审批规则">
        <el-radio-group v-model="formData.rule">
          <el-radio-button
            v-for="(option, index) in rules"
            :label="option.value"
            :key="index"
            >{{ option.text }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="聚合方式">
        <el-radio-group v-model="formData.aggregation">
          <el-radio-button
            v-for="(option, index) in aggregations"
            :label="option.value"
            :key="index"
            >{{ option.text }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批动作">
        <el-checkbox-group v-model="formData.actions">
          <el-checkbox-button
            v-for="(option, index) in actions"
            :label="option.value"
            :key="index"
            >{{ option.text }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="节点描述">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LogicFlow from "@logicflow/core";

import {
  AggregationModeType,
  ApprovalActionType,
  ApprovalRuleType,
  Taskchema,
  ApprovalRules,
  AggregationModes,
  DataOption,
} from "@/common/model";

@Component
export default class TaskProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  rules = ApprovalRules;
  aggregations = AggregationModes;
  actions: Array<DataOption> = [
    {
      value: "Save",
      text: "保存",
    },
    {
      value: "Submit",
      text: "提交",
    },
  ];

  formData: Taskchema = {
    name: "执行人",
    enName: "Executor",
    executor: {
      name: "",
      code: "",
    },
    description: "",
    form: {},
    aggregation: AggregationModeType.AllAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: [
      ApprovalActionType.Pass,
      ApprovalActionType.Reject,
      ApprovalActionType.Assist,
    ],
  };

  mounted(): void {
    const { properties, text } = this.nodeData;
    if (properties) {
      this.formData = Object.assign({}, this.formData, properties);
      if (text && text.value) {
        this.formData.name = text.value;
      }
    }
  }

  onSubmit(): void {
    console.log("submit!");
    const { id } = this.nodeData;
    this.lf.setProperties(id, this.formData);
    this.$emit("onClose");
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/common.scss";
</style>
