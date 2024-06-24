import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { SemesterRegistrationValidations } from "./SemisterRegistration.zodValidation";
import { semesterRegistrationController } from "./SemisterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validationMiddleWare(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.createSemesterRegistration
);

router.get("/:id", semesterRegistrationController.findOneSemesterRegistration);

router.patch(
  "/:id",
  validationMiddleWare(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.updateSemesterRegistration
);

router.delete(
  "/:id",
  semesterRegistrationController.deleteOfferedCourseAndSemesterRegistration
);

router.get("/", semesterRegistrationController.findAllSemesterRegistration);

export const semesterRegistrationRoutes = router;
