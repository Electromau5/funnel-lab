// Projects: one workspace holds up to three, one market segment each, all for
// the same product. Sample data for the prototype (no database yet).

export type ProjectId = "property-managers" | "funded-startups";

export type Project = {
  id: ProjectId;
  name: string;
  segment: string;
  inbox: string;
  status: string;
};

export const PROJECTS: Project[] = [
  {
    id: "property-managers",
    name: "Property managers",
    segment: "Owners and COOs at US property management companies, 20 to 150 employees",
    inbox: "hello@try-artemisdesignlabs.com (sample)",
    status: "Testing",
  },
  {
    id: "funded-startups",
    name: "Funded B2B startups",
    segment: "COOs at enterprise B2B startups, 15 to 60 employees, Seed to Series A",
    inbox: "team@get-artemisdesignlabs.com (sample)",
    status: "Testing",
  },
];

export const PLAN_PROJECT_LIMIT = 3;

// Cookie that remembers the project picked in the switcher.
export const PROJECT_COOKIE = "fl-project";

// Screens that combine every project. The switcher reads "All projects" there,
// and picking a project filters the list through ?project=.
export const COMBINED_PATHS = ["/today", "/approvals", "/replies"];

export function isProjectId(value: unknown): value is ProjectId {
  return PROJECTS.some((p) => p.id === value);
}

export function getProject(id: ProjectId): Project {
  return PROJECTS.find((p) => p.id === id) ?? PROJECTS[0];
}

/** The ?project= filter on a combined screen, or null for All projects. */
export function projectFilter(value: string | string[] | undefined): ProjectId | null {
  return isProjectId(value) ? value : null;
}
