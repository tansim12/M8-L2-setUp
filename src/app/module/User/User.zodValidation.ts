import { z } from "zod";

// Define the Zod schema for the user
const UserSchemaZod = z.object({
  id: z.string().nonempty("User ID is required."),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(20, 'Password cannot be longer than 20 characters.')
    .nonempty('Password is required.'),
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
