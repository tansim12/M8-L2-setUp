import AppError from "../../Error-Handle/AppError";
import { TFaculty } from "./Faculty.interface";
import { FacultyModel } from "./Faculty.model";


const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await FacultyModel.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await FacultyModel.find();
  if (result.length) {
    return result;
  }else{
    throw new AppError(404, "No Data found")
  }
 
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await FacultyModel.findById(id);
  return result;
};

const updateFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  const result = await FacultyModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const FacultyServices = {
  createFacultyIntoDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
};