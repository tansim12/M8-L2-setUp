import { RequestHandler } from "express";
import {
  
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

const updateAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body.faculty;
    const id = req.params.id;

    const result = await academicFacultyService.updateOneAcademicFacultyDB(
      id,
      payload
    );
    res
      .status(200)
      .send(
        successResponse(result, "Academic Faculty Update Successfully done")
      );
  } catch (error) {
    next(error);
  }
};

const findOneAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result =
      await academicFacultyService.getOneAcademicFacultyDB(id);
    res
      .status(200)
      .send(successResponse(result, "Academic Faculty Get Successfully done"));
  } catch (error) {
    next(error);
  }
};

export const academicFacultyController = {
  updateAcademicFaculty,

  findAllAcademicFaculty,
  findOneAcademicFaculty,
};
