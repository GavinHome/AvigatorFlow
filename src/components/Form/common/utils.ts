/*eslint-disable */

import { Guid } from "guid-typescript";
import { ExpressionModel, FieldSchema } from "./model";

export const NewId = () => {
  return Guid.create().toString();
};

export const newCode = () => {
  return "";
};

export const getNumberExpression = (numberExpression: ExpressionModel[], allNumberFields: FieldSchema[], withSquareBrackets = true): string => {
  let expression = "";
  const exps = numberExpression;

  if (exps && exps.length > 0) {
    expression = numberExpression.map((x) => x.value).join("");
    allNumberFields.forEach((item) => {
      if (expression.includes(item.code)) {
        if (withSquareBrackets) {
          expression = expression.replace(new RegExp(`${item.code}`, "gm"), "[" + item.title + "]");
        } else {
          expression = expression.replace(new RegExp(`${item.code}`, "gm"), item.title);
        }
      }
    });
  }

  return expression;
};
