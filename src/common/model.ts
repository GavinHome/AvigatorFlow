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

export interface EdgeSchema {
  name: string; ///节点名称
  enName: string; ///英文名称
  //eslint-disable-next-line
  condition: any; ///审批人员
  description: string; ///节点描述
}

export interface NodeSchema {
  name: string; ///节点名称
  enName: string; ///英文名称
  executor: ExecutorModel; ///审批人员
  description: string; ///节点描述
}

export interface Taskchema extends NodeSchema {
  //eslint-disable-next-line
  form?: any;
}

export interface PushNodeSchema extends NodeSchema {
  push: PushModel; ///推送配置
}

export interface PushModel {
  url: string;
}

///单一节点规则
export enum ApprovalRuleType {
  ///单一（抢办）
  OneAgreed = "One",
  ///全部（会签）
  AllAgreed = "All",
}

///聚合模式：单一，全部，多路
export enum AggregationModeType {
  ///单一（抢办）
  SingleAgreed = "one",
  ///全部（会签）
  AllAgreed = "all",
  // ///多路（设置人数或百分比）
  // MultipleAgreed  = "all"
}

// ///分支模式：单一，全部，多路，符合条件的应同时分发
// export enum BranchModeType {
//   ///单一
//   SingleAgreed = "one",
//   ///全部
//   AllAgreed = "all",
//   ///多路（设置人数或百分比）
//   MultipleAgreed  = "all"
// }

///审批动作
export enum ApprovalActionType {
  ///同意
  Pass = "Pass",
  ///拒绝
  Reject = "Reject",
  ///转交
  Transmit = "Transmit",
  ///退回
  Goback = "Goback",
  ///保存
  Save = "Save",
  ///提交
  Submit = "Submit",
}

export enum ApprovalConditionType {
  ///默认连线规则（空）
  Default = "Defalt",
  ///
}
