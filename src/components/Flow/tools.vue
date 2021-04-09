<template>
  <div>
    <el-button-group>
      <el-button
        :type="selectionMode ? 'primary' : 'plain'"
        size="small"
        @click="selection"
        >{{ !selectionMode ? "框选" : "取消框选" }}</el-button
      >

      <el-button type="plain" size="small" @click="zoomIn">放大</el-button>
      <el-button type="plain" size="small" @click="zoomOut">缩小</el-button>
      <el-button type="plain" size="small" @click="zoomReset"
        >大小适应</el-button
      >
      <el-button type="plain" size="small" @click="translateRest"
        >定位还原</el-button
      >
      <el-button type="plain" size="small" @click="reset"
        >还原(大小&定位)</el-button
      >
      <el-button type="plain" size="small" @click="undo" :disabled="undoDisable"
        >上一步(ctrl+z)</el-button
      >
      <el-button type="plain" size="small" @click="redo" :disabled="redoDisable"
        >下一步(ctrl+y)</el-button
      >
      <el-button type="plain" size="small" @click="download"
        >下载图片</el-button
      >
      <el-button type="plain" size="small" @click="catData">查看数据</el-button>
      <el-button type="plain" size="small" @click="loadDemo"
        >加载示例</el-button
      >
    </el-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LogicFlow from "@logicflow/core";
import { SelectionSelect } from "@logicflow/extension";
import demoData from "./example.json";

@Component
export default class ControlMenu extends Vue {
  @Prop() private lf!: LogicFlow;
  undoDisable = true;
  redoDisable = true;
  graphData = null;
  dataVisible = false;
  selectionMode = false;

  mounted(): void {
    this.lf.on("history:change", ({ data: { undoAble, redoAble } }) => {
      this.undoDisable = !undoAble;
      this.redoDisable = !redoAble;
    });
  }

  zoomIn(): void {
    this.lf.zoom(true);
  }

  zoomOut(): void {
    this.lf.zoom(false);
  }

  zoomReset(): void {
    this.lf.resetZoom();
  }

  translateRest(): void {
    this.lf.resetTranslate();
  }

  reset(): void {
    this.lf.resetZoom();
    this.lf.resetTranslate();
  }

  undo(): void {
    this.lf.undo();
  }

  redo(): void {
    this.lf.redo();
  }

  download(): void {
    this.lf.getSnapshot();
  }

  catData(): void {
    this.$emit("catData");
  }

  selection(): void {
    this.selectionMode = !this.selectionMode;
    this.lf.updateEditConfig({
      stopMoveGraph: this.selectionMode,
    });

    if (!this.selectionMode) {
      SelectionSelect.close();
    } else {
      SelectionSelect.open();
    }
  }

  loadDemo(): void {
    this.lf.render(demoData);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/common.scss";
</style>
