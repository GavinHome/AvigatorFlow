/*eslint-disable */

import { Guid } from "guid-typescript";
import moment from "moment";
import { DATE_FORMAT } from "./const";
import { ExpressionModel, ExpressionType, FieldFormulaModel, FieldSchema, PageModel } from "./model";

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

export const getFieldFormula = (page: PageModel): FieldFormulaModel[] => {
  const fieldFormulas: FieldFormulaModel[] = [];
  page.rows
    .filter((r) => r.fields.length > 0)
    .forEach((r) => {
      r.fields
        .filter((f) => f.expression && f.expression.length > 0)
        .forEach((f) => {
          f.expression
            .filter((e) => e.type === ExpressionType.Field)
            .forEach((exp) => {
              const item = fieldFormulas.find((x) => x.fieldCode === exp.value);
              if (item) {
                if (item.formulas.indexOf(f.code) < 0) {
                  item.formulas.push(f.code);
                }
              } else {
                fieldFormulas.push({
                  fieldCode: exp.value,
                  formulas: [f.code],
                });
              }
            });
        });
    });

  return fieldFormulas;
}

export const formatDateTime = (date: Date, format?: string) => {
  format = format || DATE_FORMAT;
  const dateFormat = moment(date).format(format);
  if (dateFormat.indexOf("0001-01-01") > -1 || dateFormat.indexOf("1970-01-01") > -1) {
    return "";
  } else {
    return dateFormat;
  }
};

export const getPageFields = (page: PageModel): Array<FieldSchema> => {
  const fields: FieldSchema[] = [];
  page.rows
    .filter((r) => r.fields.length > 0)
    .forEach((r) => {
      r.fields.forEach((f) => {
        fields.push(f);
      });
    });
  return fields;
}