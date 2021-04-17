<template>
  <div class="avigator-form-view">
    <Layout :left="5" :right="6" :middle="13">
      <template #left>
        <!-- <Card>
          <template #title>
            <div class="flexBetween">
              <span class="left">控件列表</span>
            </div>
          </template>
          <a-row>
            <a-col :span="24">
            </a-col>
          </a-row>
        </Card> -->
      </template>
      <template #middle>
        <div>
          <!-- <Card>
            <template #title>
              <div class="flexBetween">
                <span class="left">功能区</span>
              </div>
            </template>
            <a-row>
              <a-col :span="24">
              </a-col>
            </a-row>
          </Card> -->

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
        <!-- <component
          :is="getPropertyComponentName"
          ref="propertyPage"
          :key="selectItem.fieldType"
          :selectItem="selectItem"
          :isFieldEditAction="isFieldEditAction"
        /> -->
      </template>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Layout from "./layout/index";
import Card from "./common/card.vue";
@Component({
  components: {
    Layout,
    Card,
  },
})
export default class FormComponent extends Vue {
  //eslint-disable-next-line
//   @Prop() private bodyStyle!: any;
}
</script>

<style scoped lang="scss">
@import "./common/style.scss";

.avigator-form-view {
  height: 100vh;
  position: relative;
}
</style>
