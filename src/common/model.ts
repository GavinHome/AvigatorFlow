export type NodeType = "start" | "user" | "push" | "download" | "rect" | "end";

export interface NodeModel {
  text: string; ///节点名称
  type: NodeType; ///节点类型
  class: string; ///节点样式
}

export interface ExecutorModel {
  name: string; ///姓名
  code: string; ///编号
}

export interface NodeSchema {
  name: string; ///节点名称
  enName: string; ///英文名称
  executor: ExecutorModel; ///审批人员
  description: string; ///节点描述
}

export interface Taskchema extends NodeSchema {
  form?: any;
}

export interface PushSchema {
  url: string;
}

export interface PushNodeSchema extends NodeSchema {
  push: PushSchema; ///推送配置
}
