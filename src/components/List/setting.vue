<template>
  <div>
    <a-form-model
      labelAlign="right"
      :rules="rules"
      :ref="formRef"
      :model="data"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-card type="inner" bordered hoverable>
        <template #title> 数据列表设置 </template>
        <a-row>
          <a-col :span="24"> 数据列表 </a-col>
        </a-row>
      </a-card>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class SettingComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() data!: any;
  formRef = "form";
  INPUT_MAX_LENGTH_15 = 15;
  INPUT_MAX_LENGTH_50 = 50;
  rules = !this.readonly
    ? {
        title: [{ required: true, message: "请输入标题" }],
      }
    : {};
}
</script>
<style scoped lang="scss"></style>
