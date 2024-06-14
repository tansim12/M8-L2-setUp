import { RequestHandler } from "express";
import { successResponse } from "../../Re-useable/CustomResponse";
import { courseService } from "./Course.service";

const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await courseService.createCourseDB(req.body);
    if (result) {
      return res
        .status(200)
        .send(successResponse(result, "Course create Successfully done"));
    }
  } catch (error) {
    next(error);
  }
};
const findAllCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await courseService.findAllCourseDB(req.query);
    if (result) {
      return res
        .status(200)
        .send(successResponse(result, "All course find Successfully done"));
    }
  } catch (error) {
    next(error);
  }
};

const updateCourse: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body.faculty;
    const id = req.params.id;

    const result = await courseService.updateOneCourseDB(id, payload);
    res
      .status(200)
      .send(successResponse(result, "Course Update Successfully done"));
  } catch (error) {
    next(error);
  }
};

const findOneCourse: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result: any = await courseService.findOneCourseDB(id);
    res
      .status(200)
      .send(successResponse(result, "One Course Find Successfully done"));
  } catch (error) {
    next(error);
  }
};
const deleteCourse: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result: any = await courseService.deleteOneCourseDB(id);
    res
      .status(200)
      .send(successResponse(result, "Course Deleted Successfully done"));
  } catch (error) {
    next(error);
  }
};

export const courseController = {
  findAllCourse,
  updateCourse,
  findOneCourse,
  deleteCourse,createCourse
};
