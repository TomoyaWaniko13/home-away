'use server';

import { getAuthUser } from '@/actions/profileAction';
import { renderError } from '@/lib/utils';
import { createReviewSchema, validateWithZodSchema } from '@/utils/schemas';
import db from '@/utils/db';
import { revalidatePath } from 'next/cache';

// 124. Reviews Model
// 127. SubmitReview Functionality
export const createReviewAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields: {
      propertyId: string;
      rating: number;
      comment: string;
    } = validateWithZodSchema(createReviewSchema, rawData);

    await db.review.create({ data: { ...validatedFields, profileId: user.id } });

    revalidatePath(`/properties/${validatedFields.propertyId}`);

    return { message: 'Review Submitted successfully' };
  } catch (e) {
    return renderError(e);
  }
};

// 124. Reviews Model
// 128. Fetch Reviews
// propertyId を元に、review を表示するのに必要な fields を return します。
export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    where: { propertyId },
    select: {
      id: true,
      rating: true,
      comment: true,
      // review を投稿した人の情報を select します。
      profile: { select: { firstName: true, profileImage: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return reviews;
};

// 124. Reviews Model
// 131. Fetch and Delete User Reviews
// 現在のユーザーのレビューを取得します。
export const fetchPropertyReviewsByUser = async () => {
  const user = await getAuthUser();

  const reviews = await db.review.findMany({
    where: { profileId: user.id },
    select: {
      id: true,
      rating: true,
      comment: true,
      // review に関連する property を select します。
      property: { select: { name: true, image: true } },
    },
  });

  return reviews;
};

// 124. Reviews Model
// 131. Fetch and Delete User Reviews
// 特定のレビューを削除します。
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      // TODO なぜ profileId: user.id が必要? id: reviewId だけでも良いのではないか?
      where: { id: reviewId, profileId: user.id },
    });

    revalidatePath('/reviews');
    return { message: 'Review deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};
