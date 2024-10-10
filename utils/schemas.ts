import { z, ZodSchema } from 'zod';

// 67. Zod Library
// 78. Zod SafeParse Method
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: 'first name must be at least 2 character' }),
  lastName: z.string().min(2, { message: 'last name must be at least 2 characters' }),
  username: z.string().min(2, { message: 'username must be at least 2 characters' }),
});

// 79. ValidateWithZodSchema - Helper Function
export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors: string[] = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }

  return result.data;
}

// 82. Image Zod Validation
export const imageSchema = z.object({
  image: validateFile(),
});

// 82. Image Zod Validation
function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/'];

  return (
    z
      // The File interface provides information about files.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fi
      .instanceof(File)
      // .size は File オブジェクトのプロパティの一つです。
      .refine((file) => {
        return !file || file.size <= maxUploadSize;
      }, 'File size must be less than 1 MB')
      .refine((file) => {
        // ファイルのタイプが acceptedFileTypes のいずれかに一致すれば true となります。
        // .type は File オブジェクトのプロパティの一つです。
        return !file || acceptedFileTypes.some((acceptedFileType) => file.type.startsWith(acceptedFileType));
      }, 'File must be an image')
  );
}

// 87. Create Property Page - Setup
// 94. Create Property
export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  tagline: z
    .string()
    .min(2, {
      message: 'tagline must be at least 2 characters.',
    })
    .max(100, {
      message: 'tagline must be less than 100 characters.',
    }),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: 'description must be between 10 and 1000 words.',
    },
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: 'guest amount must be a positive number.',
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: 'bedrooms amount must be a positive number.',
  }),
  beds: z.coerce.number().int().min(0, {
    message: 'beds amount must be a positive number.',
  }),
  baths: z.coerce.number().int().min(0, {
    message: 'bahts amount must be a positive number.',
  }),
  amenities: z.string(),
});
