import express from "express";
import { studentController } from "./student.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { studentSchemaZod } from "./student.validation.zod";

const router = express.Router();

// router.post("/create-student", studentController.postStudentData);
router.get("/", studentController.getAllStudent);
router.get("/:id", studentController.findOneStudentData);
router.delete("/:id", studentController.deleteOneData);
router.patch(
  "/:studentId",
  validationMiddleWare(studentSchemaZod.UpdateStudentSchemaZod),
  studentController.updateStudentData
);

export const studentRoute = router;
