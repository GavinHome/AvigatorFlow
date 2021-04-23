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
      :label="item.name"
      :value="item.key"
    >
      <span class="float-left">{{ item.name }}</span>
      <span class="float-right option-left">{{ item.key }}</span>
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { DataOption, FieldSchema } from "../../common/model";

@Component({
  model: {
    prop: "field",
    event: "change",
  },
  components: {},
})
export default class ExecutorRuleSettingComponent extends Vue {
  @Inject("page") page!: Record<string, Array<FieldSchema>>;

  @Prop() field!: DataOption;
  options: Array<FieldSchema> = this.page.fields;
  selected = this.field ? this.field.value : "";
  onChange(key: string): void {
    const field = this.page.fields.find((x: FieldSchema) => x.key == key);
    this.$emit("change", {
      value: field ? field.key : "",
      text: field ? field.name : "",
    });
  }

  @Watch("field", { immediate: true, deep: true })
  fieldChanged(): void {
    this.selected = this.field ? this.field.value : "";
  }
}
</script>

<style scoped lang="scss">
@import "../../common/style.scss";
.option-left {
  color: #8492a6;
  font-size: 13px;
}
</style>
