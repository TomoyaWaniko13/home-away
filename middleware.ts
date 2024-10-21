import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Create a middleware.ts file at the root of your project

// 59. Setup and Customize Clerk Auth Provider
// https://clerk.com/docs/references/nextjs/clerk-middleware

// 161. Admin Page - Middleware

const isPublicRoute: (req: NextRequest) => boolean = createRouteMatcher(['/', '/properties(.*)']);
const isAdminRoute: (req: NextRequest) => boolean = createRouteMatcher(['/admin(.*)']);

// By default, clerkMiddleware will not protect any routes.
// All routes are public and you must opt-in to protection for routes.
export default clerkMiddleware((auth, req) => {
  const isAdminUser = auth().userId === process.env.ADMIN_USRE_ID;

  if (isAdminRoute(req) && !isAdminUser) return NextResponse.redirect(new URL('/', req.url));

  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
