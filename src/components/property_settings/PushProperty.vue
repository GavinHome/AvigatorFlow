<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="节点名称">
        <el-input v-model="formData.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="推送地址">
        <el-input v-model="formData.push.url"></el-input>
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
import { PushSchema } from "@/common/model";

@Component
export default class PushProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  formData: PushSchema = {
    name: "推送",
    enName: "Pusher",
    executor: null,
    description: "系统自动处理",
    push: {
      url: "https://",
    },
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
