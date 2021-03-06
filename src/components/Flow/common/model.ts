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

///审批人规则类型
export enum ExecutorRuleType {
  ///发起人
  Initiator = "Initiator",
  ///指定人，流程前确定
  Designator = "Designator",
  ///变量：来自表单，执行时确定
  Variable = "Variable",
  ///角色
  Role = "Role",
  ///通过接口获取，需要把表单整体传到接口中（仅开发用）
  Api = "Api",
}

export type ExecutorRuleParamTypeConst = "Designator" | "VariableId" | "RoleId";

export enum ExecutorRuleParamTypeEnum {
  ///Initiator
  Initiator = "Initiator",
  ///Designator
  Designator = "Designator",
  ///VariableId
  VariableId = "VariableId",
  ///RoleId
  RoleId = "RoleId",
  // ///OrganizationId
  // OrganizationId = "OrganizationId",
  // ///Url
  Url = "Url",
}

///执行人（审批人）规则
export interface ExecutorRuleModel {
  type: ExecutorRuleType;
  // params: Map<ExecutorRuleParamTypeEnum, DataOption | null>;
  params: Array<ExecutorRuleParamModel>;
}

export interface ExecutorRuleParamModel {
  type: ExecutorRuleParamTypeEnum;
  value: DataOption | null;
}

///1. number: ==,>,>=,<,<=,!=,
///2. string: ==

///比较运算符号
export enum ComparisonOperationSymbolEnum {
  ///==
  Eq = "==",
  ///>
  Gt = ">",
  ///>=
  Gte = ">=",
  ///<
  Lt = "<",
  ///<=
  Lte = "<=",
  ///!=
  Nte = "!=",
}

///逻辑运算符号
export enum LogicOperatorSymbolEnum {
  ///&&，逻辑与
  And = "&&",
  ///||，逻辑或
  Or = "||",
}

///逻辑运算符号
export enum BracketSymbolEnum {
  ///左括号：(
  Left = "(",
  ///右括号：)
  Right = ")",
}

///条件类型
export enum ConditionTypeEnum {
  ///默认，为空
  Default = "None",
  ///简单规则，例如${字段} == 1，
  Simple = "Simple",
  ///复杂表达式，多个简单表达式的复合形式
  Complex = "Complex",
}

///规则类型
export enum ConditionRuleTypeEnum {
  ///括号符号
  Bracket = "Bracket",
  ///逻辑符号
  Logic = "Logic",
  ///表达式
  Expression = "Expression",
}

///表达式项
export interface ConditionExpressionModel {
  variable: string; //表单字段
  varType: string; //字段类型
  operator: string; //比较操作
  value: string | number | null; //右值
}

///规则：${abc}==1, (${abc}>1&&${bcd}<3)||${cde}!=3
export interface ConditionRuleModel {
  type: ConditionRuleTypeEnum; ///规则类型
  expression: ConditionExpressionModel | string | null; ///表达式项
}

///条件
export interface ConditionModel {
  type: ConditionTypeEnum; ///类型
  expressions: Array<ConditionRuleModel>; ///${abc}==1, (${abc}>1&&${bcd}<3)||${cde}!=3
}

/*************************** node properties end *****************/

/*************************** edge type ***************************/
export type EdgeNameType = "Condition";
export const EdgeNameConst = {
  CONDITION: "条件",
};
export enum EdgeNameTypeEnum {
  Condition = "Condition",
}
export type EdgeType = "polyline";
export enum EdgeNameTypeEnum {
  Polyline = "polyline",
}
/*************************** edge type end ***********************/

/*************************** declare interface ***************************/
///用户信息
export interface UserModel {
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
  executor: ExecutorRuleModel | null; ///审批人员, 为空时自动处理
  description: string; ///节点描述
  rule?: ApprovalRuleType; ///审核机制
  actions?: Array<ApprovalActionType> | null; ///审批动作
}

///连线属性
export interface EdgeSchema {
  name: string; ///节点名称
  enName: EdgeNameType; ///英文名称
  condition: ConditionModel; ///执行规则
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
      type: ExecutorRuleType.Initiator,
      params: [],
    },
    description: "",
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
      type: ExecutorRuleType.Designator,
      params: [],
    },
    description: "",
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
      task1Properties.executor = {
        type: ExecutorRuleType.Designator,
        params: [
          {
            type: ExecutorRuleParamTypeEnum.Designator,
            value: {
              value: "user001",
              text: "用户1",
            },
          },
        ],
      };

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
      task2Properties.executor = {
        type: ExecutorRuleType.Role,
        params: [
          {
            type: ExecutorRuleParamTypeEnum.RoleId,
            value: {
              value: "ProjectManager",
              text: "项目经理",
            },
          },
          {
            type: ExecutorRuleParamTypeEnum.VariableId,
            value: {
              value: "abc",
              text: "变量1",
            },
          },
        ],
      };
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
      task3Properties.executor = {
        type: ExecutorRuleType.Variable,
        params: [
          {
            type: ExecutorRuleParamTypeEnum.VariableId,
            value: {
              value: "bcd",
              text: "变量2",
            },
          },
        ],
      };
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
          x: start_x + 80,
          y: start_y - 10,
        },
      });

      // task1 ----> gateway
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: task1Node.id,
        targetNodeId: gatewayNode.id,
        text: {
          value: "",
          x: start_x + 100 + offset_x,
          y: start_y - 10,
        },
      });

      // gateway ----> task2
      const condition1: ConditionModel = {
        type: ConditionTypeEnum.Simple,
        expressions: [
          {
            type: ConditionRuleTypeEnum.Expression,
            expression: {
              variable: "abc",
              varType: "",
              operator: ">",
              value: "100000",
            },
          },
        ],
      };
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: gatewayNode.id,
        targetNodeId: task2Node.id,
        text: {
          value: "金额大于10万",
          x: start_x + offset_x + 250,
          y: start_y - offset_y + 15,
        },
        properties: {
          name: "金额大于10万",
          condition: condition1,
          enName: EdgeNameTypeEnum.Condition,
        },
      });

      // gateway ----> task3
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: gatewayNode.id,
        targetNodeId: task3Node.id,
        text: {
          value: "",
          x: start_x + offset_x + 220,
          y: start_y + offset_y,
        },
      });

      // task2 ----> end
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: task2Node.id,
        targetNodeId: endNode.id,
        text: {
          value: "",
          x: start_x + offset_x * 3 + 20,
          y: start_y - offset_y,
        },
      });

      // task3 ----> end
      lf.createEdge({
        type: EdgeNameTypeEnum.Polyline,
        sourceNodeId: task3Node.id,
        targetNodeId: endNode.id,
        text: {
          value: "",
          x: start_x + offset_x * 3 + 30,
          y: start_y + offset_y,
        },
      });
    }
  }
};

export const ConditionRules: Array<DataOption> = [
  {
    value: ConditionTypeEnum.Default,
    text: "无",
  },
  {
    value: ConditionTypeEnum.Simple,
    text: "简单规则",
  },
  {
    value: ConditionTypeEnum.Complex,
    text: "复杂规则",
  },
];

export const ComparisonOperations: Array<DataOption> = [
  {
    value: ComparisonOperationSymbolEnum.Eq,
    text: "等于",
  },
  {
    value: ComparisonOperationSymbolEnum.Gt,
    text: "大于",
  },
  {
    value: ComparisonOperationSymbolEnum.Gte,
    text: "大于等于",
  },
  {
    value: ComparisonOperationSymbolEnum.Lt,
    text: "小于",
  },
  {
    value: ComparisonOperationSymbolEnum.Lte,
    text: "小于等于",
  },
  {
    value: ComparisonOperationSymbolEnum.Nte,
    text: "不等于",
  },
];

export const Brackets: Array<DataOption> = [
  {
    value: BracketSymbolEnum.Left,
    text: BracketSymbolEnum.Left,
  },
  {
    value: BracketSymbolEnum.Right,
    text: BracketSymbolEnum.Right,
  },
];

export const ExecutorRules: Array<DataOption> = [
  {
    value: ExecutorRuleType.Designator,
    text: "全员",
  },
  {
    value: ExecutorRuleType.Variable,
    text: "表单变量",
  },
  {
    value: ExecutorRuleType.Role,
    text: "角色",
  },
  {
    value: ExecutorRuleType.Api,
    text: "接口",
  },
];

/*************************** data common end ***************************/

/*************************** form *******************************/
export enum FieldTypeEnum {
  Number = "number",
  String = "string",
  CheckBox = "checkbox",
  RadioBox = "radiobox",
  Select = "select",
}

export interface FieldSchema {
  key: string;
  name: string;
  type: FieldTypeEnum;
  options?: Array<DataOption>; //array type
}
/*************************** form end ***************************/
