<template>
  <div>
    <a-form-model-item label="数据来源" prop="setting.dataSourceType">
      <a-select
        v-model="field.setting.dataSourceType"
        :options="dataSourceTypeOptions"
        @change="changeDataSourceType"
        :disabled="disabled"
      />
    </a-form-model-item>
    <SimpleDataSource
      :field="field"
      v-if="displaySimpleOptions"
      :disabled="disabled"
    />
    <!-- <a-form-model-item label="基础参数" prop="setting.sourceTypeId" v-else-if="displayBasicOptions">
      <a-select v-model="field.setting.sourceTypeId" :options="basicSourceOptions" :disabled="disabled" />
    </a-form-model-item> -->
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
