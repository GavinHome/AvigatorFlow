<template>
  <div>
    <el-radio-group v-model="selected" size="small">
      <el-radio
        :label="rule.value"
        v-for="(rule, index) in rules"
        :key="index"
        >{{ rule.text }}</el-radio
      >
    </el-radio-group>

    <div v-if="selected == 'Simple'" class="m-t-20 m-b-20">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-select v-model="formData.field" placeholder="表单变量">
            <el-option label="变量1" value="abc"></el-option>
            <el-option label="变量2" value="bcd"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="formData.operator" placeholder="比较操作">
            <el-option
              :label="opt.text"
              :value="opt.value"
              v-for="(opt, index) in operators"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="formData.value" placeholder="表单值"></el-input>
        </el-col>
      </el-row>
    </div>

    <div v-if="selected == 'Complex'">高级规则正在开发</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  ComparisonOperations,
  ConditionRules,
  DataOption,
} from "../common/model";

@Component({
  components: {},
})
export default class ConditionRuleSettingComponent extends Vue {
  //eslint-disable-next-line
  @Prop() private value!: any;
  selected = "Simple";
  rules: Array<DataOption> = ConditionRules;
  operators: Array<DataOption> = ComparisonOperations;
  formData = {
    field: "abc",
    operator: "==",
    value: "",
  };
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
