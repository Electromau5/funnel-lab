import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isFounder } from "@/lib/roles";

const isPublicRoute = createRouteMatcher(["/", "/signup(.*)", "/sign-in(.*)"]);
// Setup, the plan and the team are founder-only (Today (cofounder), 6:109).
const isFounderRoute = createRouteMatcher(["/setup(.*)", "/settings(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId, orgId, orgRole, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn({ returnBackUrl: req.url });

  // Signed in but no active workspace yet: finish sign up.
  if (!orgId) return NextResponse.redirect(new URL("/signup", req.url));

  if (isFounderRoute(req) && !isFounder(orgRole)) {
    return NextResponse.redirect(new URL("/today", req.url));
  }
}, { signInUrl: "/sign-in", signUpUrl: "/signup" });

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
