import { Router } from "express";
import { ordersController } from "../controllers/order.controller";

const router = Router();

router.get(
  "/",
  ordersController
);
// router.get(
//   "/list",
//   productsListController
// );
// router.get(
//   "/:id",
//   getProductByIdController
// );
// router.put(
//   "/:id",
//   updateProductController
// );
// router.delete(
//   "/:id",
//   deleteProductController
// );


export { router as orderRoutes };
