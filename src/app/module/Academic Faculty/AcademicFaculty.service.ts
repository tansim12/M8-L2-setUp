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
    throw new AppError(404, "Single Data Not found");
  }
};
const updateOneAcademicFacultyDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const { address, name, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  console.log({modifiedUpdateData}, {payload});
  
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdateData[`address.${key}`] = value;
    }
  }
  const result = await AcademicFacultyModel.findByIdAndUpdate(
    id,
    modifiedUpdateData
  );
 
  
  if (result) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not found");
  }
};

export const academicFacultyService = {
  getOneAcademicFacultyDB,
  findAllAcademicFacultyDB,
  updateOneAcademicFacultyDB,
};
