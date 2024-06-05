import { Schema, model } from "mongoose";
import { TSemester } from "./Semester.interface";
import {
  semesterCodeArray,
  semesterMonthArray,
  semesterNameArray,
} from "./Semester.constVariable";

interface TNameAndCode{
  Autumn: "01";
  Summer: "02";
  Fall: "03";
} 

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

SemesterSchema.pre("save", async function (next: Function) {
  const nameWiseCode:TNameAndCode = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };



  const isCheck = nameWiseCode[this.name] !== this.code
  if (isCheck) {
    throw new Error("Invalid code and name")
  }

  const isExistsYearAndName = await SemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isExistsYearAndName) {
    throw new Error("This year same semester already exists");
  }
});

const SemesterModel = model<TSemester>("Semester", SemesterSchema);

export default SemesterModel;
