import { z } from "zod";

// Address validation schema
const AddressSchema = z.object({
  currentAddress: z
    .string()
    .nonempty({ message: "Current address is required" }),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required" }),
  zip: z.number().positive({ message: "ZIP code is required" }),
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
const StudentSchema = z.object({
  id: z.string().nonempty({ message: "ID is required" }),
  name: NameSchema,
  age: z.number().positive({ message: "Age is required" }),
  password: z.string().nonempty({ message: "password is required" }),
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
  dateOfBirth: z
    .string()
    .nonempty({ message: "Date of birth is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date of birth must be a valid date",
    }),
  contactNo: z.string().nonempty({ message: "Contact number is required" }),
  isActive: z.enum(["active", "inactive"]).default("active"),
});

export default StudentSchema;
