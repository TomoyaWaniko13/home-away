'use server';

// 65. FormContainer Component
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
export type formSubmitAction = (prevState: any, formData: FormData) => Promise<{ message: string }>;
