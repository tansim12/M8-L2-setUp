import httpStatus from "http-status";
import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../Error-Handle/AppError";
import AcademicDepartmentModel from "../Academic Department/AcademicDepartment.model";
import AcademicFacultyModel from "../Academic Faculty/AcademicFaculty.model";
import { CourseModel } from "../Course/Course.mode";
import { FacultyModel } from "../Faculty/Faculty.model";
import SemesterModel from "../Semester/Semester.model";
import { SemesterRegistrationModel } from "../SemisterRegistration/SemisterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourseModel } from "./OfferedCourse.model";

const createOfferedCourseDB = async (payload: Partial<TOfferedCourse>) => {
  // all id check is exist DB

  const {
    faculty,
    course,
    academicDepartment,
    academicFaculty,
    semesterRegistration,
    section,
  } = payload;

  // faculty check
  const facultyIsExists = await FacultyModel.findById(faculty);
  if (!facultyIsExists) {
    throw new AppError(404, "Faculty Not found !");
  }
  // course check
  const courseIsExists = await CourseModel.findById(course);
  if (!courseIsExists) {
    throw new AppError(404, "Course Not found !");
  }
  // academicDepartment check
  const academicDepartmentIsExists =
    await AcademicDepartmentModel.findById(academicDepartment);
  if (!academicDepartmentIsExists) {
    throw new AppError(404, "Academic Department Not found !");
  }
  // academicFaculty check
  const academicFacultyIsExists =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!academicFacultyIsExists) {
    throw new AppError(404, "Academic Faculty Not found !");
  }
  // semesterRegistration check
  const semesterRegistrationIsExists =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!semesterRegistrationIsExists) {
    throw new AppError(404, "Semester Registration  Not found !");
  }

  // check academicSemester
  const academicSemesterIsExists = await SemesterModel.findById(
    semesterRegistrationIsExists?.academicSemester
  );
  if (!academicSemesterIsExists) {
    throw new AppError(404, "Academic Semester  Not found !");
  }

  // check academic faculty is exists belong to academicDepartment
  const isAcademicFacultyExistsAcademicDepartment =
    await AcademicDepartmentModel.findOne({
      academicFaculty: faculty,
      _id: academicDepartment,
    });

  if (!isAcademicFacultyExistsAcademicDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${facultyIsExists?.name} is not exists ${academicDepartmentIsExists?.name} `
    );
  }

  // check same section, same semester register , same course
  const isDoubleOfferedCoursesSectionsAndRegisterSemester =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

    
  if (isDoubleOfferedCoursesSectionsAndRegisterSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Offered course already  exist  `
    );
  }

  const academicSemester = academicSemesterIsExists?._id;
  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  if (result) {
    return result;
  } else {
    throw new AppError(400, "Offered Course Create Failed !");
  }
};
const findAllOfferedCourseDB = async (queryParams: Partial<TOfferedCourse>) => {
  const queryOfferedCourses = new QueryBuilder(
    OfferedCourseModel.find(),
    queryParams
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await queryOfferedCourses.modelQuery;
  if (result) {
    return result;
  } else {
    throw new AppError(400, " All Offered Course find Failed !");
  }
};
const findOneOfferedCourseDB = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);
  if (result) {
    return result;
  } else {
    throw new AppError(400, " One Offered Course find Failed !");
  }
};
const updateOfferedCourseDB = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {
  const isExists = await OfferedCourseModel.findById(id);
  if (!isExists) {
    throw new AppError(404, "Data Not Found !");
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (result) {
    return result;
  } else {
    throw new AppError(400, " One Offered Course Updated Failed !");
  }
};

export const offeredCourseService = {
  createOfferedCourseDB,
  findAllOfferedCourseDB,
  findOneOfferedCourseDB,
  updateOfferedCourseDB,
};
