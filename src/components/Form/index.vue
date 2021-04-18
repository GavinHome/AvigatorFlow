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
            <template #title> 功能区 </template>
            <PagePanel :fields="fields" @addField="handleAddField" />
          </Card>

          <!-- <div class="center">
            <a-button type="primary">保存并新增</a-button>
            <a-button class="m-l-10" type="primary"
              >保存并退出</a-button
            >
            <a-button class="m-l-10" type="default"
              >取消</a-button
            >
          </div> -->
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
import { WidgetSchema } from "./common/model";
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
    PagePanel
  },
})
export default class FormComponent extends Vue {
  @Prop() selectItem!: WidgetSchema;
  @Prop() fields!:Array<WidgetSchema>;
}
</script>

<style scoped lang="scss">
@import "./common/style.scss";

.avigator-form-view {
  height: 100vh;
  position: relative;
}
</style>
