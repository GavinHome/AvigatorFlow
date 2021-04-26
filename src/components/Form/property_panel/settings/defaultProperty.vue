<template>
  <div>
    <a-collapse :activeKey="['baseProperty']">
      <a-collapse-panel header="基本属性" :showArrow="false" key="baseProperty"
        >从左侧拖拽添加并选中字段</a-collapse-panel
      >
    </a-collapse>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DefaultProperty extends Vue {}
</script>
