import { NextFunction, Request, Response } from "express";
import { UserPayload } from "../interfaces/user-payload.interface";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const authenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }
  
  try {
    const payload = verifyToken(req.session?.jwt) as UserPayload;
    req.currentUser = payload;
  } catch (error) { }
  next();
}