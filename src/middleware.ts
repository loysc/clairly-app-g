import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const publicRoutes = ["/sign-in", "/sign-up", "/onboarding/role"];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  console.log(`[Middleware] Path: ${req.nextUrl.pathname}`);
  console.log(`[Middleware] userId: ${userId}`);
  console.log(
    `[Middleware] sessionClaims?.metadata?.role: ${
      (sessionClaims?.metadata as { role?: string })?.role
    }`
  );

  // Case 1: User is authenticated
  if (userId) {
    let userRole = (sessionClaims?.metadata as { role?: string })?.role;

    // If role is missing from sessionClaims, fetch user metadata directly
    if (!userRole) {
      console.log(
        "[Middleware] Role missing from sessionClaims, fetching from clerkClient..."
      );
      try {
        const client = await clerkClient(); // Call clerkClient to get the instance
        const user = await client.users.getUser(userId);
        userRole = user.publicMetadata.role as string;
        console.log(
          `[Middleware] Fetched userRole from clerkClient: ${userRole}`
        );
      } catch (error) {
        console.error("Error fetching user metadata in middleware:", error);
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }

    // If user has no role and is not on the role selection page, redirect to role selection
    if (!userRole && req.nextUrl.pathname !== "/onboarding/role") {
      console.log(
        "[Middleware] User has no role, redirecting to /onboarding/role"
      );
      const roleSelection = new URL("/onboarding/role", req.url);
      return NextResponse.redirect(roleSelection);
    }
    // If user has a role, or is already on the role selection page, allow access
    console.log(
      "[Middleware] User has role or is on role page, allowing access."
    );
    return NextResponse.next();
  }

  // Case 2: User is not authenticated
  // If trying to access a protected route, redirect to sign-in
  if (!isPublicRoute) {
    console.log("[Middleware] User not authenticated, redirecting to sign-in.");
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Case 3: User is not authenticated and trying to access a public route, allow access
  console.log("[Middleware] User not authenticated, accessing public route.");
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
