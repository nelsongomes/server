import { NextFunction, Request, Response } from "express";

export function queryParameterArray(name: string) {
  /* this middleware makes sure a query parameter is always an array
    because express only converts to array when given multiple options:
        type=a,b > array 
        type=a > string
    */
  return async (request: Request, _response: Response, next: NextFunction) => {
    if (request.query[name] && !Array.isArray(request.query[name])) {
      request.query[name] = [request.query[name]] as any;
    }

    next();
  };
}
