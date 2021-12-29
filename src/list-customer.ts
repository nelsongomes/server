import { Application, Request, Response } from "express";
import { OpenApi, Types } from "ts-openapi";
import { customerSchema, CustomerType, errorSchema } from "./common";
import { validationMiddleware } from "./middlewares/validation";
import { queryParameterArray } from "./middlewares/query-parameter-array";

function listCustomers(request: Request, response: Response) {
  const records = [];

  for (let i = 0; i < Number(request.query.records); i++) {
    records.push({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "customer name",
      type: CustomerType.Platinum,
      birthdate: "2021-02-04",
    });
  }
  response.send({ data: records });
}

export function initListCustomers(app: Application, openApi: OpenApi) {
  const requestSchema = {
    query: {
      page: Types.Integer({
        description: "Page number",
        default: 0,
        minValue: 0,
      }),
      records: Types.Integer({
        description: "Records per page",
        default: 10,
        minValue: 10,
        maxValue: 100,
        required: true,
      }),
      types: Types.Array({
        arrayType: Types.StringEnum({
          values: Object.values(CustomerType),
        }),
      }),
    },
  };

  const successResponse = openApi.declareSchema(
    "Successful Customer List Response",
    Types.Object({
      description: "Successful Operation",
      properties: {
        data: Types.Array({
          description: "An array of customers",
          arrayType: customerSchema,
        }),
      },
    })
  );

  const error400 = openApi.declareSchema("Bad Request", errorSchema);

  // declare route to express
  app.get("/customer/list", [
    queryParameterArray("types"), // makes sure 'types' is always an array, read method comments
    validationMiddleware(requestSchema),
    listCustomers,
  ]);

  // declare openAPI schema
  openApi.addPath(
    "/customer/list",
    {
      get: {
        summary: "Get a page of customer data",
        description: "This operation return an array of customer information",
        operationId: "list-customer-op",
        requestSchema,
        tags: ["Customer Operations"],
        responses: {
          200: successResponse,
          400: error400,
        },
      },
    },
    true
  );
}
