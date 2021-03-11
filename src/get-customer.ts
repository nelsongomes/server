import { Application, Request, response, Response } from "express";
import { OpenApi, Types } from "ts-openapi";
import { bodySchema } from "ts-openapi";
import { CustomerType, errorSchema } from "./common";

// body response schema
const responseSchema = {
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
};

function getCustomer(_request: Request, response: Response) {
  response.send({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "customer name",
    type: CustomerType.Platinum,
    birthdate: "2021-02-04",
  });
}

export function initGetCustomer(app: Application, openApi: OpenApi) {
  // declare route to express
  app.get("/customer/:id", getCustomer);

  // declare openAPI schema
  openApi.addPath(
    "/customer/:id",
    {
      get: {
        summary: "Get a customer data",
        description: "This operation retrieves customer information",
        operationId: "get-customer-op",
        requestSchema: {
          params: {
            id: Types.Uuid({
              description: "Customer ID",
              required: true, // param values MUST be required
              example: "37237d6a-bb7e-459a-b75d-d1733210ad5c",
            }),
          },
        },
        tags: ["Customer Operations"],
        responses: {
          200: bodySchema(
            Types.Object({
              description: "Successful Operation",
              properties: responseSchema,
            })
          ),
          400: errorSchema("Bad Request"),
        },
      },
    },
    true
  );
}
