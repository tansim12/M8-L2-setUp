import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./AcademicDepartment.interface";
import { NextFunction } from "express";
import { errorResponse } from "../../Re-useable/CustomResponse";

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, "Faculty name is Required"],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFacultyModel",
    },
  },
  {
    timestamps: true,
  }
);


// when i save academic department , then checking name isExists 
AcademicDepartmentSchema.pre("save", async function (next: Function) {
  const isExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });


  if (isExists) {
    throw new Error("This Department already exists");
  }
  next();
});



// when i update academic department , then checking id isExists 
AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next: Function) {
  const query = this.getQuery(); // 'this' refers to the query itself in pre hooks for 'findOne'
  const isExists = await AcademicDepartmentModel.findOne(query);
  if (!isExists) {
    throw new Error("This Department does not exist");
  }
  next();
});

const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  AcademicDepartmentSchema
);

export default AcademicDepartmentModel;
