import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Link } from "../entity/link.entity";

const linksController = async (req: Request, res: Response) => {
  res.send(
    await getRepository(Link).find({
      where: { user_id: req.params.id },
      relations: ["orders", "orders.order_items"],
    })
  );
};

export { linksController };
