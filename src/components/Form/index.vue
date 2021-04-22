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
                <a-button class="m-l-10" @click="loadData"> 加载示例 </a-button>
                <a-button class="m-l-10" @click="() => (dataVisible = true)">
                  数据
                </a-button>
                <a-button
                  class="m-l-10"
                  @click="() => (preview = true)"
                  type="primary"
                >
                  预览
                </a-button>
              </span>
            </template>
            <PagePanel :page="page" @selectedField="handleSelectedField" />
          </Card>
        </div>
      </template>
      <template #right>
        <PropertyPanel
          :widget="selectItem"
          :maxCols="selectItemMaxCols"
          :page="page"
        />
      </template>
    </Layout>

    <!-- 数据面板 -->
    <Dialog
      :visible.sync="dataVisible"
      :width="1000"
      :height="600"
      title="数据"
      @cancel="dataVisible = false"
      @ok="dataVisible = false"
      okText="确定"
    >
      <DataPanel :graphData="page"></DataPanel>
    </Dialog>

    <!-- 预览 -->
    <PagePreview :page="page" v-if="preview" @close="() => (preview = false)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PageModel, FieldSchema, FormRowModel } from "./common/model";
import Layout from "./layout/index";
import Card from "./common/card.vue";
import WidgetPanel from "./widget_panel/index.vue";
import PropertyPanel from "./property_panel/index.vue";
import PagePanel from "./page_panel/index.vue";
import DataPanel from "./data_panel/index.vue";
import Dialog from "./common/dialog.vue";
import demoData from "./example.json";
import PagePreview from "./preview_panel/index.vue";

@Component({
  components: {
    Layout,
    Card,
    WidgetPanel,
    PropertyPanel,
    PagePanel,
    Dialog,
    DataPanel,
    PagePreview,
  },
})
export default class FormComponent extends Vue {
  @Prop() page!: PageModel;
  selectItem: FieldSchema | null = null;
  selectItemMaxCols: number | null = null;
  dataVisible = false;
  preview = false;
  // 事件-选中字段
  handleSelectedField(row: FormRowModel, field: FieldSchema): void {
    this.selectItem = field;
    const exist = row.fields.map((x) => x.cols).reduce((sum, x) => sum + x);
    this.selectItemMaxCols = 4 - exist + field.cols;
    console.log("selectItemMaxCols", this.selectItemMaxCols);
  }

  // 加载示例
  loadData(): void {
    this.page.name = demoData.name;
    this.page.description = demoData.description;
    this.page.rows = demoData.rows;
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
