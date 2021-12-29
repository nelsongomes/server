import { Types } from "ts-openapi";

export enum CustomerType {
  Platinum = "platinum",
  Gold = "gold",
  Silver = "silver",
}

export const errorSchema = Types.Object({
  description: "Error Object",
  properties: {
    code: Types.Integer({ description: "Error Code" }),
    errorId: Types.Uuid({ description: "Support Unique Error ID" }),
    errorDetails: Types.Array({
      arrayType: Types.String(),
      description: "Error List",
    }),
  },
  example: {
    code: "121",
    errorId: "3520c143-983b-42a4-8c08-0f3e0bbdfb29",
    errorDetails: ["Name is mandatory.", "Unknown error"],
  },
  modelName: "ErrorResponse",
});

export const customerSchema = Types.Object({
  description: "Customer information",
  properties: {
    id: Types.Uuid({ description: "Customer ID" }),
    name: Types.String({
      description: "Customer name",
      maxLength: 100,
      required: true,
    }),
    type: Types.StringEnum({
      values: Object.values(CustomerType),
      description: "Customer Type",
    }),
    birthdate: Types.Date({ description: "Birthdate" }),
  },
  modelName: "Customer",
});
