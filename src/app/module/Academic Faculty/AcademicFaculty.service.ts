import { TAcademicFaculty } from "./AcademicFaculty.interface";
import AcademicFacultyModel from "./AcademicFaculty.model";


const findAllAcademicFacultyDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};
const getOneAcademicFacultyDB = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  if (result) {
    return result;
  } else {
    return {
      success: false,
      message: "Not found Data",
    };
  }
};
const updateOneAcademicFacultyDB = async (
  id: string,
  payload: TAcademicFaculty
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(
    id,
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

export const academicFacultyService = {
  
  getOneAcademicFacultyDB,
  findAllAcademicFacultyDB,
  updateOneAcademicFacultyDB,
};
