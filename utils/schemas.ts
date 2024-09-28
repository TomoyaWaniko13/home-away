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
        // some() メソッドは配列の各要素に対して与えられたコールバック関数を実行し、
        // 少なくとも1つの要素でコールバック関数が true を返せば、全体として true を返します。
        // .type は File オブジェクトのプロパティの一つです。
        return !file || acceptedFileTypes.some((type) => file.type.startsWith(type));
      }, 'File must be an image')
  );
}
