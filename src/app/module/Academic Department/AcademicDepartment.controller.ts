import { RequestHandler } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import { academicDepartmentService } from "./AcademicDepartment.service";

const createAcademicDepartment: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const result =
      await academicDepartmentService.createAcademicDepartmentDB(payload);
    if (result) {
      return res
        .status(200)
        .send(
          successResponse(result, "Academic Faculty Created Successfully done")
        );
    }
  } catch (error) {
    next(error);
  }
};

const findAllAcademicDepartment: RequestHandler = async (req, res, next) => {
  try {
    const result =
      await academicDepartmentService.findAllAcademicDepartmentDB();
    if (result) {
      return res
        .status(200)
        .send(
          successResponse(result, "Academic Faculty Get Successfully done")
        );
    }
  } catch (error) {
    next(error);
  }
};

const updateAcademicDepartment: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const id = req.params.departmentId;
    const result: any =
      await academicDepartmentService.updateOneAcademicDepartmentDB(
        id,
        payload
      );

    res
      .status(200)
      .send(
        successResponse(result, "Academic Department Created Successfully done")
      );
  } catch (error) {
    next(error);
  }
};

const findOneAcademicDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.departmentId;
    const result =
      await academicDepartmentService.getOneAcademicDepartmentDB(id);

    res
      .status(200)
      .send(
        successResponse(result, "Academic Department Get Successfully done")
      );
  } catch (error) {
    next(error);
  }
};

export const academicDepartmentController = {
  updateAcademicDepartment,
  findAllAcademicDepartment,
  createAcademicDepartment,
  findOneAcademicDepartment,
};
