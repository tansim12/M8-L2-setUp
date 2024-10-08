import { z } from "zod";

// Address validation schema
const AddressSchema = z.object({
  currentAddress: z
    .string()
    .nonempty({ message: "Current address is required" }),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required" }),
  zip: z.string().nonempty({ message: "ZIP code must be a positive number" }),
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
const CreateStudentSchemaZod = z.object({
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
      profileImg: z
        .string()
        .nonempty({ message: "Profile image is required" })
        .optional(),
      guardian: GuardianSchema,
      blood: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Blood type is required",
      }),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().nonempty({ message: "Contact number is required" }),
      isActive: z.enum(["active", "inactive"]).default("active"),
      isDelete: z.boolean().default(false),
    }),
  }),
});

// update section

const UpdateAddressSchema = z.object({
  currentAddress: z
    .string()
    .nonempty({ message: "Current address is required" })
    .optional(),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required" })
    .optional(),
  zip: z
    .string()
    .nonempty({ message: "ZIP code must be a positive number" })
    .optional(),
  district: z.string().nonempty({ message: "District is required" }).optional(),
});

const UpdateGuardianSchema = z.object({
  fatherName: z
    .string()
    .nonempty({ message: "Father's name is required" })
    .optional(),
  motherName: z
    .string()
    .nonempty({ message: "Mother's name is required" })
    .optional(),
  fatherMobNo: z
    .string()
    .nonempty({ message: "Father's mobile number is required" })
    .optional(),
  motherMobNo: z
    .string()
    .nonempty({ message: "Mother's mobile number is required" })
    .optional(),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" })
    .optional(),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required" })
    .optional(),
});

const UpdateNameSchema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" })
    .nonempty({ message: "First name is required" })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required" })
    .optional(),
});

const UpdateStudentSchemaZod = z.object({
  body: z
    .object({
      // student
      student: z
        .object({
          name: UpdateNameSchema,
          age: z
            .number()
            .int()
            .positive({ message: "Age must be a positive integer" })
            .optional(),
          email: z
            .string()
            .email({ message: "Email must be a valid email" })
            .nonempty({ message: "Email is required" })
            .optional(),
          gender: z
            .enum(["female", "male", "other"], {
              message: "Gender is required",
            })
            .optional(),
          address: UpdateAddressSchema,
          // profileImg: z
          //   .string()
          //   .nonempty({ message: "Profile image is required" })
          //   .optional(),
          guardian: UpdateGuardianSchema,
          blood: z
            .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
              message: "Blood type is required",
            })
            .optional(),
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
          dateOfBirth: z.string().optional(),
          contactNo: z
            .string()
            .nonempty({ message: "Contact number is required" })
            .optional(),
          isActive: z.enum(["active", "inactive"]).default("active").optional(),
          isDelete: z.boolean().default(false).optional(),
        })
        .optional(),
    })
    .optional(),
});

export const studentSchemaZod = {
  CreateStudentSchemaZod,
  UpdateStudentSchemaZod,
};
