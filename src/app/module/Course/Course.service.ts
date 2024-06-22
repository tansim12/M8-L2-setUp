import httpStatus from "http-status";
import AppError from "../../Error-Handle/AppError";
import { TCourse } from "./Course.interface";
import { CourseModel } from "./Course.mode";
import QueryBuilder from "../../Builder/QueryBuilder";
import { courseSearchableFields } from "./Course.const";
import mongoose from "mongoose";

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
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //step1: basic course info update
    const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDelete)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDelete
      );

      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course!");
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id).populate(
      "preRequisiteCourses.course"
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
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
