import { Application, Request, Response } from "express";
import { OpenApi, Types, WebRequestSchema } from "ts-openapi";
import { CustomerType, errorSchema } from "./common";
import { validationMiddleware } from "./middlewares/validation";

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

  const successResponse = openApi.declareSchema(
    "Successful Customer Creation",
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
  );

  const error400 = openApi.declareSchema("Bad Request", errorSchema);
  const error401 = openApi.declareSchema("Unauthorized", errorSchema);

  const requestSchema: WebRequestSchema = {
    headers: {
      requestid: Types.Uuid({
        description: "Request ID",
        required: false,
        example: "b710e129-4e2c-4448-b605-73b18d297bae",
      }),
    },
    body: Types.Object({
      description: "Customer data to create",
      properties: commonProperties,
    }),
  };

  openApi.addPath(
    "/customer",
    {
      post: {
        summary: "Create customer",
        description: "This operation creates a new customer",
        operationId: "post-customer-op",
        requestSchema,
        tags: ["Customer Operations"],
        responses: {
          201: successResponse,
          400: error400,
          401: error401,
        },
      },
    },
    true
  );

  app.post("/customer", [validationMiddleware(requestSchema), create]);
}
