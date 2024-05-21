import { Schema, model, connect } from "mongoose";
import { Address, Guardian, Name, Student,} from "./Student.interface";

// address schema
const AddressSchema = new Schema<Address>({
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  zip: { type: Number, required: true },
  district: { type: String, required: true },
});

// address schema
const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherMobNo: { type: String, required: true },
  motherMobNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const NameSchema = new Schema<Name>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const StudentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: NameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  gender: ["female", "male"],
  address: AddressSchema,
  profileImg: { type: String, required: true },
  guardian: GuardianSchema,
  blood: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const StudentModel = model<Student>("Student",StudentSchema )
export default StudentModel