<template>
  <el-select
    v-model="selected"
    filterable
    placeholder="请输入关键词"
    @change="onChange"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.text"
      :value="item.value"
    >
      <span class="float-left">{{ item.text }}</span>
      <span class="float-right option-left">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { DataOption } from "../common/model";

@Component({
  model: {
    prop: "role",
    event: "change",
  },
  components: {},
})
export default class ExecutorRuleSettingComponent extends Vue {
  @Inject("roles") roles!: Array<DataOption>;
  @Prop() role!: DataOption;
  options: Array<DataOption> = this.roles;
  selected = this.role ? this.role.value : "";

  onChange(key: string): void {
    const role = this.roles.find((x: DataOption) => x.value == key);
    this.$emit("change", role);
  }

  @Watch("role", { immediate: true, deep: true })
  roleChanged(): void {
    this.selected = this.role ? this.role.value : "";
  }
}
</script>

<style scoped lang="scss">
@import "../common/style.scss";
.option-left {
  color: #8492a6;
  font-size: 13px;
}
</style>
