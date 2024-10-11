'use server';

import db from '@/utils/db';
import { createClerkClient, currentUser } from '@clerk/nextjs/server';
import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from '@/utils/schemas';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/utils/supabase';

// 73. Create Profile Model and createProfileAction
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// 76. Fetch User Profile
// 現在のユーザーが、ログインしているかどうかと、profile をすでに提供しているかを確認します。
const getAuthUser = async () => {
  // https://clerk.com/docs/references/nextjs/current-user
  // The currentUser helper returns the Backend User object of the currently active user.
  // It can be used in Server Components, Route Handlers, and Server Actions.
  const user = await currentUser();

  if (!user) throw new Error('You must be logged in to access this route');

  // https://clerk.com/docs/users/metadata#private-metadata
  // Private metadata is only accessible by the backend, which makes
  // this useful for storing sensitive data that you don't want to expose to the frontend.
  // For example, you could store a user's Stripe customer ID.
  if (!user.privateMetadata.hasProfile) redirect('/profile/create');

  return user;
};

// 77. Update Profile Page
const renderError = (error: unknown): { message: string } => {
  console.log(error);
  const errorMessage = error instanceof Error ? error.message : 'An error occurred';
  return { message: errorMessage };
};

// 67. Zod Library
// 73. Create Profile Model and createProfileAction

// form の submit の時に実行される server action です。
export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    // The currentUser helper returns the Backend User object of the currently active user.
    // https://clerk.com/docs/references/nextjs/current-user
    const user = await currentUser();

    if (!user) throw new Error('Please login to create a profile');

    const fields = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, fields);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });

    // updateUserMetadata() について:
    // https://clerk.com/docs/references/backend/user/update-user-metadata

    // https://clerk.com/docs/users/metadata#private-metadata
    // Private metadata is only accessible by the backend, which makes
    // this useful for storing sensitive data that you don't want to expose to the frontend.
    // For example, you could store a user's Stripe customer ID.
    await clerkClient.users.updateUserMetadata(user.id, { privateMetadata: { hasProfile: true } });
    //
  } catch (error) {
    renderError(error);
  }

  redirect('/');
};

// 74. Fetch Profile Image Action
export const fetchProfileImage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
    select: { profileImage: true },
  });

  return profile?.profileImage;
};

// 76. Fetch User Profile
export const fetchProfile = async () => {
  const user = await getAuthUser();

  // profile 情報全てを取得します。
  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
  });

  // Prisma の CRUD は null になる可能性があります。
  // const profile の上をホバーすればわかります。
  if (!profile) redirect('/profile/create');

  // profile 情報全てを return します。
  return profile;
};

// 76. Fetch User Profile
// 78. Zod SafeParse Method
// 79. ValidateWithZodSchema - Helper Function

// form の submit の時に実行される server action です。
export const updateProfileAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    // The Object.fromEntries() static method transforms
    // a list of key-value pairs into an object.
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: { clerkId: user.id },
      data: validatedFields,
    });

    // https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    revalidatePath('/profile');

    return { message: 'Profile updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

// 81. Image Input Container
// 82. Image Zod Validation
// 85. Update Profile Image Action - Complete

export const updateProfileImageAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });

    // 画像ファイルをSupabaseのストレージにアップロードし、その公開URLを取得します。
    const fullPath: string = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: { clerkId: user.id },
      data: { profileImage: fullPath },
    });

    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

// 87. Create Property Page - Setup
// 94. Create Property
export const createPropertyAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;
    console.log(rawData);
    console.log(file);

    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });

    // 画像ファイルをSupabaseのストレージにアップロードし、その公開URLを返します。
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });
    //
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

// 95. Fetch Properties
export const fetchProperties = async ({ search = '', category }: { search?: string; category?: string }) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [{ name: { contains: search, mode: 'insensitive' } }, { tagline: { contains: search, mode: 'insensitive' } }],
    },
    select: {
      id: true,
      name: true,
      image: true,
      tagline: true,
      country: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return properties;
};
