import { z } from "zod";

const loginValidationSchemaZod = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const changePasswordValidationSchemaZod = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchemaZod = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

export const AuthZodValidation = {
  loginValidationSchemaZod,
  changePasswordValidationSchemaZod,
  refreshTokenValidationSchemaZod,
};
