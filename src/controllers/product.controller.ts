import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/product.entity";

const productsListController = async (req: Request, res: Response) => {
    
  res.send(await getRepository(Product).find());
};

const createProductController = async (req: Request, res: Response) => {  
  res.status(201).send(await getRepository(Product).save(req.body));
};
const getProductByIdController = async (req: Request, res: Response) => {  
  res.send(await getRepository(Product).findOne(req.params.id ));
};
const updateProductController = async (req: Request, res: Response) => {  
  const repository = getRepository(Product);
  await repository.update(req.params.id, req.body);
  res.status(202).send(await getRepository(Product).findOne(req.params.id ));
};

const deleteProductController = async (req: Request, res: Response) => {  
  await getRepository(Product).update(req.params.id, req.body);
  res.status(204).send({});
};




export {
  productsListController,
  createProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController
}

