import { Application, Request, Response } from "express";
import { OpenApi, Types } from "ts-openapi";
import { customerSchema, CustomerType, errorSchema } from "./common";

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
          200: openApi.declareSchema("Successful Operation", customerSchema),
          400: openApi.declareSchema("Bad Request", errorSchema),
        },
      },
    },
    true
  );
}
