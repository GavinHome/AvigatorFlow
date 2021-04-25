<template>
  <div class="p-20">
    <a-row
      :gutter="[16, 16]"
      v-for="(perm, index) in permissionsData"
      :key="index"
    >
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
import { PermissionsProvider } from "@/common/adapter";
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import {
  FieldPermissionModel,
  FieldPermissionType,
  FieldPermissionTypeData,
  FormPermissionModel,
  PermissionFieldSchema,
} from "./model";

@Component({
  model: {
    prop: "permissions",
    event: "change",
  },
  components: {},
})
export default class FormPermissonComponent extends Vue {
  @Inject("permissionsProvider") provider!: PermissionsProvider;
  @Prop() id!: string;
  @Prop({ default: () => [] }) permissions!: Array<FormPermissionModel>;

  PermissionTypeOptions = FieldPermissionTypeData;

  permissionsData: Array<FieldPermissionModel> = [];

  @Watch("id", { immediate: true, deep: true }) valueChanged(): void {
    const permission: FormPermissionModel | undefined = this.permissions.find(
      (x) => x.key === this.id
    );
    const fields = this.provider.fields;
    const perms: Array<FieldPermissionModel> = [];
    fields.forEach((f) => {
      const perm = permission
        ? permission.permissions.find((p) => p.id === f.id)
        : null;
      if (!perm) {
        perms.push({
          id: f.id,
          type: FieldPermissionType.Editable,
        });
      } else {
        perms.push({
          id: f.id,
          type: perm.type,
        });
      }
    });

    if (permission) {
      const index = this.permissions.findIndex((p) => p === permission);
      this.permissions.splice(index, 1);
    }

    this.permissions.push({
      key: this.id,
      permissions: perms,
    });

    this.permissionsData = perms;
  }

  private getFieldTitle(id: string): string {
    const field = this.provider.fields.find((f) => f.id === id);
    return field ? field.title : id;
  }
}
</script>

<style lang="scss" scoped>
.p-20 {
  padding: 20px;
}
</style>
