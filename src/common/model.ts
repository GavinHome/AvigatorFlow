import { PageModel } from "@/components/Form/common/model";

/*eslint-disable */
export interface AppModel {
  id: string;
  title: string;
  description: string;
  page?: PageModel;
  flow?: any;
  list?: any;
  auth?: any;
  extend?: any;
  publish?: any;
}
