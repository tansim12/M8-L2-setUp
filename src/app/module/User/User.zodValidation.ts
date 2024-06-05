import { z } from "zod";

// Define the Zod schema for the user
const UserSchemaZod = z.object({

  password: z.string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(20, 'Password cannot be longer than 20 characters.')
    .nonempty('Password is required.'),

});

export default UserSchemaZod;
