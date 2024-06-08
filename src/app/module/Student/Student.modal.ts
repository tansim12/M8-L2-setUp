import { Schema, model } from "mongoose";
import { Address, Guardian, Name, Student } from "./Student.interface";

import Bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// Address schema
const AddressSchema = new Schema<Address>({
  currentAddress: {
    type: String,
    required: [true, "Current address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  zip: { type: Number, required: [true, "ZIP code is required"] },
  district: { type: String, required: [true, "District is required"] },
});

// Guardian schema
const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  fatherMobNo: {
    type: String,
    required: [true, "Father's mobile number is required"],
  },
  motherMobNo: {
    type: String,
    required: [true, "Mother's mobile number is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
});

// Name schema
const NameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, "Last name is required"] },
});

// Student schema
const StudentSchema = new Schema<Student>({
  id: { type: String, required: [true, "ID is required"], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, " user ID is required"],
    unique: true,
    ref: "UserModel",
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    required: [true, " admissionSemester ID is required"],

    ref: "Semester",   // ref should be collection  name not be  Model name 
  },
  academicDepartment : {
    type: Schema.Types.ObjectId,
    required: [true, " admissionSemester ID is required"],

    ref: "AcademicDepartment",  // ref should be collection  name not be  Model name 
  },
  name: {
    type: NameSchema,
    required: [true, "Name is required"],
  },
  age: { type: Number, required: [true, "Age is required"] },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["female", "male", "other"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Gender is required"],
  },
  address: {
    required: [true, "Address is required"],
    type: AddressSchema,
  },
  profileImg: { type: String, required: [true, "Profile image is required"] },
  guardian: {
    type: GuardianSchema,
    required: [true, "Guardian information is required"],
  },
  blood: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: [true, "Blood type is required"],
  },
  dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  isActive: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  isDelete: { type: Boolean, default: false },
});

// find  middleware
StudentSchema.pre("find", async function (next: Function) {
  this.find({ isDelete: { $ne: true } });
  next();
});
// find one middleWare
StudentSchema.pre("findOne", async function (next: Function) {
  this.find({ isDelete: { $ne: true } });
  next();
});

StudentSchema.pre("aggregate", async function (next: Function) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});
const StudentModel = model<Student>("Student", StudentSchema);
export default StudentModel;
