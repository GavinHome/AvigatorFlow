<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formData.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formData.type"></el-input>
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

@Component
export default class ControlMenu extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  //eslint-disable-next-line
  formData: any = {
    name: "",
    region: "",
    type: "",
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
    this.$emit("onClose");
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/common.scss";
</style>
