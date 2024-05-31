import { z } from "zod";

// Define the Zod schema for the user
const UserSchemaZod = z.object({
  id: z.string().nonempty("User ID is required."),
  password: z.string().nonempty("Password is required."),
  needsPasswordChange: z.boolean().optional().default(false),
  status: z.number().optional().default(0),
  role: z
    .enum(["student", "faculty", "admin"])
    .refine((role) => ["student", "faculty", "admin"].includes(role), {
      message: 'Role must be either "student", "faculty", or "admin".',
    }),
    isDeleted: z.boolean().optional().default(false)
});

export default UserSchemaZod;
