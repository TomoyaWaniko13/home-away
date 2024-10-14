import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 77. Update Profile Page
export const renderError = (error: unknown): { message: string } => {
  console.log(error);
  const errorMessage = error instanceof Error ? error.message : 'An error occurred';
  return { message: errorMessage };
};
