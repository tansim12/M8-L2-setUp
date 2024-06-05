import { Schema, model } from "mongoose";
import { TCode, TMonth, TName, TSemester } from "./Semester.interface";
import {
  semesterCodeArray,
  semesterMonthArray,
  semesterNameArray,
} from "./Semester.constVariable";
import { string } from "joi";

const SemesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      enum: semesterNameArray,
      required: true,
    },
    code: {
      type: String,
      enum: semesterCodeArray,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: semesterMonthArray,
      required: true,
    },
    endMonth: {
      type: String,
      enum: semesterMonthArray,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SemesterModel = model<TSemester>("Semester", SemesterSchema);

export default SemesterModel;
