import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";

const ambassadorListController = async (req: Request, res: Response) => {
    
  res.send(await getRepository(User).find({is_ambassador:true}));
};

export {
  ambassadorListController
}

