import { successResponse } from "../../Re-useable/CustomResponse";
import { RequestHandler } from "express";
import { offeredCourseService } from "./OfferedCourse.service";

const createOfferedCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await offeredCourseService.createOfferedCourseDB(req.body);

    res
      .status(200)
      .send(successResponse(result, "Offered Course is created successfully"));
  } catch (error) {
    next(error);
  }
};

const getAllOfferedCourses: RequestHandler = async (req, res, next) => {
  try {
    const result = await offeredCourseService.findAllOfferedCourseDB(req.query);
    res
      .status(200)
      .send(successResponse(result, " Offered Courses is Find successfully"));
  } catch (error) {
    next(error);
  }
};

const getSingleOfferedCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await offeredCourseService.findOneOfferedCourseDB(id);
    res
      .status(200)
      .send(
        successResponse(result, "One  Offered Course is Find successfully")
      );
  } catch (error) {
    next(error);
  }
};

const updateOfferedCourse: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    const result = await offeredCourseService.updateOfferedCourseDB(
      facultyId,
      req.body
    );

    res
      .status(200)
      .send(
        successResponse(result, "One  Offered Courses is Updated successfully")
      );
  } catch (error) {
    next(error);
  }
};

export const offeredCoursesControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
