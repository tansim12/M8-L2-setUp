import { Schema, model } from "mongoose";
import { TFaculty } from "./Faculty.interface";

const academicFacultySchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FacultyModel = model<TFaculty>(
  "Faculty",
  academicFacultySchema
);
