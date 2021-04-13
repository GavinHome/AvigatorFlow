<template>
  <div>
    <el-col :span="2" v-if="exp.type === 'Bracket'">
      <el-select v-model="exp.value" placeholder="括号">
        <el-radio
          :label="bkt.value"
          v-for="(bkt, index) in brackets"
          :key="index"
          >{{ bkt.text }}</el-radio
        >
      </el-select>
    </el-col>

    <el-col :span="8" v-if="exp.type === 'Variable'">
      <el-select v-model="exp.value" placeholder="表单变量">
        <el-option label="请选择" value=""></el-option>
        <el-option label="变量1" value="abc"></el-option>
        <el-option label="变量2" value="bcd"></el-option>
      </el-select>
    </el-col>
    <el-col :span="8" v-if="exp.type === 'Operator'">
      <el-select v-model="exp.value" placeholder="比较操作">
        <el-option
          :label="opt.text"
          :value="opt.value"
          v-for="(opt, index) in operators"
          :key="index"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="8" v-if="exp.type === 'Value'">
      <el-input v-model="exp.value" placeholder="变量值"></el-input>
    </el-col>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Brackets,
  ComparisonOperations,
  ConditionRuleModel,
  ConditionRules,
  DataOption,
} from "../common/model";

@Component({
  components: {},
})
export default class ExpressionComponent extends Vue {
  @Prop() private exp!: ConditionRuleModel;
  rules: Array<DataOption> = ConditionRules;
  operators: Array<DataOption> = ComparisonOperations;
  brackets: Array<DataOption> = Brackets;
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
