///字段权限类型
export enum FieldPermissionType {
  //可编辑
  Editable = "Editable",
  //仅可见
  VisibleOnly = "VisibleOnly",
  //隐藏
  Hidden = "Hidden",
}

///字段权限
export interface FieldPermissionModel {
  id: string;
  type: FieldPermissionType;
}

///节点对应的字段权限
export interface FormPermissionModel {
  key: string;
  permissions: Array<FieldPermissionModel>;
}

export const FieldPermissionTypeData: DataOption[] = [
  {
    value: FieldPermissionType.Editable,
    text: "可编辑",
  },
  {
    value: FieldPermissionType.VisibleOnly,
    text: "仅可见",
  },
  {
    value: FieldPermissionType.Hidden,
    text: "隐藏",
  },
];

export interface DataOption {
  value: string;
  text: string;
}

////字段属性
export interface PermissionFieldSchema {
  id: string;
  title: string;
}
