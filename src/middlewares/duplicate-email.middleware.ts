import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import { RequestValidationError } from "../errors/request-validation.error";
import { getConnection } from "typeorm";

export const duplicateEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const userExists = await getConnection()
    .getRepository(User)
    .createQueryBuilder()
    .where({ email: email })
    .getCount();
  console.log(userExists, 'User existsss');
  
  if (userExists > 0) {
   throw new RequestValidationError([{msg: 'Email already exist', param: 'email', nestedErrors: [], value: '', location: 'body'}]);
  }
  next()
}