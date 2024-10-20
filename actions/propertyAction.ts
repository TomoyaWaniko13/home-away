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
// 現在のユーザーの rentals の情報を取得します。
export const fetchRentals = async () => {
  const user = await getAuthUser();

  // ユーザーの所有する物件（レンタル）を取得します。
  const rentals: { id: string; name: string; price: number }[] = await db.property.findMany({
    where: { profileId: user.id },
    select: { id: true, name: true, price: true },
  });

  // Promise.all() は、複数の非同期操作を並行して実行し、すべての操作が完了するのを待ちます。
  const rentalsWithBookingsSum = await Promise.all(
    // 各レンタル物件（rental）に対して非同期の処理を行います。
    rentals.map(async (rental) => {
      // この処理は、特定の物件（propertyId: rental.id）に関連するすべての予約の totalNights フィールドの合計を計算します。
      // aggregate と _sum を使用して、データベースレベルで効率的に合計を計算しています。
      const totalNightSum = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: { totalNights: true },
      });

      // 同様に、特定の物件に関連するすべての予約の orderTotal フィールドの合計を計算します。
      const orderTotal = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: { orderTotal: true },
      });

      // スプレッド演算子 ...rental を使用して、元のレンタル物件情報をコピーします。
      // totalNightSum と orderTotalSum プロパティを追加し、それぞれ集計結果を割り当てます。
      // _sum.totalNights と _sum.orderTotal は、集計結果のオブジェクト構造を反映しています。
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
      // TODO なぜ id: propertyId と profileId: user.id のどちらも必要なのか?
      where: { id: propertyId, profileId: user.id },
    });

    revalidatePath('/rentals');
    return { message: 'Rental deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

// 153. Fetch Rental Details Function
export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthUser();

  return db.property.findUnique({
    // TODO なぜ id: propertyId と profileId: user.id のどちらも必要なのか?
    where: { id: propertyId, profileId: user.id },
  });
};

// 153. Fetch Rental Details Function
export const updatePropertyAction = async () => {
  return { message: 'update property action' };
};

// 153. Fetch Rental Details Function
export const updatePropertyImageAction = async () => {
  return { message: 'update property image' };
};
