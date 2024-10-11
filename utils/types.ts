// 65. FormContainer Component
export type formSubmitAction = (prevState: any, formData: FormData) => Promise<{ message: string }>;

// 99. Properties Container
export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};
