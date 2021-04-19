<template>
  <div class="dialog">
    <a-modal
      v-if="visible"
      :title="title"
      :visible="visible"
      :destroyOnClose="true"
      :keyboard="false"
      :maskClosable="false"
      :width="modalWidth"
      :bodyStyle="bodyStyle"
      :closable="showCancel"
      @cancel="onCancel"
    >
      <slot></slot>
      <template #footer>
        <slot name="footer">
          <a-row type="flex" justify="space-between">
            <a-col :span="6" class="left">
              <a-alert
                v-if="tip !== ''"
                type="warning"
                :message="tip"
              ></a-alert>
            </a-col>
            <a-col :span="18">
              <a-button
                key="submit"
                class="savaBtnStyle"
                @click="onOk"
                v-if="showOk && isSaveBtn"
                >{{ okText }}</a-button
              >
              <a-button
                key="submit"
                :type="okType"
                @click="onOk"
                v-if="showOk && !isSaveBtn"
                >{{ okText }}</a-button
              >
              <a-button
                key="cancel"
                :type="cancelType"
                @click="onCancel"
                v-if="showCancel"
                >{{ cancelText }}</a-button
              >
            </a-col>
          </a-row>
        </slot>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Dialog extends Vue {
  @Prop({ default: false, required: true, type: Boolean })
  readonly visible!: boolean;

  @Prop({ default: "", type: String }) readonly title!: string;
  @Prop({ default: "保存", type: String }) readonly okText!: string;
  @Prop({ default: "取消", type: String }) readonly cancelText!: string;
  @Prop({ default: "primary", type: String }) readonly okType!: string;
  @Prop({ default: "default", type: String }) readonly cancelType!: string;
  @Prop({ default: "", type: String }) readonly tip!: string;
  @Prop({ default: 600, type: Number }) readonly width!: number;

  @Prop({ default: 0, type: Number }) readonly height!: number;
  @Prop({ default: true, type: Boolean }) readonly showOk!: boolean;
  @Prop({ default: true, type: Boolean }) readonly showCancel!: boolean;

  modalWidth = 0;
  modalHeight = 0;
  DIALOG_MAX_HEIGHT = 580;
  DIALOG_MAX_WIDTH = 1300;

  get maxHeight() {
    return document.body.clientHeight - 200;
  }

  get maxWidth() {
    return document.body.clientWidth - 100;
  }

  //eslint-disable-next-line
  get bodyStyle(): any {
    if (this.height) {
      return {
        height: `${this.modalHeight}px`,
        "max-height": `${this.maxHeight}px`,
        "overflow-y": "auto",
        padding: "0 15px",
      };
    } else {
      return {
        "max-height": `${this.maxHeight}px`,
        overflow: "auto",
        padding: "0 15px",
      };
    }
  }

  get isSaveBtn() {
    return this.okText === "保存";
  }

  created() {
    this.modalWidth =
      this.width === this.DIALOG_MAX_WIDTH ? this.maxWidth : this.width;
    this.modalHeight =
      this.height === this.DIALOG_MAX_HEIGHT ? this.maxHeight : this.height;
  }

  @Emit("cancel")
  onCancel() {}

  @Emit("ok")
  onOk() {}
}
</script>
<style scoped lang="scss">
.dialog {
  ::v-deep.ant-modal-body {
    padding: 10px 30px 10px 30px !important;
  }
}
.savaBtnStyle {
  color: #fff;
  background-color: #54b431;
  border-color: #54b431;
}
</style>
