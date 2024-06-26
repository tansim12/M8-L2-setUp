import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { AuthZodValidation } from "./Auth.zodValidation";
import { authController } from "./Auth.controller";
import { authMiddleWare } from "../../middleware/AuthMiddleWare";
import { USER_ROLE } from "../User/User.const";

const router = express.Router();

router.post(
  "/login",
  validationMiddleWare(AuthZodValidation.loginValidationSchemaZod),
  authController.login
);
router.post(
  "/password-change",
  authMiddleWare(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty),
  validationMiddleWare(AuthZodValidation.changePasswordValidationSchemaZod),
  authController.changePassword
);
router.post(
  "/refresh-token",
  validationMiddleWare(AuthZodValidation.refreshTokenValidationSchemaZod),
  authController.refreshToken
);

export const authRoute = router;
