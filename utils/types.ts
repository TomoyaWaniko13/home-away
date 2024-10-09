// 65. FormContainer Component

export type formSubmitAction = (prevState: any, formData: FormData) => Promise<{ message: string }>;
