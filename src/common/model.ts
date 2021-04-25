import {
  FieldPermissionModel,
  PageModel,
} from "@/components/Form/common/model";

/*eslint-disable */
export interface AppModel {
  id: string;
  title: string;
  description: string;
  page?: PageModel;
  // permissions?: Array<Record<string, Array<FieldPermissionModel>>>,
  permissions?: Record<string, Array<FieldPermissionModel>>,
  flow?: any;
  list?: any;
  auth?: any;
  extend?: any;
  publish?: any;
}


///节点对应的字段权限
// export interface FormPermissionModel {
//   [key: string]: Array<FieldPermissionModel>;
// }
