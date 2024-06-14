import httpStatus from "http-status";
import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../Error-Handle/AppError";
import { TAcademicFaculty } from "./AcademicFaculty.interface";
import AcademicFacultyModel from "./AcademicFaculty.model";
import { facultySearchableFields } from "./AcademicFaculty.const";

const findAllAcademicFacultyDB = async (
  queryParams: Partial<TAcademicFaculty>
) => {
  const facultyQuery = new QueryBuilder(
    AcademicFacultyModel.find().populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    }),
    queryParams
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  if (result.length) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }
  // return result;
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
