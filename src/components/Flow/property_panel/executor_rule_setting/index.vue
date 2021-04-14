<template>
  <div>
    <el-tabs type="border-card" v-model="executor.type">
      <el-tab-pane
        :label="tab.text"
        :name="tab.value"
        v-for="(tab, index) in executors"
        :key="index"
        :body-style="{ padding: '5px' }"
        :disabled="tab.value === 'Api'"
      >
        <span slot="label">
          <i class="el-icon-user" v-if="tab.value === 'Designator'"></i>
          <i class="el-icon-date" v-if="tab.value === 'Variable'"></i>
          <i class="el-icon-menu" v-if="tab.value === 'Role'"></i>
          {{ tab.text }}
        </span>

        <div v-if="tab.value === 'Designator'">
          <el-row :gutter="10" class="m-t-10">
            <el-col :span="6">关联用户：</el-col>
            <el-col :span="18">
              <UserFetch v-model="params.user" />
            </el-col>
          </el-row>
        </div>

        <div v-else-if="tab.value === 'Variable'">
          <el-row :gutter="10" class="m-t-10">
            <el-col :span="6">关联变量： </el-col>
            <el-col :span="18">
              <FieldFetch v-model="params.variable" />
            </el-col>
          </el-row>
        </div>
        <div v-else-if="tab.value === 'Role'">
          <el-row :gutter="10">
            <el-col :span="6">关联角色： </el-col>
            <el-col :span="18">
              <RoleFetch v-model="params.role" />
            </el-col>
          </el-row>
          <el-row :gutter="10" class="m-t-10">
            <el-col :span="6">关联变量： </el-col>
            <el-col :span="18">
              <FieldFetch v-model="params.variable" />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import {
  DataOption,
  ExecutorRuleModel,
  ExecutorRuleParamModel,
  ExecutorRuleParamTypeEnum,
  ExecutorRules,
  ExecutorRuleType,
  FieldSchema,
} from "../../common/model";

import UserFetch from "./user_fetch.vue";
import RoleFetch from "./role_fetch.vue";
import FieldFetch from "./form_field.vue";

interface ExecutorRuleParams {
  user: DataOption | null;
  role: DataOption | null;
  variable: DataOption | null;
  url: DataOption | null;
}

@Component({
  model: {
    prop: "executor",
    event: "change",
  },
  components: {
    UserFetch,
    RoleFetch,
    FieldFetch,
  },
})
export default class ExecutorRuleSettingComponent extends Vue {
  @Inject("fields") fields!: Array<FieldSchema>;
  @Inject("roles") roles!: Array<DataOption>;
  @Inject("users") users!: Array<DataOption>;
  @Prop() private executor!: ExecutorRuleModel;
  executors = ExecutorRules;

  params: ExecutorRuleParams = {
    user: null,
    role: null,
    variable: null,
    url: null,
  };

  @Watch("executor", { immediate: true, deep: true })
  executorChanged(): void {
    const user = this.executor.params.find(
      (p) => p.type === ExecutorRuleParamTypeEnum.Designator
    );
    this.params.user = user ? user.value : null;

    const role = this.executor.params.find(
      (p) => p.type === ExecutorRuleParamTypeEnum.RoleId
    );
    this.params.role = role ? role.value : null;

    const variable = this.executor.params.find(
      (p) => p.type === ExecutorRuleParamTypeEnum.VariableId
    );
    this.params.variable = variable ? variable.value : null;

    const url = this.executor.params.find(
      (p) => p.type === ExecutorRuleParamTypeEnum.Url
    );
    this.params.url = url ? url.value : null;
  }

  @Watch("params", { immediate: true, deep: true })
  paramsChanged(): void {
    const params: Array<ExecutorRuleParamModel> = [];
    switch (this.executor.type) {
      case ExecutorRuleType.Initiator:
        break;
      case ExecutorRuleType.Designator:
        params.push({
          type: ExecutorRuleParamTypeEnum.Designator,
          value: this.params.user,
        });
        break;
      case ExecutorRuleType.Variable:
        params.push({
          type: ExecutorRuleParamTypeEnum.VariableId,
          value: this.params.variable,
        });
        break;
      case ExecutorRuleType.Role:
        params.push({
          type: ExecutorRuleParamTypeEnum.RoleId,
          value: this.params.role,
        });
        params.push({
          type: ExecutorRuleParamTypeEnum.VariableId,
          value: this.params.variable,
        });
        break;
      case ExecutorRuleType.Api:
        params.push({
          type: ExecutorRuleParamTypeEnum.Url,
          value: this.params.url,
        });
        break;
      default:
        break;
    }

    this.$emit("change", {
      type: this.executor.type,
      params: params,
    });
  }
}
</script>

<style scoped lang="scss">
@import "../../common/style.scss";

.el-card {
  border: none;
  overflow: auto;
  max-height: 300px;
}
.card-item {
  padding: 10px 10px;
}

.card-item:hover {
  background: rgb(207, 207, 207);
}

::v-deep.el-tabs__content {
  padding: 1px;
}
</style>
