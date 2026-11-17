"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { COFOUNDER_ROLE, isFounder } from "@/lib/roles";

export type InviteState = { ok?: boolean; error?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sends a Clerk organization invitation. The emailed link opens /signup with
// a ticket, which joins the workspace as cofounder.
export async function inviteCofounder(_prev: InviteState, formData: FormData): Promise<InviteState> {
  const { userId, orgId, orgRole } = await auth();
  if (!userId || !orgId || !isFounder(orgRole)) {
    return { error: "Only the founder can invite people." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return { error: "Enter a valid email address." };

  const rights = formData.getAll("rights").map(String);
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";

  try {
    const client = await clerkClient();
    await client.organizations.createOrganizationInvitation({
      organizationId: orgId,
      inviterUserId: userId,
      emailAddress: email,
      role: COFOUNDER_ROLE,
      redirectUrl: `${proto}://${host}/signup`,
      publicMetadata: { rights },
    });
  } catch (err) {
    const message = isClerkAPIResponseError(err)
      ? (err.errors[0]?.longMessage ?? err.errors[0]?.message)
      : undefined;
    return { error: message ?? "Could not send the invite. Try again." };
  }

  revalidatePath("/settings/team");
  return { ok: true };
}

export async function revokeInvite(invitationId: string) {
  const { userId, orgId, orgRole } = await auth();
  if (!userId || !orgId || !isFounder(orgRole)) return;
  const client = await clerkClient();
  await client.organizations.revokeOrganizationInvitation({
    organizationId: orgId,
    invitationId,
    requestingUserId: userId,
  });
  revalidatePath("/settings/team");
}
