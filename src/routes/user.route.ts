import { Router } from "express";
import { createLinkController, linksController, statsController } from "../controllers/link.controller";
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

router.post(
  "/links/create",
  createLinkController
);

router.get("/links/status", statsController)


export { router as userRoutes };
