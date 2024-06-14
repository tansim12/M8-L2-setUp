import { RequestHandler } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import { academicFacultyService } from "./AcademicFaculty.service";

const findAllAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const result = await academicFacultyService.findAllAcademicFacultyDB(
      req.query
    );
    if (result) {
      return res
        .status(200)
        .send(successResponse(result, "All Faculty find Successfully done"));
    }
  } catch (error) {
    next(error);
  }
};

const updateAcademicFaculty: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;
    const id = req.params.facultyId;
    const result: any = await academicFacultyService.updateOneAcademicFacultyDB(
      id,
      payload
    );
    if (result.success === false) {
      return res.status(202).send(errorResponse(result));
    }

    res
      .status(200)
      .send(
        successResponse(result, "Academic Faculty Created Successfully done")
      );
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

const findOneAcademicFaculty: RequestHandler = async (req, res) => {
  try {
    const id = req.params.facultyId;
    const result: any =
      await academicFacultyService.getOneAcademicFacultyDB(id);
    if (result.success === false) {
      return res.status(202).send(errorResponse(result));
    }

    res
      .status(200)
      .send(successResponse(result, "Academic Faculty Get Successfully done"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

export const academicFacultyController = {
  updateAcademicFaculty,

  findAllAcademicFaculty,
  findOneAcademicFaculty,
};
