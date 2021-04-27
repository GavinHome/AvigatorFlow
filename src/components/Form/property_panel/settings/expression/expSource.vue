<template>
  <a-select
    showArrow
    showSearch
    :filterOption="false"
    :placeholder="'搜索'"
    :value="selectValue"
    @search="fetchData"
    @change="onChange"
    class="expSource"
  >
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-opt-group
      label="字段"
      v-if="options.filter((x) => x.type === 'Field').length > 0"
    >
      <a-select-option
        v-for="option in options.filter((x) => x.type === 'Field')"
        :key="option.value"
        >{{
          `${option.name}${option.unit ? "（" + option.unit + "）" : ""}`
        }}</a-select-option
      >
    </a-select-opt-group>

    <a-select-opt-group
      label="自定义"
      v-if="options.filter((x) => x.type === 'Number').length > 0"
    >
      <a-select-option
        v-for="option in options.filter((x) => x.type === 'Number')"
        :key="option.value"
        >{{ `${option.name}` }}</a-select-option
      >
    </a-select-opt-group>

    <a-select-opt-group
      label="运算"
      v-if="options.filter((x) => x.type === 'Ops').length > 0"
    >
      <a-select-option
        v-for="option in options.filter((x) => x.type === 'Ops')"
        :key="option.value"
        >{{ `${option.name}` }}</a-select-option
      >
    </a-select-opt-group>
  </a-select>
</template>

<script lang="ts" src="./expSource.ts"></script>
<style scoped lang="scss">
::v-deep.ant-select {
  min-width: 150px;
}
</style>
