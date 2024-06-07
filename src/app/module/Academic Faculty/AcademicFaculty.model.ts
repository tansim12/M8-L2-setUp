import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./AcademicFaculty.interface";

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, "Faculty name is Required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const AcademicFacultyModel = model<TAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema
);

export default AcademicFacultyModel;
