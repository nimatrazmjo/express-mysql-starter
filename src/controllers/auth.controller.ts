import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import { IUser } from "src/interfaces/user.interface";
import { getConnection, getRepository } from "typeorm";
import bcryptjs from 'bcryptjs';

const AuthRegisterController = async (req: Request, res: Response) =>{
  //TODO password not match confirmation
  const { first_name, last_name, email, password } = req.body;
  console.log(req.body);
  
  const user = await getConnection().getRepository(User).save({first_name, last_name, email, password: await bcryptjs.hash(password, 10), is_ambassador: false})
  // const user = new User();
  // user.first_name = first_name;
  // user.last_name = last_name;
  // user.email = email;
  // user.password = await bcryptjs.hash(password, 10);
  // user.is_ambassador = false;
  // await user.save()
  res.status(201).json(user);
}

export {
  AuthRegisterController
}