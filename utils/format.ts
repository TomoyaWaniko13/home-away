// 101. PropertyCard - Structure

export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// 117. Property Details Component
export const formatQuantity = (quantity: number, noun: string): string => {
  return quantity === 1 ? `${quantity} ${noun}` : `${quantity} ${noun}s`;
};

// 148. Bookings Page
// 164. Admin Page - Fetch Chart Data
export const formatDate = (date: Date, onlyMonth?: boolean): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };

  if (!onlyMonth) options.day = 'numeric';

  return new Intl.DateTimeFormat('en-US', options).format(date);
};
