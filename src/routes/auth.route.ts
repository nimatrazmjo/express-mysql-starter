import { Router } from "express";
import { body } from "express-validator";
import { duplicateEmailMiddleware } from "../middlewares/duplicate-email.middleware";
import { authRegisterController, loginCongroller } from "../controllers/auth.controller";
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
  duplicateEmailMiddleware,
  authRegisterController
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Email must be valid"),
    body("password").trim().trim().notEmpty().withMessage("Password must be provide"),
  ],
  validateRequest,
  loginCongroller
);



export { router as AuthRouter };
