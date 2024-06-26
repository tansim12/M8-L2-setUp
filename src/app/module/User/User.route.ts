import express from "express";
import { userController } from "./User.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { studentSchemaZod } from "../Student/student.validation.zod";
import { AcademicZodValidationSchema } from "../Academic Faculty/AcademicFaculty.zodValidation ";
import { AdminZodValidations } from "../Admin/Admin.zodValidation";
import { authMiddleWare } from "../../middleware/AuthMiddleWare";
import { USER_ROLE } from "./User.const";

const router = express.Router();

router.post(
  "/create-student", authMiddleWare(USER_ROLE.admin),
  validationMiddleWare(studentSchemaZod.CreateStudentSchemaZod),
  userController.createStudent
);

router.post(
  "/academic-faculty-create",
  validationMiddleWare(
    AcademicZodValidationSchema.CreateAcademicFacultySchemaZod
  ),
  userController.createFaculty
);
router.post(
  "/create-admin",
  validationMiddleWare(
    AdminZodValidations.createAdminValidationSchemaZod
  ),
  userController.createAdmin
);

export const userRoute = router;
