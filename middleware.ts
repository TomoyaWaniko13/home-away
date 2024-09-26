import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 59. Setup and Customize Clerk Auth Provider
// https://clerk.com/docs/references/nextjs/clerk-middleware

const isProtectedRoute = createRouteMatcher([
  "/bookings(.*)",
  "/checkout(.*)",
  "/favorites(.*)",
  "/profile(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
