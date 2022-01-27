import { Router } from "express";
import { linksController } from "../controllers/link.controller";
import { lists } from "../controllers/user.controller";
const router = Router();

router.get(
  "/",
  lists
);

router.get(
  "/:id/links",
  linksController
);


export { router as ambassadorRoutes };
