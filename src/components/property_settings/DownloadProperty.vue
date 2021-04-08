<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="节点名称">
        <el-input v-model="formData.name" disabled></el-input>
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
  AggregationModes,
  AggregationModeType,
  ApprovalRuleType,
  NodeSchema,
} from "@/common/model";

@Component
export default class DownloadProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  aggregations = AggregationModes;

  formData: NodeSchema = {
    name: "下载",
    enName: "Downloader",
    executor: null,
    description: "系统自动处理",
    aggregation: AggregationModeType.AllAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: null,
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
    this.lf.updateText(id, this.formData.name);
    this.$emit("onClose");
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/common.scss";
</style>
