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
    console.log(req.query);

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
    const payload = req.body;
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
    const result = await courseService.findOneCourseDB(id);
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
    const result = await courseService.deleteOneCourseDB(id);
    res
      .status(200)
      .send(successResponse(result, "Course Deleted Successfully done"));
  } catch (error) {
    next(error);
  }
};

const assignFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.courseId;
    const payload = req.body;
    const result = await courseService.createFacultyCoursesDB(id, payload);
    res
      .status(200)
      .send(successResponse(result, "Faculty Create Successfully done "));
  } catch (error) {
    next(error);
  }
};
const deleteFacultyCourses: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.courseId;
    const payload = req.body;
    const result = await courseService.deleteFacultyCoursesDB(id, payload);
    res
      .status(200)
      .send(successResponse(result, "Faculty Deleted Successfully done "));
  } catch (error) {
    next(error);
  }
};

const findAssignFaculties: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params?.courseId;
    const result = await courseService.findAssignFacultiesDB(id);
    res
      .status(200)
      .send(successResponse(result, "Assign faculties Find Successfully done"));
  } catch (error) {
    next(error);
  }
};
export const courseController = {
  findAllCourse,
  updateCourse,
  findOneCourse,
  deleteCourse,
  createCourse,
  assignFaculty,
  deleteFacultyCourses,
  findAssignFaculties,
};
