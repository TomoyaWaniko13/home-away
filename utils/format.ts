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
