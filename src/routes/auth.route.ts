import { Router } from "express";
import { AuthRegisterController } from "../controllers/auth.controller";

const router = Router();

router.post('/register', AuthRegisterController);

export { router as AuthRouter };