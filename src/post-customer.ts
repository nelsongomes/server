import { Application, Request, Response } from "express";
import { OpenApi, Types } from "ts-openapi";
import { bodySchema } from "ts-openapi/lib/openapi/openapi-functions";
import { errorSchema, CustomerType } from "./common";

function create(request: Request, response: Response) {
  if (!request.headers.authorization) {
    response.status(401).send({
      message: "Unauthorized",
      code: 401,
    });
  } else {
    response.status(201).send({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      ...request.body,
    });
  }
}

export function initPostCustomer(app: Application, openApi: OpenApi) {
  initCreate(app, openApi);
}

function initCreate(app: Application, openApi: OpenApi) {
  app.post("/customer", create);

  const commonProperties = {
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

  openApi.addPath(
    "/customer",
    {
      post: {
        summary: "Create customer",
        description: "This operation creates a new customer",
        operationId: "post-customer-op",
        requestSchema: {
          headers: {
            requestId: Types.Uuid({
              description: "Request ID",
              required: false,
              example: "b710e129-4e2c-4448-b605-73b18d297bae",
            }),
          },
          body: Types.Object({
            description: "Customer data to create",
            properties: commonProperties,
          }),
        },
        tags: ["Customer Operations"],
        responses: {
          201: bodySchema(
            Types.Object({
              description: "Created",
              properties: {
                id: Types.Uuid({ description: "Customer ID" }),
                ...commonProperties,
              },
              example: {
                id: "b710e129-4e2c-4448-b605-73b18d297bae",
                name: "Customer Name",
                type: CustomerType.Platinum,
                birthdate: "2020-12-30",
              },
            })
          ),
          400: errorSchema("Bad Request"),
          401: errorSchema("Unauthorized"),
        },
      },
    },
    true
  );
}
