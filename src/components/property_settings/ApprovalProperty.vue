<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="节点名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="审批人员">
        <el-input v-model="formData.executor.code"></el-input>
      </el-form-item>
      <el-form-item label="审批规则">
        <el-radio-group v-model="formData.rule">
          <el-radio-button
            v-for="(option, index) in rules"
            :label="option.value"
            :key="index"
            >{{ option.text }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="聚合方式">
        <el-radio-group v-model="formData.aggregation">
          <el-radio-button
            v-for="(option, index) in aggregations"
            :label="option.value"
            :key="index"
            >{{ option.text }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item> -->
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
  NodeSchema,
  ApprovalRules,
  AggregationModes,
  DataOption,
  NodeNameConst,
} from "@/common/model";

@Component
export default class UserProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  rules = ApprovalRules;
  aggregations = AggregationModes;
  actions: Array<DataOption> = [
    {
      value: "Pass",
      text: "同意",
    },
    {
      value: "Reject",
      text: "拒绝",
    },
    {
      value: "Assist",
      text: "协审",
    },
  ];

  formData: NodeSchema = {
    name: NodeNameConst.APPROVAL,
    enName: "Approver",
    executor: {
      name: "",
      code: "",
    },
    description: "",
    aggregation: AggregationModeType.AllAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: [
      ApprovalActionType.Pass,
      ApprovalActionType.Reject,
      ApprovalActionType.Assist,
    ],
  };

  mounted(): void {
    const { properties } = this.nodeData;
    if (properties) {
      this.formData = Object.assign({}, this.formData, properties);
    }
  }

  onSubmit(): void {
    console.log("submit!");
    const { id } = this.nodeData;
    this.lf.setProperties(id, this.formData);
    this.lf.updateText(id, this.formData.name);
    this.$emit("onClose");
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/common.scss";
</style>
