import { Schema, model } from "mongoose";
import { TMonth, TSemester } from "./Semester.interface";

const monthArray: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SemesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      enum: ["Autumn", "Summer", "Fall"],
      required: true,
    },
    code: {
      type: String,
      enum: ["01", "02", "03"],
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: monthArray,
    },
    endMonth: {
      type: String,
      enum: monthArray,
    },
  },
  {
    timestamps: true,
  }
);

const SemesterModel = model<TSemester>("Semester", SemesterSchema)

export default SemesterModel