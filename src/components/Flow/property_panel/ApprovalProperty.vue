<template>
  <div>
    <el-form
      ref="ruleForm"
      label-width="80px"
      :model="formData"
      :rules="rulesData"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="基础设置">
          <el-form-item label="节点标识" prop="key">
            <el-input v-model="formData.key" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="节点名称" prop="name">
            <el-input v-model="formData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="审批人员">
            <ExecutorSetting v-model="formData.executor" />
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
            <el-input type="textarea" v-model="formData.description"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="字段权限"> </el-tab-pane>
      </el-tabs>

      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit" class="m-t-20">保存</el-button>
      </el-form-item> -->
    </el-form>

    <el-button type="primary" @click="onSubmit" class="m-t-20 text-center"
      >保存</el-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LogicFlow from "@logicflow/core";
import {
  ApprovalActionType,
  ApprovalRuleType,
  NodeSchema,
  ApprovalRules,
  DataOption,
  NodeNameConst,
  NodeIdConst,
  ExecutorRuleType,
  NodeNameTypeEnum,
} from "../common/model";
import { validateKeyExist } from "../common/validators";

import ExecutorSetting from "./executor_rule_setting/index.vue";

@Component({
  components: {
    ExecutorSetting,
  },
})
export default class ApprovalProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  rules = ApprovalRules;
  actions: Array<DataOption> = [
    {
      value: ApprovalActionType.Pass,
      text: "同意",
    },
    {
      value: ApprovalActionType.Reject,
      text: "拒绝",
    },
    {
      value: ApprovalActionType.Assist,
      text: "协审",
    },
  ];

  formData: NodeSchema = {
    key: NodeIdConst.APPROVAL,
    name: NodeNameConst.APPROVAL,
    enName: NodeNameTypeEnum.Approver,
    executor: {
      type: ExecutorRuleType.Designator,
      params: [],
    },
    description: "",
    rule: ApprovalRuleType.OneAgreed,
    actions: [
      ApprovalActionType.Pass,
      ApprovalActionType.Reject,
      ApprovalActionType.Assist,
    ],
  };

  rulesData = {
    key: [
      { required: true, message: "请输入节点标识", trigger: "blur" },
      {
        validator: validateKeyExist,
        flow: this.lf,
        id: this.nodeData.id,
        trigger: "blur",
      },
    ],
    name: [{ required: true, message: "请输入节点名称", trigger: "blur" }],
  };

  mounted(): void {
    const { properties } = this.nodeData;
    if (properties) {
      this.formData = Object.assign({}, this.formData, properties);
    }
  }

  onSubmit(): void {
    //eslint-disable-next-line
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        const { id } = this.nodeData;
        console.log(this.formData);
        this.lf.setProperties(id, this.formData);
        this.lf.updateText(id, this.formData.name);
        this.$emit("onClose");
      }
    });
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
