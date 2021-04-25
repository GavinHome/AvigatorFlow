import { FieldSchema, FieldTypeEnum } from "@/components/Flow/common/model";
import {
  FormRowModel,
  WidgetSchema,
  WidgetTypeEnum,
} from "@/components/Form/common/model";
import { PermissionFieldSchema } from "@/components/Permissions/model";
import { AppModel } from "./model";

export const fieldsAdapter = (app: AppModel | null): Array<FieldSchema> => {
  if (!app || !app.page) return [];
  const fields: Array<FieldSchema> = [];
  app.page.rows
    .filter((r: FormRowModel) => r.fields.length > 0)
    .forEach((r: FormRowModel) => {
      r.fields.forEach((f: WidgetSchema) => {
        let field: FieldSchema | null = null;
        switch (f.type) {
          case WidgetTypeEnum.Description:
            break;
          case WidgetTypeEnum.Label:
            break;
          case WidgetTypeEnum.SingleText:
          case WidgetTypeEnum.MultipleText:
            field = {
              key: f.code,
              name: f.title,
              type: FieldTypeEnum.String,
            };
            break;
          case WidgetTypeEnum.Number:
            field = {
              key: f.code,
              name: f.title,
              type: FieldTypeEnum.Number,
            };
            break;
          case WidgetTypeEnum.Date:
            break;
          case WidgetTypeEnum.DateRange:
            break;
          case WidgetTypeEnum.Select:
            field = {
              key: f.code,
              name: f.title,
              type: FieldTypeEnum.Select,
            };
            break;
          case WidgetTypeEnum.Radio:
            field = {
              key: f.code,
              name: f.title,
              type: FieldTypeEnum.RadioBox,
            };
            break;
          case WidgetTypeEnum.CheckBox:
            field = {
              key: f.code,
              name: f.title,
              type: FieldTypeEnum.CheckBox,
            };
            break;
          default:
            throw new Error("field type enum error");
        }
        if (field) {
          fields.push(field);
        }
      });
    });
  return fields;
};

export const permissionFieldsAdapter = (
  app: AppModel | null
): Array<PermissionFieldSchema> => {
  if (!app || !app.page) return [];
  const fields: Array<PermissionFieldSchema> = [];
  app.page.rows
    .filter((r: FormRowModel) => r.fields.length > 0)
    .forEach((r: FormRowModel) => {
      r.fields.forEach((f: WidgetSchema) => {
        const field: PermissionFieldSchema = {
          id: f.id,
          name: f.title,
        };
        fields.push(field);
      });
    });
  return fields;
};

export type PageProvider = Record<string, Array<FieldSchema>>;
export type PermissionsProvider = Record<string, Array<PermissionFieldSchema>>;

// export type PageModelAdapter = PageModel;
