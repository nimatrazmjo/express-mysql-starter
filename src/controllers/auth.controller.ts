import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import { getConnection } from "typeorm";
import bcryptjs from "bcryptjs";
import { RequestValidationError } from "../errors/request-validation.error";

const AuthRegisterController = async (req: Request, res: Response, next: NextFunction) => {
  //TODO password not match confirmation
  const { first_name, last_name, email, password: userPassword } = req.body;
  const { password, ...user } = await getConnection()
    .getRepository(User)
    .save({
      first_name,
      last_name,
      email,
      password: await bcryptjs.hash(userPassword, 10),
      is_ambassador: false,
    });
  
  res.status(201).json(user);
};

export { AuthRegisterController };
