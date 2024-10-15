// 73. Create Profile Model and createProfileAction
import { imageSchema, profileSchema, validateWithZodSchema } from '@/utils/schemas';
import { uploadImage } from '@/utils/supabase';
import db from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { renderError } from '@/lib/utils';
import { createClerkClient, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// 76. Fetch User Profile
// 現在のユーザーが、ログインしているかどうかと、profile をすでに提供しているかを確認します。
export const getAuthUser = async () => {
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

// form の submit の時に実行される server action です。
// prevState を引数として取ります:
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
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

  // Prisma の CRUD は null になる可能性があります。const profile の上をホバーすればわかります。
  if (!profile) redirect('/profile/create');

  // profile 情報全てを return します。
  return profile;
};

// form の submit の時に実行される server action です。
// prevState を引数として取ります:
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
export const updateProfileAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    // The Object.fromEntries() static method transforms a list of key-value pairs into an object.
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

// prevState を引数として取ります:
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
export const updateProfileImageAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const image: File = formData.get('image') as File;
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
