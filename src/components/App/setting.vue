<template>
  <div>
    <a-form-model
      labelAlign="right"
      :rules="rules"
      :ref="formRef"
      :model="app"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-card type="inner" bordered hoverable>
        <template #title> 基本属性 </template>
        <a-form-model-item has-feedback label="名称" prop="title">
          <a-input
            v-model="app.title"
            type="input"
            autocomplete="off"
            :maxLength="INPUT_MAX_LENGTH_15"
            :disabled="readonly"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="描述" prop="description">
          <a-textarea
            v-model="app.description"
            type="input"
            autocomplete="off"
            :maxLength="INPUT_MAX_LENGTH_50"
            :disabled="readonly"
          />
        </a-form-model-item>
      </a-card>

      <!-- <a-card type="inner" bordered hoverable>
        <template #title> 列表属性 </template>
        <a-row>
          <a-col :span="24"> 列表属性 </a-col>
        </a-row>
      </a-card> -->
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppModel } from "./model";
@Component({
  components: {},
})
export default class AppSettingComponent extends Vue {
  @Prop() app!: AppModel;
  @Prop() readonly!: boolean;
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
