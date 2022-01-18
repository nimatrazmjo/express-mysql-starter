import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/not-found.error";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new NotFoundError('Not Found');
}

export default notFoundMiddleware