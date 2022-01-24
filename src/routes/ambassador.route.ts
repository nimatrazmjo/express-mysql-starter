import { Router } from "express";
import { ambassadorListController } from "../controllers/ambassador.controller";
const router = Router();

router.get(
  "/list",
  ambassadorListController
);


export { router as ambassadorRoutes };
