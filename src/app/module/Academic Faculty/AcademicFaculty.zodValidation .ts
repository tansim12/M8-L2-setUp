import { z } from "zod";

// Define the Zod schema for the address
const CreateAddressSchemaZod = z.object({
  currentAddress: z
    .string()
    .nonempty({ message: "Current address is required" }),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required" }),
  district: z.string().nonempty({ message: "District is required" }),
  zip: z
    .number()
    .nonnegative({ message: "ZIP code must be a non-negative number" }),
});

// Define the Zod schema for the name
const CreateNameSchemaZod = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  middleName: z.string().optional(),
});

// Define the Zod schema for the academic faculty
const CreateAcademicFacultySchemaZod = z.object({
  body: z.object({
    faculty: z.object({
      name: CreateNameSchemaZod,
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
      designation: z.string().nonempty({ message: "Designation is required" }),
      age: z
        .number()
        .int()
        .positive({ message: "Age must be a positive integer" }),
      user: z.string().optional(), // ObjectId will be a string here
      academicDepartment: z.string().optional(), // ObjectId will be a string here
      gender: z.enum(["male", "female", "other"], {
        message: "Gender must be 'male', 'female', or 'other'",
      }),
      dateOfBirth: z.string().optional(),
      blood: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Invalid blood group",
      }),
      address: CreateAddressSchemaZod,
      contactNo: z.string().nonempty({ message: "Contact number is required" }),
      profileImg: z.any().optional(),
      isDelete: z.boolean().default(false),
    }),
  }),
});

// Define the Zod schema for the address (all fields optional)
const UpdateAddressSchemaZod = z.object({
  currentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  district: z.string().optional(),
  zip: z.number().nonnegative().optional(),
});

// Define the Zod schema for the name (all fields optional)
const UpdateNameSchemaZod = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
});

// Define the Zod schema for the academic faculty (all fields optional)
const UpdateAcademicFacultySchemaZod = z.object({
  body: z.object({
    faculty: z.object({
      name: UpdateNameSchemaZod,
      email: z.string().email({ message: "Invalid email address" }),
      designation: z.string().optional(),
      age: z
        .number()
        .int()
        .positive({ message: "Age must be a positive integer" })
        .optional(),
      user: z.string().optional(), // ObjectId will be a string here
      academicDepartment: z.string().optional(), // ObjectId will be a string here
      gender: z
        .enum(["male", "female", "other"], {
          message: "Gender must be 'male', 'female', or 'other'",
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      blood: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
          message: "Invalid blood group",
        })
        .optional(),
      address: UpdateAddressSchemaZod.optional(),
      contactNo: z.string().optional(),
      profileImg: z.any().optional(),
      isDelete: z.boolean().optional(),
    }),
  }),
});

export const AcademicZodValidationSchema = {
  CreateAcademicFacultySchemaZod,
  UpdateAcademicFacultySchemaZod,
};
