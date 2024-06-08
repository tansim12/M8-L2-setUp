import { TAcademicDepartment } from "./AcademicDepartment.interface";
import AcademicDepartmentModel from "./AcademicDepartment.model";

const createAcademicDepartmentDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};
const findAllAcademicDepartmentDB = async () => {
  const result = await AcademicDepartmentModel.find().populate("academicFaculty");
  return result;
};
const getOneAcademicDepartmentDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id).populate("academicFaculty");
  if (result) {
    return result;
  } else {
    return {
      success: false,
      message: "Not found Data",
    };
  }
};
const updateOneAcademicDepartmentDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { ...payload },
    },
    { new: true }
  );
  if (result) {
    return result;
  } else {
    return {
      success: false,
      message: "Not found Data",
    };
  }
};

export const academicDepartmentService = {
  createAcademicDepartmentDB,
  getOneAcademicDepartmentDB,
  findAllAcademicDepartmentDB,
  updateOneAcademicDepartmentDB,
};
