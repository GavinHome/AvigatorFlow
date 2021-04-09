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
  AggregationModes,
  AggregationModeType,
  ApprovalRuleType,
  NodeNameConst,
  NodeSchema,
  NodeIdConst,
} from "../common/model";
import { validateKeyExist } from "../common/validators";

@Component
export default class EndProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  aggregations = AggregationModes;

  formData: NodeSchema = {
    key: NodeIdConst.END,
    name: NodeNameConst.END,
    enName: "Completer",
    executor: null,
    description: "",
    aggregation: AggregationModeType.AllAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: null,
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
