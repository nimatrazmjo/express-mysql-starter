import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized.error";

export const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt && !req.currentUser) {
    throw new NotAuthorizedError('You are not authorized for this action :)');
  }
  next();
}