import { RequestHandler } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import { academicDepartmentService } from "./AcademicDepartment.service";

const createAcademicFaculty: RequestHandler = async (req, res) => {
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
    res.status(500).send(errorResponse(error));
  }
};

const findAllAcademicFaculty: RequestHandler = async (req, res) => {
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
    res.status(500).send(errorResponse(error));
  }
};

const updateAcademicFaculty: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;
    const id = req.params.departmentId;
    const result: any =
      await academicDepartmentService.updateOneAcademicDepartmentDB(
        id,
        payload
      );
    if (result.success === false) {
      return res.status(202).send(errorResponse(result));
    }

    res
      .status(200)
      .send(
        successResponse(result, "Academic Department Created Successfully done")
      );
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

const findOneAcademicFaculty: RequestHandler = async (req, res) => {
  try {
    const id = req.params.departmentId;
    const result: any =
      await academicDepartmentService.getOneAcademicDepartmentDB(id);
    if (result.success === false) {
      return res.status(202).send(errorResponse(result));
    }
    res
      .status(200)
      .send(
        successResponse(result, "Academic Department Get Successfully done")
      );
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

export const academicDepartmentController = {
  updateAcademicFaculty,
  createAcademicFaculty,
  findAllAcademicFaculty,
  findOneAcademicFaculty,
};
