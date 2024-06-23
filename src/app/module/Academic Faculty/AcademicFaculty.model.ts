import { Schema, model } from "mongoose";
import { TAcademicFaculty, TAddress, TName } from "./AcademicFaculty.interface";
import AppError from "../../Error-Handle/AppError";
import AcademicDepartmentModel from "../Academic Department/AcademicDepartment.model";

// Schema definitions
const AddressSchema = new Schema<TAddress>({
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  district: { type: String, required: true },
  zip: { type: Number, required: true },
});

const NameSchema = new Schema<TName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
});

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    id: { type: String },
    name: { type: NameSchema, required: true },
    email: { type: String, required: true },
    designation: { type: String, required: true },
    age: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: String },
    blood: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    address: { type: AddressSchema, required: true },
    contactNo: { type: String, required: true },
    profileImg: { type: String, required: [true, "Profile image is required"] },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

AcademicFacultySchema.pre("save", async function (next) {
  const academicDepartmentId = this.academicDepartment;

  // Check if academicDepartment exists only if it's provided
  if (academicDepartmentId) {
    const isExist = await AcademicDepartmentModel.findOne({
      _id: academicDepartmentId,
    });
    if (isExist === null) {
      throw new AppError(404, "This Academic Department does not exist!");
    }
  }

  next();
});

// check same faculty email and same department
AcademicFacultySchema.pre("save", async function (next) {
  const academicDepartmentId = this.academicDepartment;
  const facultyEmail = this.email;

  // Check if academicDepartment exists only if it's provided
  if (academicDepartmentId && facultyEmail) {
    const isExist = await AcademicFacultyModel.findOne({
      academicDepartment: academicDepartmentId,
      email: facultyEmail,
    });

    if (isExist) {
      throw new AppError(404, "This Academic Department does not exist!");
    }
  }

  next();
});

const AcademicFacultyModel = model<TAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema
);

export default AcademicFacultyModel;
