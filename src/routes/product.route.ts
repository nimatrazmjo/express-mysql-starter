import { Router } from "express";
import { createProductController, deleteProductController, getProductByIdController, productsListController, updateProductController } from "../controllers/product.controller";
const router = Router();

router.post(
  "/",
  createProductController
);
router.get(
  "/",
  productsListController
);
router.get(
  "/:id",
  getProductByIdController
);
router.put(
  "/:id",
  updateProductController
);
router.delete(
  "/:id",
  deleteProductController
);


export { router as productRoutes };
