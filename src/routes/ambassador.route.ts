import { Router } from "express";
import { ambassadorListController } from "../controllers/ambassador.controller";
import { linksController } from "../controllers/link.controller";
const router = Router();

router.get(
  "/ambassadors/list",
  ambassadorListController
);

router.get(
  "/:id/links",
  linksController
);


export { router as ambassadorRoutes };
