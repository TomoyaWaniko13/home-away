"use server";

import db from "@/utils/db";
import { createClerkClient, currentUser } from "@clerk/nextjs/server";
import { profileSchema } from "@/utils/schemas";
import { redirect } from "next/navigation";

// 73. Create Profile Model and createProfileAction

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// 76. Fetch User Profile
const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this route");

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

// 67. Zod Library
// 73. Create Profile Model and createProfileAction

// form の submit の時に実行される server action です。
export const createProfileAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    // currentUser() について:
    // https://clerk.com/docs/references/nextjs/current-user
    const user = await currentUser();

    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });

    console.log(validatedFields);
    // { firstName: 'TOMOYA', lastName: 'WANIKO', username: 'alligatorfree' }

    // updateUserMetadata() について:
    // https://clerk.com/docs/references/backend/user/update-user-metadata
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: { hasProfile: true },
    });
  } catch (error) {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }

  redirect("/");
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

  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
  });

  if (!profile) redirect("/profile/create");
};

// 76. Fetch User Profile
export const updateProfileAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  return { message: "update profile action" };
};
