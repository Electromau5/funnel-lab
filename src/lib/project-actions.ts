"use server";

import { cookies } from "next/headers";
import { isProjectId, PROJECT_COOKIE } from "@/lib/projects";

// Saves the project picked in the switcher.
export async function setCurrentProject(id: string) {
  if (!isProjectId(id)) return;
  (await cookies()).set(PROJECT_COOKIE, id, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}
