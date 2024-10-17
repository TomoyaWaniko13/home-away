'use server';

// prevState を引数として取ります:
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
import db from '@/utils/db';
import { getAuthUser } from '@/actions/profileAction';
import { imageSchema, propertySchema, validateWithZodSchema } from '@/utils/schemas';
import { uploadImage } from '@/utils/supabase';
import { renderError } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const createPropertyAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;

    const validatedFields = validateWithZodSchema(propertySchema, rawData);

    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    // uploadImage()は画像ファイルをSupabaseのストレージにアップロードし、その公開URLをreturnします。
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: { ...validatedFields, image: fullPath, profileId: user.id },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

// 95. Fetch Properties
export const fetchProperties = async ({ searchQuery = '', categoryQuery }: { searchQuery?: string; categoryQuery?: string }) => {
  return db.property.findMany({
    where: {
      category: categoryQuery,
      OR: [{ name: { contains: searchQuery, mode: 'insensitive' } }, { tagline: { contains: searchQuery, mode: 'insensitive' } }],
    },
    // <PropertiesList/> component に必要なフィールドを取得します。
    select: { id: true, name: true, image: true, tagline: true, country: true, price: true },
    orderBy: { createdAt: 'desc' },
  });
};

// 112. Property Details Page - Setup
// 138. Booking Components
// Property の id を使って、 Property,Profile,Booking の情報を取得します。
export const fetchPropertyDetails = async (id: string) => {
  return db.property.findUnique({
    where: { id },
    include: {
      profile: true,
      bookings: { select: { checkIn: true, checkOut: true } },
    },
  });
};
