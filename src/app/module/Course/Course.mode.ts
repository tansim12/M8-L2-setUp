import { Schema, model } from "mongoose";
import {
  TCourse,
  TFacultyCourses,
  TPreRequisiteCourses,
} from "./Course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model<TCourse>("Course", courseSchema);

const facultyCoursesSchema = new Schema<TFacultyCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      unique: true,
    },
    faculties: {
      type: [Schema.Types.ObjectId],
      ref: "AcademicFaculty",
    },
  },
  { timestamps: true }
);
export const FacultyCoursesModel = model<TFacultyCourses>(
  "FacultyCourses",
  facultyCoursesSchema
);
