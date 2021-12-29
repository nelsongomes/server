import { Request, Response, NextFunction } from "express";

export async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = ((err as any).status as any) || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({
    message,
  });
}
