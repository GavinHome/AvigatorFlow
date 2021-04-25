<template>
  <div class="p-20">
    <a-row :gutter="[16, 16]" v-for="(perm, index) in permissions" :key="index">
      <a-col span="6">{{ getFieldTitle(perm.id) }}</a-col>
      <a-col span="6">
        <a-radio-group v-model="perm.type">
          <a-radio
            v-for="(option, index) in PermissionTypeOptions"
            :value="option.value"
            :key="index"
            >{{ option.text }}</a-radio
          >
        </a-radio-group>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  FieldPermissionModel,
  FieldPermissionType,
  FieldPermissionTypeData,
  PageModel,
} from "../common/model";
import { getPageFields } from "../common/utils";

@Component({
  model: {
    prop: "permissions",
    event: "change",
  },
  components: {},
})
export default class FormPermissonComponent extends Vue {
  @Prop({ default: () => [] }) permissions!: Array<FieldPermissionModel>;
  @Prop() page!: PageModel;

  PermissionTypeOptions = FieldPermissionTypeData;

  async created(): Promise<void> {
    const fields = getPageFields(this.page);
    const perms: Array<FieldPermissionModel> = [];
    fields.forEach((f) => {
      const perm = this.permissions.find((p) => p.id === f.id);
      if (!perm) {
        perms.push({
          id: f.id,
          type: FieldPermissionType.VisibleOnly,
        });
      } else {
        perms.push({
          id: f.id,
          type: perm.type,
        });
      }
    });
    await this.onChange(perms);
  }

  private async onChange(perms: Array<FieldPermissionModel>): Promise<void> {
    this.$emit("change", perms);
  }

  private getFieldTitle(id: string): string {
    const field = getPageFields(this.page).find((f) => f.id === id);
    return field ? field.title : id;
  }
}
</script>

<style lang="scss" scoped>
@import "../common/style.scss";
</style>
