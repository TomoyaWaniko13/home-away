// 67. Zod Library

"use server";

import { profileSchema } from "@/utils/schemas";

// form の submit の時に実行される server action です。
export const createProfileAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    // { firstName: 'TOMOYA', lastName: 'WANIKO', username: 'alligatorfree' }
    return { message: "profile created" };
  } catch (e) {
    console.log(e);
    return { message: "there was an error" };
  }
};
