import { FlowData, getFlowData } from "./utils";

//eslint-disable-next-line
export const validateKeyExist = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback();
  } else {
    let message: string = rule.message;
    if (!message) {
      message = `'${value}'已存在`;
    }

    const data: FlowData = getFlowData(rule.flow);
    const array = data.Nodes.filter((n) => n.id !== rule.id).map((n) => n.key);
    console.log(array);
    if (array.includes(value)) {
      return callback(new Error(message));
    } else {
      return callback();
    }
  }
};
