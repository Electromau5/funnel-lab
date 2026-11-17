import { cookies } from "next/headers";
import { getProject, isProjectId, PROJECT_COOKIE, PROJECTS, type ProjectId } from "@/lib/projects";

// The project picked in the switcher, read from its cookie. Request-time data:
// call it inside a <Suspense> boundary.
export async function getCurrentProjectId(): Promise<ProjectId> {
  const value = (await cookies()).get(PROJECT_COOKIE)?.value;
  return isProjectId(value) ? value : PROJECTS[0].id;
}

export async function getCurrentProject() {
  return getProject(await getCurrentProjectId());
}
