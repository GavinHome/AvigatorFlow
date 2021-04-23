<template>
  <a-row :gutter="[16, 16]">
    <draggable
      :clone="cloneComponent"
      :group="{ name: 'widgets', pull: 'clone', put: false }"
      :list="widgets"
      filter=".undraggable"
      :sort="false"
    >
      <a-col
        :span="24 / column"
        v-for="(widget, index) of widgets"
        :key="index"
      >
        <div class="widget-item">
          <Card
            hoverable
            :bordered="false"
            :name="widget.name"
            :headStyle="{
              'text-align': 'center',
              border: 'none',
              background: 'none',
            }"
            :bodyStyle="{
              'text-align': 'center',
              border: 'none',
              padding: '0px 5px 10px',
              'font-weight': 'bold',
            }"
          >
            <template #title>
              <img
                slot="cover"
                :alt="widget.label"
                :src="require('./icon/' + widget.icon)"
              />
            </template>
            <span class="center">{{ widget.text }}</span>
          </Card>
        </div>
      </a-col>
    </draggable>
  </a-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import draggable from "vuedraggable";
import {
  WidgetsData,
  WidgetNodeModel,
  WidgetSchema,
  WidgetTypeEnum,
} from "../common/model";
import { NewId } from "../common/utils";
import Card from "../common/card.vue";

@Component({
  components: {
    Card,
    draggable,
  },
})
export default class ComponentsToolbox extends Vue {
  @Prop({ default: 2 }) column!: number;
  widgets: Array<WidgetNodeModel> = WidgetsData;
  cloneComponent(data: WidgetNodeModel): WidgetSchema {
    return {
      id: NewId(),
      code: data.type.toString(),
      type: data.type,
      name: data.name,
      icon: data.icon,
      title: data.text,
      placeHolder: "",
      cols: 4,
      prompt: "",
      description: "",
      isRequired:
        data.type == WidgetTypeEnum.Description ||
        data.type == WidgetTypeEnum.Label
          ? false
          : true,
      isReadonly: false,
      style: {
        fontSize: 14,
      },
      setting: {
        isMultipleSelect: false,
        maxStringLength:
          data.type == WidgetTypeEnum.SingleText ||
          data.type == WidgetTypeEnum.MultipleText
            ? 50
            : null,
        maxNumberValue: data.type == WidgetTypeEnum.Number ? 999999 : null,
        minNumberValue: data.type == WidgetTypeEnum.Number ? 0 : null,
        numberDigits: data.type == WidgetTypeEnum.Number ? 2 : null,
        options:
          data.type == WidgetTypeEnum.Select ||
          data.type == WidgetTypeEnum.Radio ||
          data.type == WidgetTypeEnum.CheckBox
            ? [
                {
                  value: "选项1",
                  text: "选项1",
                },
              ]
            : [],
      },
      expression: [],
      value: null,
    };
  }
}
</script>
<style scoped lang="scss">
.card {
  margin-bottom: 0px;
}

.widget-item {
  border: 1px solid #e8e8e8;
  &:hover {
    border-color: #1890ff;
  }

  &.undraggable {
    user-select: none;
  }
}
</style>
