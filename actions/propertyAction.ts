'use server';

// prevState を引数として取ります:
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
import db from '@/utils/db';
import { getAuthUser } from '@/actions/profileAction';
import { imageSchema, propertySchema, validateWithZodSchema } from '@/utils/schemas';
import { uploadImage } from '@/utils/supabase';
import { renderError } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
    include: { profile: true, bookings: { select: { checkIn: true, checkOut: true } } },
  });
};

// 151. Fetch and Delete Rentals Functions
export const fetchRentals = async () => {
  const user = await getAuthUser();

  const rentals = await db.property.findMany({
    where: { profileId: user.id },
    select: { id: true, name: true, price: true },
  });

  const rentalsWithBookingsSum = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightSum = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: { totalNights: true },
      });

      const orderTotal = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: { orderTotal: true },
      });

      return { ...rental, totalNightSum: totalNightSum._sum.totalNights, orderTotalSum: orderTotal._sum.orderTotal };
    }),
  );

  return rentalsWithBookingsSum;
};

// 151. Fetch and Delete Rentals Functions
export const deleteRentalAction = async (prevState: { propertyId: string }) => {
  const { propertyId } = prevState;
  const user = await getAuthUser();

  try {
    await db.property.delete({
      // TODO なぜ  id: propertyId と profileId: user.id のどちらも必要なのか?
      where: { id: propertyId, profileId: user.id },
    });

    revalidatePath('/rentals');
    return { message: 'Rental deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};
