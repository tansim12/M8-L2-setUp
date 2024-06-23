import express from "express";

import { offeredCoursesControllers } from "./OfferedCourse.controller";

import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { OfferedCourseValidationsZod } from "./OfferedCourse.zodValidation";

const router = express.Router();

router.get("/", offeredCoursesControllers.getAllOfferedCourses);

router.get("/:id", offeredCoursesControllers.getSingleOfferedCourse);

router.post(
  "/create-offered-course",
  validationMiddleWare(
    OfferedCourseValidationsZod.createOfferedCourseValidationSchema
  ),
  offeredCoursesControllers.createOfferedCourse
);

router.patch(
  "/:id",
  validationMiddleWare(
    OfferedCourseValidationsZod.updateOfferedCourseValidationSchema
  ),
  offeredCoursesControllers.updateOfferedCourse
);

// router.delete("/:id", OfferedCourseControllers.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
