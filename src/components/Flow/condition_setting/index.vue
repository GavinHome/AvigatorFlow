<template>
  <div>
    <el-radio-group v-model="condition.type" size="small" @change="onChang">
      <el-radio
        :label="rule.value"
        v-for="(rule, index) in rules"
        :key="index"
        :disabled="rule.value === 'Complex'"
        >{{ rule.text }}</el-radio
      >
    </el-radio-group>

    <div v-if="condition.type == 'Simple'" class="m-t-10">
      <el-row :gutter="10">
        <Expression
          :exp="exp"
          v-for="(exp, index) in condition.expressions"
          :key="index"
        />
      </el-row>
    </div>

    <div v-if="condition.type == 'Complex'" class="m-t-10">
      <!-- <el-row :gutter="10" class="m-10 text-center">
        <el-tooltip content="增加规则项" placement="top-start">
          <el-button type="plain" icon="el-icon-plus" size="small"></el-button>
        </el-tooltip>
      </el-row> -->

      <!-- <el-row :gutter="10">
        <template v-for="(exp, index) in condition.expressions">      
          <Expression :exp="exp" :key="index" />
        </template>
      </el-row> -->

      <!-- <el-row :gutter="10" class="m-10 text-center">
        <el-tooltip content="增加规则项" placement="bottom-start">
          <el-button type="plain" icon="el-icon-plus" size="small"></el-button>
        </el-tooltip>
      </el-row> -->
    </div>

    <el-row v-if="condition.expressions.length" class="m-t-5">
      <el-col :span="24">
        规则：
        <span v-for="(exp, index) in condition.expressions" :key="index">
          <template v-if="exp.type === 'Variable' && exp.value">
            {{ "${0}".replace("0", exp.value) }}
          </template>
          <template v-else>
            {{ exp.value }}
          </template>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Brackets,
  ComparisonOperations,
  ConditionModel,
  ConditionRules,
  ConditionRuleTypeEnum,
  ConditionTypeEnum,
  DataOption,
} from "../common/model";

import Expression from "./expression.vue";

@Component({
  components: {
    Expression,
  },
})
export default class ConditionRuleSettingComponent extends Vue {
  @Prop() private condition!: ConditionModel;
  rules: Array<DataOption> = ConditionRules;
  operators: Array<DataOption> = ComparisonOperations;
  brackets: Array<DataOption> = Brackets;

  onChang(): void {
    this.condition.expressions = [];
    if (this.condition.type != ConditionTypeEnum.Default) {
      this.condition.expressions.push({
        type: ConditionRuleTypeEnum.Variable,
        value: "",
      });
      this.condition.expressions.push({
        type: ConditionRuleTypeEnum.Operator,
        value: "==",
      });
      this.condition.expressions.push({
        type: ConditionRuleTypeEnum.Value,
        value: "",
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
</style>
