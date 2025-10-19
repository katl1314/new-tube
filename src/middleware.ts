import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 보호할 경로를 지정함. (.*)를 추가하면 해당 경로의 하위도 보호된다.
const isProtectedRoute = createRouteMatcher(['/protected(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
