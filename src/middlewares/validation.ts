import { NextFunction, Request, Response } from "express";
import { Joi, Types, WebRequestSchema } from "ts-openapi";
import { ApplicationError, wrapApplicationError } from "../errors";

// this is the default Joi behaviour
const commonValidationOptions: Joi.ValidationOptions = {
  // returns all validation errors
  abortEarly: false,
  // by default all members are required unless stated optional
  presence: "optional",
  // do not allow unknown properties
  allowUnknown: false,
};

// now we setup specific behaviors
export const JOI_DEFAULTS = {
  body: {
    ...commonValidationOptions,
  } as any as Joi.ValidationOptions,
  query: {
    ...commonValidationOptions,
  } as any as Joi.ValidationOptions,
  params: {
    ...commonValidationOptions,
    presence: "required",
  } as any as Joi.ValidationOptions,
  headers: {
    ...commonValidationOptions,
    allowUnknown: true,
  } as any as Joi.ValidationOptions,
};

export function validationMiddleware(args: WebRequestSchema) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    // validations to apply to different parts of the request
    const { body, query, headers, params } = args;

    try {
      validateSchema(
        request,
        request.body,
        "JSON body",
        body,
        JOI_DEFAULTS.body
      );

      validateSchema(
        request,
        request.query,
        "query params",
        query ? Types.Object({ properties: query }) : undefined,
        JOI_DEFAULTS.query
      );

      validateSchema(
        request,
        request.params,
        "url params",
        params ? Types.Object({ properties: params }) : undefined,
        JOI_DEFAULTS.params
      );

      validateSchema(
        request,
        request.headers,
        "HTTP headers",
        headers ? Types.Object({ properties: headers }) : undefined,
        JOI_DEFAULTS.headers
      );

      next();
    } catch (e) {
      next(e);
    }
  };
}

export function validateSchema(
  request: Request,
  content: any,
  message: string,
  schema?: Joi.ObjectSchema,
  options?: Joi.ValidationOptions
) {
  try {
    if (schema) {
      validate(content, schema, options);
    }
  } catch (error: any) {
    const appError = wrapApplicationError(
      400,
      `Error in ${message} of ${request.baseUrl}${request.path} -> ${error.message}`,
      error
    );

    throw appError;
  }
}

function validate<T>(
  valueToValidate: T,
  schema: Joi.ObjectSchema,
  options?: Joi.ValidationOptions
) {
  const { error } = schema.validate(valueToValidate, { ...options });

  if (error) {
    throw new ApplicationError(400, error.message, error);
  }
}
