// 67. Zod Library
// 73. Create Profile Model and createProfileAction

"use server";

import db from "@/utils/db";
import { createClerkClient, currentUser } from "@clerk/nextjs/server";
import { profileSchema } from "@/utils/schemas";
import { redirect } from "next/navigation";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

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

export const fetchProfileImage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
    select: { profileImage: true },
  });

  return profile?.profileImage;
};
