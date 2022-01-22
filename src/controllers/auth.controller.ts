import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import { getConnection, getRepository } from "typeorm";
import bcryptjs from "bcryptjs";
import BadRequestError from "../errors/bad-request.error";
import { sign } from "jsonwebtoken";

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

  const token = sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });
  res.status(200).json({message:'ok'});
};
export { authRegisterController, loginCongroller };
