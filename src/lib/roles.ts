// Clerk organization roles: the workspace creator is the founder (org:admin),
// an invited cofounder joins as org:member.
export const FOUNDER_ROLE = "org:admin";
export const COFOUNDER_ROLE = "org:member";

export function roleLabel(role: string | null | undefined) {
  if (role === FOUNDER_ROLE) return "Founder";
  if (role === COFOUNDER_ROLE) return "Cofounder";
  return "";
}

export function isFounder(role: string | null | undefined) {
  return role === FOUNDER_ROLE;
}
