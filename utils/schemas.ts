import { z, ZodSchema } from "zod";

// 67. Zod Library
// 78. Zod SafeParse Method

export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: "first name must be at least 2 character",
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters",
  }),
  username: z.string().min(2, {
    message: "username must be at least 2 characters",
  }),
});

// 79. ValidateWithZodSchema - Helper Function

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown,
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors: string[] = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }

  return result.data;
}
