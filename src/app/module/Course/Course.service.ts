import httpStatus from "http-status";
import AppError from "../../Error-Handle/AppError";
import { TCourse } from "./Course.interface";
import { CourseModel } from "./Course.mode";
import QueryBuilder from "../../Builder/QueryBuilder";
import { courseSearchableFields } from "./Course.const";

const createCourseDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  if (result) {
    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Course Create Failed");
  }
};
const findAllCourseDB = async (queryParams: Partial<TCourse>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate("preRequisiteCourses.course"),
    queryParams
  )
    .search(courseSearchableFields)
    .filter()
    .paginate()
    .fields()
    .sort();
  const result = await courseQuery.modelQuery;
  if (result.length) {
    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, " Find All Course Failed");
  }
};
const findOneCourseDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    "preRequisiteCourses.course"
  );
  if (result) {
    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, " Find One Course Failed");
  }
};
const updateOneCourseDB = async (id: string, payload: Partial<TCourse>) => {
  console.log({payload}, {id});
  
const {preRequisiteCourses, ...courseRemaining}=payload
console.log(courseRemaining);



  const result = await CourseModel.findByIdAndUpdate(id, courseRemaining, {
    new: true,
    runValidators: true,
  });
  if (result) {
    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, " Course updated Failed");
  }
};
const deleteOneCourseDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true }
  );
  if (result) {
    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, " Course Deleted Failed");
  }
};

export const courseService = {
  deleteOneCourseDB,
  updateOneCourseDB,
  findOneCourseDB,
  findAllCourseDB,
  createCourseDB,
};
