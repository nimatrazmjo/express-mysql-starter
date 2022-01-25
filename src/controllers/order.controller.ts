import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Link } from "../entity/link.entity";
import { Order } from "../entity/order.entity";

const ordersController = async (req: Request, res: Response) => {
    const orders = await getRepository(Order).find({
      where : { complete: true},
      relations: ['order-item']
    })
  res.send(orders.map((order: Order)=>({
    id: order.id,
    name:  order.name,
    email: order.email,
    total: order.total,
    createdAt: order.createdAt,
    order_items: order.order_items
  })))
};

export {
  ordersController 
}

