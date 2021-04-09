import LogicFlow, { EdgeConfig, NodeConfig } from "@logicflow/core";

export type NodeType = "start" | "approval" | "system" | "gateway" | "end";

export const NodeNameConst = {
  START: "开始",
  APPROVAL: "审批节点",
  SYSTEM: "系统任务",
  GATEWAY: "网关节点",
  END: "结束",
};

export const NodeIdConst = {
  START: "start",
  APPROVAL: "approval",
  SYSTEM: "system",
  GATEWAY: "gateway",
  END: "end",
};

export type NodeNameType =
  | "Initiator"
  | "Approver"
  | "System"
  | "Gateway"
  | "Completer";

export type EdgeNameType = "Condition";

///节点类型
export interface NodeModel {
  text: string; ///节点名称
  type: NodeType; ///节点类型
  class: string; ///节点样式
}

///审批人结构
export interface ExecutorModel {
  name: string; ///姓名
  code: string; ///编号
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
  SingleAgreed = "One",
  ///全部（会签）
  AllAgreed = "All",
  // ///多路（设置人数或百分比）
  // MultipleAgreed  = "multiple"
}

///审批动作：动作为空时表示自动完成
export enum ApprovalActionType {
  ///同意
  Pass = "Pass",
  ///拒绝
  Reject = "Reject",
  ///转交
  // Transmit = "Transmit",
  ///退回
  // Goback = "Goback",
  ///协审
  Assist = "Assist",
  ///保存
  Save = "Save",
  ///提交
  Submit = "Submit",
}

///节点属性： 通用
export interface NodeSchema {
  key: string;
  name: string; ///节点名称
  enName: NodeNameType; ///英文名称
  executor: ExecutorModel | null; ///审批人员, 为空时自动处理
  description: string; ///节点描述
  aggregation?: AggregationModeType | null; ///聚合方式
  rule?: ApprovalRuleType; ///审核机制
  actions?: Array<ApprovalActionType> | null; ///审批动作
}

///连线属性：通用
export interface EdgeSchema {
  name: string; ///节点名称
  enName: EdgeNameType; ///英文名称
  // description: string; ///规则描述
  //eslint-disable-next-line
  condition: any; ///执行规则
}

export interface GraphConfigData {
  nodes: NodeConfig[];
  edges: EdgeConfig[];
}

/* data */
export interface DataOption {
  value: string;
  text: string;
}

export const ApprovalRules: Array<DataOption> = [
  {
    value: "One",
    text: "或签",
  },
  {
    value: "All",
    text: "会签",
  },
];

export const AggregationModes: Array<DataOption> = [
  {
    value: "One",
    text: "单一聚合",
  },
  {
    value: "All",
    text: "全部聚合",
  },
];

export const ApprovalActions: Array<DataOption> = [
  {
    value: "Pass",
    text: "同意",
  },
  {
    value: "Reject",
    text: "拒绝",
  },
  {
    value: "Assist",
    text: "协审",
  },
  {
    value: "Save",
    text: "保存",
  },
  {
    value: "Submit",
    text: "提交",
  },
];

export interface NodeData extends NodeModel, NodeSchema { }

export const NodesData: Array<NodeData> = [
  {
    text: NodeNameConst.START,
    type: "start",
    class: "node-start",
    key: NodeIdConst.START,
    name: NodeNameConst.START,
    enName: "Initiator",
    executor: {
      name: "",
      code: "",
    },
    description: "",
    aggregation: null,
    rule: ApprovalRuleType.OneAgreed,
    actions: [ApprovalActionType.Save, ApprovalActionType.Submit],
  },
  {
    text: NodeNameConst.APPROVAL,
    type: "approval",
    class: "node-approval",
    key: NodeIdConst.APPROVAL,
    name: NodeNameConst.APPROVAL,
    enName: "Approver",
    executor: {
      name: "",
      code: "",
    },
    description: "",
    aggregation: AggregationModeType.AllAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: [
      ApprovalActionType.Pass,
      ApprovalActionType.Reject,
      ApprovalActionType.Assist,
    ],
  },
  // {
  //   text: "系统任务",
  //   type: "system",
  //   class: "node-system",
  //   name: "系统任务",
  //   enName: "System",
  //   executor: null,
  //   description: "",
  //   aggregation: AggregationModeType.AllAgreed,
  //   rule: ApprovalRuleType.OneAgreed,
  //   actions: null,
  // },
  {
    text: NodeNameConst.GATEWAY,
    type: "gateway",
    class: "node-gateway",
    key: NodeIdConst.GATEWAY,
    name: NodeNameConst.GATEWAY,
    enName: "Gateway",
    executor: null,
    description: "",
    aggregation: AggregationModeType.AllAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: null,
  },
  {
    text: NodeNameConst.END,
    type: "end",
    class: "node-end",
    key: NodeIdConst.END,
    name: NodeNameConst.END,
    enName: "Completer",
    executor: null,
    description: "",
    aggregation: AggregationModeType.AllAgreed,
    rule: ApprovalRuleType.OneAgreed,
    actions: null,
  },
];

export const schemaAdapter = (data: NodeData): NodeSchema => {
  return {
    key: data.key,
    name: data.name,
    enName: data.enName,
    executor: data.executor,
    description: data.description,
    aggregation: data.aggregation,
    rule: data.rule,
    actions: data.actions,
  }
}

export const nodeAdapter = (data: NodeData): NodeModel => {
  return {
    text: data.text,
    type: data.type,
    class: data.class,
  }
}

export const loadInitDodes = (lf: LogicFlow) => {
  const start_x = 400,
    start_y = 300,
    offset_x = 200,
    offset_y = 100,
    node_width = 100,
    node_height = 70;
  if (lf) {
    const startData = NodesData.find((n) => n.type === "start");
    const task1Data = NodesData.find((n) => n.type === "approval");
    const task2Data = NodesData.find((n) => n.type === "approval");
    const task3Data = NodesData.find((n) => n.type === "approval");
    const gatewayData = NodesData.find((n) => n.type === "gateway");
    const endData = NodesData.find((n) => n.type === "end");

    if (
      startData &&
      task1Data &&
      task2Data &&
      task3Data &&
      gatewayData &&
      endData
    ) {
      const startNode = lf.addNode({
        type: "start",
        x: start_x,
        y: start_y,
        text: startData.text,
        properties: { ...schemaAdapter(startData) },
      });

      const task1Node = lf.addNode({
        type: "approval",
        x: start_x + offset_x,
        y: start_y,
        text: task1Data.text,
        properties: { ...schemaAdapter(task1Data) },
      });

      const task2Node = lf.addNode({
        type: "approval",
        x: start_x + offset_x * 2,
        y: start_y - offset_y * 2,
        text: task2Data.text,
        properties: { ...schemaAdapter(task2Data) },
      });

      const task3Node = lf.addNode({
        type: "approval",
        x: start_x + offset_x * 2,
        y: start_y + offset_y * 2,
        text: task3Data.text,
        properties: { ...schemaAdapter(task3Data) },
      });

      const gatewayNode = lf.addNode({
        type: "gateway",
        x: start_x + offset_x * 2,
        y: start_y,
        text: gatewayData.text,
        properties: { ...schemaAdapter(gatewayData) },
      });

      const endNode = lf.addNode({
        type: "end",
        x: start_x + offset_x * 3,
        y: start_y,
        text: endData.text,
        properties: { ...schemaAdapter(endData) },
      });

      // start ----> task1
      lf.createEdge({
        type: "polyline",
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
        type: "polyline",
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
        type: "polyline",
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
        type: "polyline",
        sourceNodeId: gatewayNode.id,
        targetNodeId: task2Node.id,
        text: {
          value: "",
          x: start_x + 160 + offset_x + 100 + offset_x + 50,
          y: start_y + 70,
        },
      });

      // task2 ----> end
      lf.createEdge({
        type: "polyline",
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
        type: "polyline",
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
}
