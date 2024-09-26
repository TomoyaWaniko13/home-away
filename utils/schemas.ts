// 67. Zod Library

import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
});
