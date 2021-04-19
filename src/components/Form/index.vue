<template>
  <div class="avigator-form-view">
    <Layout :left="5" :right="6" :middle="13">
      <template #left>
        <Card>
          <template #title> 组件列表 </template>
          <WidgetPanel :column="2" />
        </Card>
      </template>
      <template #middle>
        <div>
          <Card>
            <template #title>
              <span class="text-left"> 页面布局 </span>
              <span class="float-right">
                <a-button class="m-l-10" @click="() => {}"> 预览 </a-button>
                <a-button class="m-l-10" @click="() => {}" type="primary">
                  保存
                </a-button>
              </span>
            </template>
            <PagePanel :page="page" @selectedField="handleSelectedField" />
          </Card>
        </div>
      </template>
      <template #right>
        <PropertyPanel :widget="selectItem" />
      </template>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PageModel, FieldSchema } from "./common/model";
import Layout from "./layout/index";
import Card from "./common/card.vue";
import WidgetPanel from "./widget_panel/index.vue";
import PropertyPanel from "./property_panel/index.vue";
import PagePanel from "./page_panel/index.vue";
@Component({
  components: {
    Layout,
    Card,
    WidgetPanel,
    PropertyPanel,
    PagePanel,
  },
})
export default class FormComponent extends Vue {
  @Prop() page!: PageModel;
  selectItem: FieldSchema | null = null;

  // 事件-选中字段
  handleSelectedField(field: FieldSchema): void {
    this.selectItem = field;
  }
}
</script>

<style scoped lang="scss">
@import "./common/style.scss";

.avigator-form-view {
  height: 100vh;
  position: relative;
}
</style>
