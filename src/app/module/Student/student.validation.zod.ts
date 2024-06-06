
import mongoose from "mongoose";
import { z } from "zod";

const ObjectId = mongoose.Types.ObjectId;

// Address validation schema
const AddressSchema = z.object({
  currentAddress: z
    .string()
    .nonempty({ message: "Current address is required" }),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required" }),
  zip: z.number().positive({ message: "ZIP code must be a positive number" }),
  district: z.string().nonempty({ message: "District is required" }),
});

// Guardian validation schema
const GuardianSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required" }),
  motherName: z.string().nonempty({ message: "Mother's name is required" }),
  fatherMobNo: z
    .string()
    .nonempty({ message: "Father's mobile number is required" }),
  motherMobNo: z
    .string()
    .nonempty({ message: "Mother's mobile number is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required" }),
});

// Name validation schema
const NameSchema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" })
    .nonempty({ message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

// Student validation schema
const StudentSchemaZod = z.object({
  body: z.object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password cannot be longer than 20 characters.")
      .nonempty("Password is required.")
      .optional(),

    // student
    student: z.object({
      name: NameSchema,
      age: z
        .number()
        .int()
        .positive({ message: "Age must be a positive integer" }),
      email: z
        .string()
        .email({ message: "Email must be a valid email" })
        .nonempty({ message: "Email is required" }),
      gender: z.enum(["female", "male", "other"], {
        message: "Gender is required",
      }),
      address: AddressSchema,
      profileImg: z.string().nonempty({ message: "Profile image is required" }),
      guardian: GuardianSchema,
      blood: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Blood type is required",
      }),
      admissionSemester:z.string().optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().nonempty({ message: "Contact number is required" }),
      isActive: z.enum(["active", "inactive"]).default("active"),
      isDelete: z.boolean().default(false),
    }),
  }),
});

export default StudentSchemaZod;
