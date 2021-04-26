<template>
  <a-skeleton avatar active :loading="loading">
    <a-form-model layout="vertical" :ref="pageFormRef" :model="page">
      <a-row
        v-for="(row, index) of page.rows"
        :key="index"
        :class="'p-form-row'"
      >
        <template>
          <a-col
            v-for="(field, fieldIndex) of row.fields"
            :span="field.cols * 6"
            :class="'p-form-col'"
            :key="fieldIndex"
          >
            <Container
              :fields="[field]"
              :row="row"
              :class="[
                'p-field',
                field == selectItem ? 'p-selected-field' : '',
              ]"
              @addField="handleAddField"
              @removeField="handleRemoveField"
              @selectedField="handleSelectField"
            >
              <a-tooltip placement="bottom" slot="actions" :title="'删除字段'">
                <a-icon
                  type="delete"
                  @click="handleDeleteField(row, field)"
                  class="text-right p-remove-icon"
                />
              </a-tooltip>
            </Container>
          </a-col>
        </template>
        <a-col
          :span="24"
          :class="'p-form-col'"
          v-if="row.fields.length === 0"
          @click.native="handleSelectRowClick(row)"
        >
          <Container :fields="[]" :row="row" @addField="handleAddField">
            <a-tooltip placement="bottom" slot="actions" :title="'删除行'">
              <a-icon
                type="delete"
                class="text-right p-remove-icon"
                v-if="page.rows.length > 1"
                @click="handleDeleteRow(row)"
              />
            </a-tooltip>
          </Container>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" class="p-toolbar-add text-center">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>添加行</span>
            </template>
            <a-button
              shape="circle"
              icon="plus"
              @click="handleAddRow"
              title="添加行"
              size="large"
            ></a-button>
          </a-tooltip>
        </a-col>
      </a-row>
    </a-form-model>
  </a-skeleton>
</template>
<script lang="ts" src="./index.tsx"></script>
<style lang="scss" scoped>
@import "../common/style.scss";

// .p-form-row {
//   &:first-child {
//     border-top: 1px dashed #888;
//   }
// }

// .p-form-col {
//   border-bottom: 1px dashed #888;
//   border-left: 1px dashed #888;
//   border-right: 1px dashed #888;
// }

.p-form-col + .p-form-col {
  border-left: none;
}

.p-selected-field {
  background: #f1f1f1;
}

.p-remove-icon {
  color: $red-color;
}

.p-field {
  .p-remove-icon {
    display: none;
  }

  &:hover {
    .p-remove-icon {
      display: block !important;
    }
  }
}

.p-toolbar-add {
  padding: 10px 0px;
  min-height: 81px;
}
</style>
