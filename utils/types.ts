// 65. FormContainer Component
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling

export type actionFunction = (prevState: any, formData: FormData) => Promise<{ message: string }>;

// 99. Properties Container
export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};

// 138. Booking Components
export type DateRangeSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

// 138. Booking Components
export type Booking = {
  checkIn: Date;
  checkOut: Date;
};
