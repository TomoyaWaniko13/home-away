import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Create a middleware.ts file at the root of your project

// 59. Setup and Customize Clerk Auth Provider
// https://clerk.com/docs/references/nextjs/clerk-middleware

const isProtectedRoute = createRouteMatcher([
  '/bookings(.*)',
  '/checkout(.*)',
  '/favorites(.*)',
  '/profile(.*)',
  '/rentals(.*)',
  '/reviews(.*)',
]);

// By default, clerkMiddleware will not protect any routes.
// All routes are public and you must opt-in to protection for routes.
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
