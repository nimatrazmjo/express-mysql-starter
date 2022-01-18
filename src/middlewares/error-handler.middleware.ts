import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom.error";

const errorHandlerMiddleware= (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json(err.serializeError());
}

export default errorHandlerMiddleware;