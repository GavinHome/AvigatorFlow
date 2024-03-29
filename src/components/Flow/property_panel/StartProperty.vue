<template>
  <div>
    <el-form
      ref="ruleForm"
      label-width="80px"
      :model="formData"
      :rules="rulesData"
    >
      <el-form-item label="节点标识" prop="key">
        <el-input v-model="formData.key" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="节点名称" prop="name">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
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
  ApprovalActionType,
  ApprovalRuleType,
  NodeNameConst,
  NodeSchema,
  NodeIdConst,
  NodeNameTypeEnum,
  ExecutorRuleType,
  DataOption,
} from "../common/model";

import { validateKeyExist } from "../common/validators";

@Component
export default class StartProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  actions: Array<DataOption> = [
    {
      value: ApprovalActionType.Save,
      text: "保存",
    },
    {
      value: ApprovalActionType.Submit,
      text: "提交",
    },
  ];

  formData: NodeSchema = {
    key: NodeIdConst.START,
    name: NodeNameConst.START,
    enName: NodeNameTypeEnum.Initiator,
    executor: {
      type: ExecutorRuleType.Initiator,
      params: [],
    },
    description: "",
    rule: ApprovalRuleType.OneAgreed,
    actions: [ApprovalActionType.Save, ApprovalActionType.Submit],
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
