
import { FacultyServices } from "./Faculty.service";
import { successResponse } from "../../Re-useable/CustomResponse";
import { RequestHandler } from "express";

const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const result = await FacultyServices.createFacultyIntoDB(req.body);

    res
      .status(200)
      .send(successResponse(result, "Academic faculty is created succesfully"));
  } catch (error) {
    next(error);
  }
};

const getAllFaculties: RequestHandler = async (req, res, next) => {
  try {
    const result = await FacultyServices.getAllFacultiesFromDB();
    res
      .status(200)
      .send(successResponse(result, " faculty is Find succesfully"));
  } catch (error) {
    next(error);
  }
};

const getSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(facultyId);
    res
      .status(200)
      .send(successResponse(result, "One  faculty is Find succesfully"));
  } catch (error) {
    next(error);
  }
};

const updateFaculty:RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
  const result = await FacultyServices.updateFacultyIntoDB(
    facultyId,
    req.body
  );

  res
      .status(200)
      .send(successResponse(result, "One  faculty is Updated succesfully"));
  } catch (error) {
    next(error)
  }
}

export const FacultyControllers = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
};
