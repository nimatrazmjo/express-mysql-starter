import { currentUserMiddleware } from "./../middlewares/current-user.middleware";
import { authenticatedMiddleware } from "./../middlewares/authenticated-route.middleware";
import { Router } from "express";
import { ConfirmOrder, CreateOrder, ordersController } from "../controllers/order.controller";

const router = Router();

router.get(
  "/",
  authenticatedMiddleware,
  currentUserMiddleware,
  ordersController
);

router.post("/checkout", CreateOrder);
router.post("/checkout/confirm", ConfirmOrder);

export { router as orderRoutes };
