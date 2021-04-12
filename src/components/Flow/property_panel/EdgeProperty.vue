<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="显示名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="执行规则">
        <ConditionSetting />
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
import { EdgeSchema } from "../common/model";
import ConditionSetting from "../condition_setting/index.vue";

@Component({
  components: {
    ConditionSetting,
  },
})
export default class EdgeProperty extends Vue {
  //eslint-disable-next-line
  @Prop() private nodeData!: any;
  @Prop() private lf!: LogicFlow;

  formData: EdgeSchema = {
    name: "",
    enName: "Condition",
    condition: "",
  };

  mounted(): void {
    const { properties } = this.nodeData;
    if (properties) {
      this.formData = Object.assign({}, this.formData, properties);
    }
  }

  onSubmit(): void {
    const { id } = this.nodeData;
    this.lf.setProperties(id, this.formData);
    this.lf.updateText(id, this.formData.name);
    this.$emit("onClose");
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
