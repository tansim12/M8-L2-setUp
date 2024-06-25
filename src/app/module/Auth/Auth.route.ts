import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { AuthZodValidation } from "./Auth.zodValidation";
import { authController } from "./Auth.controller";

const router = express.Router();

router.post(
  "/login",
  validationMiddleWare(AuthZodValidation.loginValidationSchemaZod),
  authController.login
);

export const authRoute = router;
