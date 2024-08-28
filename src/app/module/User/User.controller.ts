import { Response, Request, NextFunction } from "express";
import { successResponse } from "../../Re-useable/CustomResponse";
import { userService } from "./User.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = req.body.student;
    const password = req.body.password;

    const result = await userService.createStudentDB(
      req?.file,
      student,
      password
    );
    res
      .status(200)
      .send(successResponse(result, "User Create Successfully done"));
  } catch (error) {
    next(error);
  }
};
const createFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const faculty = req.body.faculty;
    const password = req.body.password;

    const result = await userService.createAcademicFacultyDB(faculty, password);
    res
      .status(200)
      .send(successResponse(result, "User Create Successfully done"));
  } catch (error) {
    next(error);
  }
};
const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = req.body.admin;
    const password = req.body.password;

    const result = await userService.createAdminDB(admin, password);
    res
      .status(200)
      .send(successResponse(result, "User Create Successfully done"));
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
