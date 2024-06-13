import { Schema, model } from "mongoose";
import { TAcademicFaculty, TAddress, TName } from "./AcademicFaculty.interface";


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

const AcademicFacultyModel = model<TAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema
);

export default AcademicFacultyModel;
