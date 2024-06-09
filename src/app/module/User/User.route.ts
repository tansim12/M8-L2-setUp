import express from "express";
import { userController } from "./User.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { studentSchemaZod } from "../Student/student.validation.zod";

const router = express.Router();

router.post(
  "/create-student",
  validationMiddleWare(studentSchemaZod.CreateStudentSchemaZod),
  userController.userPost
);

export const userRoute = router;
