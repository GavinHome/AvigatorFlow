<template>
  <div>
    <el-col :span="8">
      <el-select v-model="exp.variable" placeholder="表单变量">
        <el-option label="请选择" value=""></el-option>
        <el-option
          :label="field.name"
          :value="field.key"
          v-for="(field, index) in fields"
          :key="index"
        ></el-option>
      </el-select>
    </el-col>

    <el-col :span="8">
      <el-select v-model="exp.operator" placeholder="比较操作">
        <el-option
          :label="opt.text"
          :value="opt.value"
          v-for="(opt, index) in operators"
          :key="index"
        ></el-option>
      </el-select>
    </el-col>

    <el-col :span="8">
      <el-select
        v-model="exp.value"
        placeholder="变量值"
        v-if="varOptions.length"
      >
        <el-option
          :label="option.text"
          :value="option.value"
          v-for="(option, index) in varOptions"
          :key="index"
        ></el-option>
      </el-select>

      <el-input v-model="exp.value" placeholder="变量值" v-else></el-input>
    </el-col>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import {
  Brackets,
  ComparisonOperations,
  ConditionExpressionModel,
  ConditionRules,
  DataOption,
  FieldSchema,
} from "../../common/model";

@Component({
  components: {},
})
export default class ExpressionComponent extends Vue {
  @Inject("fields") fields!: Array<FieldSchema>;
  @Prop() private exp!: ConditionExpressionModel;
  rules: Array<DataOption> = ConditionRules;
  operators: Array<DataOption> = ComparisonOperations;
  brackets: Array<DataOption> = Brackets;
  get varOptions(): Array<DataOption> {
    const field = this.fields.find((f) => f.key === this.exp.variable);
    return field && field.options ? (field.options as Array<DataOption>) : [];
  }
}
</script>

<style scoped lang="scss">
@import "../../common/style.scss";
</style>
