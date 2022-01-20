import { Router } from "express";
import { body } from "express-validator";
import { AuthRegisterController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validation.middleware";
const router = Router();

router.post(
  "/register",
  [
    body("first_name").trim().notEmpty().withMessage("First name is required"),
    body("last_name").trim().notEmpty().withMessage("Last name is required"),
    body("email").trim().isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters"),
    
  ],
  validateRequest,
  AuthRegisterController
);

export { router as AuthRouter };
