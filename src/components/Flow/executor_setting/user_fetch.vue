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
    prop: "user",
    event: "change",
  },
  components: {},
})
export default class ExecutorRuleSettingComponent extends Vue {
  @Inject("users") users!: Array<DataOption>;
  @Prop() user!: DataOption;
  loading = false;
  options: Array<DataOption> = this.users;
  selected = "";

  onChange(key: string): void {
    // const users: Array<DataOption> = [];
    // // data.forEach((d: string) => {
    // //   const u = this.users.find((x) => x.value == d);
    // //   if (u) {
    // //     users.push({
    // //       value: u.value,
    // //       text: u.text,
    // //     });
    // //   }
    // // });
    // this.$emit("change", users);
    const role = this.users.find((x: DataOption) => x.value == key);
    this.$emit("change", role);
  }

  @Watch("user", { immediate: true, deep: true })
  userChanged(): void {
    this.selected = this.user ? this.user.value : "";
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
