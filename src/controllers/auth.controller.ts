import { Request, Response } from "express";

const AuthRegisterController = (req: Request, res: Response) =>{
  res.send(req.body());
}

export {
  AuthRegisterController
}