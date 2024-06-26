import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { CourseZodValidations } from "./Course.zodValidation";
import { courseController } from "./Course.controller";
import { authMiddleWare } from "../../middleware/AuthMiddleWare";
import { USER_ROLE } from "../User/User.const";

const router = express.Router();

router.post(
  "/create-course",
  authMiddleWare(USER_ROLE.admin),
  validationMiddleWare(CourseZodValidations.createCourseValidationSchemaZod),
  courseController.createCourse
);
router.patch(
  "/:id",
  authMiddleWare(USER_ROLE.admin),
  validationMiddleWare(CourseZodValidations.updateCourseValidationSchemaZod),
  courseController.updateCourse
);
router.get(
  "/",
  authMiddleWare(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  courseController.findAllCourse
);
router.delete(
  "/:id",
  authMiddleWare(USER_ROLE.admin),
  courseController.deleteCourse
);

// faculties courses
router.put(
  "/:courseId/assign-faculty",
  authMiddleWare(USER_ROLE.admin),
  validationMiddleWare(
    CourseZodValidations.facultiesWithCourseValidationSchemaZod
  ),
  courseController.assignFaculty
);
router.delete(
  "/:courseId/remove-faculty",
  authMiddleWare(USER_ROLE.admin),
  validationMiddleWare(
    CourseZodValidations.facultiesWithCourseValidationSchemaZod
  ),
  courseController.deleteFacultyCourses
);

export const courseRoute = router;
