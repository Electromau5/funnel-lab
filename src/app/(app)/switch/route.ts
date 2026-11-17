import { NextResponse, type NextRequest } from "next/server";
import { isProjectId, PROJECT_COOKIE } from "@/lib/projects";

// GET /switch?project=<id>&to=<path>: picks the project, then opens the page.
// Used by items on the combined screens that open a per-project page.
// Link to it with a plain <a> (no prefetch), since it changes the project.
export function GET(request: NextRequest) {
  const project = request.nextUrl.searchParams.get("project");
  const to = request.nextUrl.searchParams.get("to") ?? "/today";
  const safeTo = to.startsWith("/") && !to.startsWith("//") ? to : "/today";
  const response = NextResponse.redirect(new URL(safeTo, request.url));
  if (isProjectId(project)) {
    response.cookies.set(PROJECT_COOKIE, project, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}
