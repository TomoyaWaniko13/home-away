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
      profile: { select: { firstName: true, profileImage: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return reviews;
};

// 124. Reviews Model
export const fetchPropertyReviewsByUser = async () => {
  return { message: 'fetch user reviews' };
};

// 124. Reviews Model
export const deleteReviewAction = async () => {
  return { message: 'delete reviews' };
};
