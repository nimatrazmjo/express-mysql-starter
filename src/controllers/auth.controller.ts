import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import { getConnection, getRepository } from "typeorm";
import bcryptjs from "bcryptjs";
import BadRequestError from "../errors/bad-request.error";
import { generateToken } from "../utils/jwt";

const authRegisterController = async (req: Request, res: Response) => {
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

const loginCongroller = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getRepository(User).findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }

  if (!(await bcryptjs.compare(password, user.password))) {
    throw new BadRequestError("Invalid Credentials");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });
  req.session = {
    jwt: token,
  };
  res.status(200).json({ message: "ok" });
};

const currentUserController = async (req: Request, res: Response) => {
  const { password, ...user } = await getRepository(User).findOne(req.currentUser.id)
  res.send(user);
};
const logoutController = async (req: Request, res: Response) => {
  req.session = null;
 
  res.status(200).json({ message: "ok" });
};


const updatProfileController = async (req: Request, res: Response) => {
  const repository = getRepository(User);

  await repository.update(req.currentUser.id, req.body);
  
  res.status(200).json(await repository.findOne(req.currentUser.id));
};

const changePasswordController = async (req: Request, res: Response) => {
  const repository = getRepository(User);
  const  { password, confirm_password} = req.body;

  if (password !== confirm_password) {
    throw new BadRequestError('Password don not match!');
  }

  await repository.update(req.currentUser.id, {
    password: await bcryptjs.hash(password,10)
  });
  res.send({message: "ok"})
};


export {
  authRegisterController,
  loginCongroller,
  currentUserController,
  logoutController,
  updatProfileController,
  changePasswordController
};
