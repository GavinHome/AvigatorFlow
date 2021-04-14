import LogicFlow, { GraphConfigData } from "@logicflow/core";
import { EdgeSchema, NodeSchema } from "./model";

// export function ObjToMap(obj: any) {
//   return obj
//     ? Object.keys(obj).map(function (key) {
//         return [Number(key), obj[key]];
//       })
//     : null;
// }

// export function MapToObj(strMap: Map<any, any>) {
//   const obj = Object.create(null);
//   for (const [k, v] of strMap) {
//     obj[k] = v;
//   }
//   return obj;
// }

export interface FlowNodeData extends NodeSchema {
  id: string;
  type: string;
}

export interface FlowEdgeData extends EdgeSchema {
  id: string;
  type: string;
  sourceNodeId: string;
  targetNodeId: string;
}

export interface FlowData {
  Nodes: Array<FlowNodeData>;
  Edges: Array<FlowEdgeData>;
}

export const getFlowData = (lf: LogicFlow): FlowData => {
  const nodes: Array<FlowNodeData> = [];
  const edges: Array<FlowEdgeData> = [];
  const graphData: GraphConfigData = lf.getGraphData();
  graphData.nodes.forEach((n) => {
    const { type, properties, id } = n;
    //eslint-disable-next-line
    const { key, name, enName, executor, } = properties as any;
    //eslint-disable-next-line
    const { description, aggregation, branch, rule, actions, } = properties as any;
    nodes.push({
      id: id as string,
      type: type,
      key: key,
      name: name,
      enName: enName,
      executor: executor,
      description: description,
      aggregation: aggregation,
      branch: branch,
      rule: rule,
      actions: actions,
    });
  });

  graphData.edges.forEach((e) => {
    const { type, properties, id, sourceNodeId, targetNodeId } = e;
    //eslint-disable-next-line
    const { name, enName, condition } = properties as any;
    edges.push({
      id: id as string,
      type: type,
      sourceNodeId: sourceNodeId,
      targetNodeId: targetNodeId,
      name: name,
      enName: enName,
      condition: condition,
    });
  });

  return {
    Nodes: nodes,
    Edges: edges,
  };
};
