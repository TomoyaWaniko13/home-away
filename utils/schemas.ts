import { z } from "zod";

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
