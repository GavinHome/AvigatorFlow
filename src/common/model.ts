import { PageModel } from "@/components/Form/common/model";
import { FormPermissionModel } from "@/components/Permissions/model";
import { GraphConfigData } from "@logicflow/core";

/*eslint-disable */
export interface AppModel {
  id: string;
  title: string;
  description: string;
  page: PageModel;
  permissions: Array<FormPermissionModel>,
  flow: GraphConfigData;
  list?: any;
  auth?: any;
  extend?: any;
  publish?: any;
}
