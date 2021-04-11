import LogicFlow, { EdgeConfig, NodeConfig } from "@logicflow/core";

/*************************** node type ***************************/
export type NodeType = "start" | "approval" | "system" | "gateway" | "end";

export enum NodeTypeEnum {
  Start = "start",
  Approval = "approval",
  System = "system",
  Gateway = "gateway",
  End = "end",
}
/*************************** node type end ***********************/

/*************************** node properties *********************/
export const NodeIdConst = {
  START: "start",
  APPROVAL: "approval",
  SYSTEM: "system",
  GATEWAY: "gateway",
  END: "end",
};

export const NodeNameConst = {
  START: "开始",
  APPROVAL: "审批节点",
  SYSTEM: "系统任务",
  GATEWAY: "网关节点",
  END: "结束",
};

export type NodeNameType =
  | "Initiator"
  | "Approver"
  | "System"
  | "Gateway"
  | "Completer";

export enum NodeNameTypeEnum {
  Initiator = "Initiator",
  Approver = "Approver",
  System = "System",
  Gateway = "Gateway",
  Completer = "Completer",
}

///审批机制：单一节点规则
export enum ApprovalRuleType {
  ///单一（抢办）
  OneAgreed = "One",
  ///全部（会签）
  AllAgreed = "All",
}

///聚合模式：单一，全部，多路
export enum AggregationModeType {
  ///单一（抢办）
  OneAgreed = "One",
  ///全部（会签）
  AllAgreed = "All",
}

///分支模式：单一，全部，多路
export enum BranchModeType {
  ///单一
  OneAgreed = "One",
  ///全部
  AllAgreed = "All",
}

///审批动作：动作为空时表示自动完成
export enum ApprovalActionType {
  ///同意
  Pass = "Pass",
  ///拒绝
  Reject = "Reject",
  ///转交
  Transmit = "Transmit",
  ///退回
  Goback = "Goback",
  ///协审
  Assist = "Assist",
  ///保存
  Save = "Save",
  ///提交
  Submit = "Submit",
}

///执行人（审批人）规则
export interface ExecutorRuleModel {
  type: ExecutorRuleType;
  users?: Array<ExecutorModel>;
  variableId?: string;
  roleId?: string;
  orgId?: string;
  url?: string;
}

///审批人规则类型
export enum ExecutorRuleType {
  ///指定人，流程前确定
  Designator = "Designator",
  ///变量：来自表单，执行时确定
  Variable = "Variable",
  ///角色
  Role = "Role",
  ///通过接口获取，需要把表单整体传到接口中（仅开发用）
  Api = "Api",
}

///1. number: ==,>,>=,<,<=,!=,
///2. string: 包含，不包含，开始于，结束于
///3. array： 包含

///比较运算符号
export enum ComparisonOperationSymbolEnum {
  ///==
  Eq = "eq",
  ///>
  Gt = "gt",
  ///>=
  Gte = "gte",
  ///<
  Lt = "lt",
  ///<=
  Lte = "lte",
  ///!=
  Nte = "nte",
}

///逻辑运算符号
export enum LogicOperatorSymbolEnum {
  ///&&，逻辑与
  And = "&&",
  ///||，逻辑或
  Or = "||",
}

///条件规则类型
export enum ConditionRuleTypeEnum {
  ///默认，为空
  Default = "None",
  ///简单规则，例如${字段} == 1，
  Simple = "Simple",
  ///复杂表达式，多个简单表达式的复合形式，或者开发定义的变量的复合表达式（仅开发用）
  Complex = "Complex",
}

///条件规则
export interface ConditionRuleModel {
  type: ConditionRuleTypeEnum; ///类型
  value: string; ///${abc}==1, (${abc}>1&&${bcd}<3)||${cde}!=3
}

/*************************** node properties end *****************/

/*************************** edge type ***************************/
export type EdgeNameType = "Condition";
export type EdgeType = "polyline";
export enum EdgeNameTypeEnum {
  Polyline = "polyline",
}
/*************************** edge type end ***********************/

/*************************** declare interface ***************************/
///审批人结构
export interface ExecutorModel {
  name: string; ///姓名
  code: string; ///编号
}

///节点类型
export interface NodeModel {
  text: string; ///节点名称
  type: NodeType; ///节点类型
  class: string; ///节点样式
}

///节点属性
export interface NodeSchema {
  key: string;
  name: string; ///节点名称
  enName: NodeNameType; ///英文名称
  executor: ExecutorModel | null; ///审批人员, 为空时自动处理
  description: string; ///节点描述
  aggregation?: AggregationModeType | null; ///聚合方式
  branch?: BranchModeType | null;
  rule?: ApprovalRuleType; ///审核机制
  actions?: Array<ApprovalActionType> | null; ///审批动作
}

///连线属性
export interface EdgeSchema {
  name: string; ///节点名称
  enName: EdgeNameType; ///英文名称
  condition: string; ///执行规则
}

///graph data for logic flow
export interface GraphConfigData {
  nodes: NodeConfig[];
  edges: EdgeConfig[];
}

///节点数据
export interface NodeData extends NodeModel, NodeSchema {}

///选项类型
export interface DataOption {
  value: string;
  text: string;
}
/*************************** declare interface end ***************************/

/*************************** schema Adapter ***************************/
export const schemaAdapter = (data: NodeData): NodeSchema => {
  return {
    key: data.key,
    name: data.name,
    enName: data.enName,
    executor: data.executor,
    description: data.description,
    aggregation: data.aggregation,
    branch: data.branch,
    rule: data.rule,
    actions: data.actions,
  };
};

export const nodeAdapter = (data: NodeData): NodeModel => {
  return {
    text: data.text,
    type: data.type,
    class: data.class,
  };
};
/*************************** schema Adapter end ***********************/

/*************************** data common ******************************/
export const ApprovalRules: Array<DataOption> = [
  {
    value: ApprovalRuleType.OneAgreed,
    text: "或签",
  },
  {
    value: ApprovalRuleType.AllAgreed,
    text: "会签",
  },
];

export const AggregationModes: Array<DataOption> = [
  {
    value: AggregationModeType.OneAgreed,
    text: "单一聚合",
  },
  {
    value: AggregationModeType.AllAgreed,
    text: "全部聚合",
  },
];

export const BranchModes: Array<DataOption> = [
  {
    value: BranchModeType.OneAgreed,
    text: "单一分支",
  },
  {
    value: BranchModeType.AllAgreed,
    text: "全部分支",
  },
];

export const ApprovalActions: Array<DataOption> = [
  {
    value: ApprovalActionType.Pass,
    text: "同意",
  },
  {
    value: ApprovalActionType.Reject,
    text: "拒绝",
  },
  {
    value: ApprovalActionType.Assist,
    text: "协审",
  },
  {
    value: ApprovalActionType.Save,
    text: "保存",
  },
  {
    value: ApprovalActionType.Submit,
    text: "提交",
  },
];

export const NodesData: Array<NodeData> = [
  {
    text: NodeNameConst.START,
    type: NodeTypeEnum.Start,
    class: "node-start",
    key: NodeIdConst.START,
    name: NodeNameConst.START,
    enName: NodeNameTypeEnum.Initiator,
    executor: {
      name: "",
      code: "",
    },
    description: "",
    aggregation: null,
    branch: BranchModeType.OneAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: [ApprovalActionType.Save, ApprovalActionType.Submit],
  },
  {
    text: NodeNameConst.APPROVAL,
    type: NodeTypeEnum.Approval,
    class: "node-approval",
    key: NodeIdConst.APPROVAL,
    name: NodeNameConst.APPROVAL,
    enName: NodeNameTypeEnum.Approver,
    executor: {
      name: "",
      code: "",
    },
    description: "",
    aggregation: AggregationModeType.OneAgreed,
    branch: BranchModeType.OneAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: [
      ApprovalActionType.Pass,
      ApprovalActionType.Reject,
      ApprovalActionType.Assist,
    ],
  },
  // {
  //   text: NodeNameConst.SYSTEM,
  //   type: NodeTypeEnum.System,
  //   class: "node-system",
  //   key: NodeIdConst.SYSTEM,
  //   name: NodeNameConst.SYSTEM,
  //   enName: NodeNameTypeEnum.System,
  //   executor: null,
  //   description: "",
  //   aggregation: AggregationModeType.OneAgreed,
  //   branch: BranchModeType.OneAgreed,
  //   rule: ApprovalRuleType.OneAgreed,
  //   actions: null,
  // },
  {
    text: NodeNameConst.GATEWAY,
    type: NodeTypeEnum.Gateway,
    class: "node-gateway",
    key: NodeIdConst.GATEWAY,
    name: NodeNameConst.GATEWAY,
    enName: NodeNameTypeEnum.Gateway,
    executor: null,
    description: "",
    aggregation: AggregationModeType.OneAgreed,
    branch: BranchModeType.OneAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: null,
  },
  {
    text: NodeNameConst.END,
    type: NodeTypeEnum.End,
    class: "node-end",
    key: NodeIdConst.END,
    name: NodeNameConst.END,
    enName: NodeNameTypeEnum.Completer,
    executor: null,
    description: "",
    aggregation: AggregationModeType.OneAgreed,
    branch: null,
    rule: ApprovalRuleType.OneAgreed,
    actions: null,
  },
];

export const loadInitDodes = (lf: LogicFlow): void => {
  const start_x = 300,
    start_y = 380,
    offset_x = 200,
    offset_y = 100;
  if (lf) {
    const startData = NodesData.find((n) => n.type === NodeTypeEnum.Start);
    const task1Data = NodesData.find((n) => n.type === NodeTypeEnum.Approval);
    const task2Data = NodesData.find((n) => n.type === NodeTypeEnum.Approval);
    const task3Data = NodesData.find((n) => n.type === NodeTypeEnum.Approval);
    const gatewayData = NodesData.find((n) => n.type === NodeTypeEnum.Gateway);
    const endData = NodesData.find((n) => n.type === NodeTypeEnum.End);

    if (
      startData &&
      task1Data &&
      task2Data &&
      task3Data &&
      gatewayData &&
      endData
    ) {
      const startNode = lf.addNode({
        type: NodeTypeEnum.Start,
        x: start_x,
        y: start_y,
        text: {
          x: 1,
          y: 1,
          value: startData.text,
        },
        properties: { ...schemaAdapter(startData) },
      });

      const task1Properties = schemaAdapter(task1Data);
      task1Properties.key = "approval1";
      task1Properties.name = "任务1";
      const task1Node = lf.addNode({
        type: NodeTypeEnum.Approval,
        x: start_x + offset_x,
        y: start_y,
        text: {
          x: 1,
          y: 1,
          value: task1Properties.name,
        },
        properties: { ...task1Properties },
      });

      const task2Properties = schemaAdapter(task2Data);
      task2Properties.key = "approval2";
      task2Properties.name = "任务2";
      const task2Node = lf.addNode({
        type: NodeTypeEnum.Approval,
        x: start_x + offset_x * 2,
        y: start_y - offset_y * 2,
        text: {
          x: 1,
          y: 1,
          value: task2Properties.name,
        },
        properties: { ...task2Properties },
      });

      const task3Properties = schemaAdapter(task3Data);
      task3Properties.key = "approval3";
      task3Properties.name = "任务3";
      const task3Node = lf.addNode({
        type: NodeTypeEnum.Approval,
        x: start_x + offset_x * 2,
        y: start_y + offset_y * 2,
        text: {
          x: 1,
          y: 1,
          value: task3Properties.name,
        },
        properties: { ...task3Properties },
      });

      const gatewayNode = lf.addNode({
        type: NodeTypeEnum.Gateway,
        x: start_x + offset_x * 2,
        y: start_y,
        text: {
          x: 1,
          y: 1,
          value: gatewayData.text,
        },
        properties: { ...schemaAdapter(gatewayData) },
      });

      const endNode = lf.addNode({
        type: NodeTypeEnum.End,
        x: start_x + offset_x * 3,
        y: start_y,
        text: {
          x: 1,
          y: 1,
          value: endData.text,
        },
        properties: { ...schemaAdapter(endData) },
      });

      // start ----> task1
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: startNode.id,
        targetNodeId: task1Node.id,
        text: {
          value: "",
          x: start_x + 160,
          y: start_y + 35,
        },
      });

      // task1 ----> gateway
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: task1Node.id,
        targetNodeId: gatewayNode.id,
        text: {
          value: "",
          x: start_x + 160 + offset_x + 100,
          y: start_y + 35,
        },
      });

      // gateway ----> task2
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: gatewayNode.id,
        targetNodeId: task2Node.id,
        text: {
          value: "",
          x: start_x + 160 + offset_x + 100 + offset_x + 50,
          y: start_y,
        },
      });

      // gateway ----> task3
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: gatewayNode.id,
        targetNodeId: task3Node.id,
        text: {
          value: "",
          x: start_x + 160 + offset_x + 100 + offset_x + 50,
          y: start_y + 70,
        },
      });

      // task2 ----> end
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: task2Node.id,
        targetNodeId: endNode.id,
        text: {
          value: "",
          x: start_x + 160 + offset_x + 100 + offset_x + 100,
          y: start_y - offset_y * 2 + 35,
        },
      });

      // task3 ----> end
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: task3Node.id,
        targetNodeId: endNode.id,
        text: {
          value: "",
          x: start_x + 160 + offset_x + 100 + offset_x + 100,
          y: start_y + offset_y * 2 + 35,
        },
      });
    }
  }
};
/*************************** data common end ***************************/
