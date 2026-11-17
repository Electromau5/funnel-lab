import { Suspense, type ReactNode } from "react";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { InviteForm } from "@/components/settings/invite-form";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { Card, PageHeader, Tag } from "@/components/ui";
import { FOUNDER_ROLE, roleLabel } from "@/lib/roles";
import { revokeInvite } from "./actions";

const CAN_DO: Record<string, string> = {
  Founder: "Everything: intake, ICP, offers, tests, batches, replies, team and plan",
  Cofounder: "Review and hold batches, answer replies, read threads and offers",
};

type Row = { key: string; name: string; role: string; status: ReactNode };

// Figma: Team (11:644)
export default function TeamPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TeamPageContent />
    </Suspense>
  );
}

async function TeamPageContent() {
  const { orgId } = await auth();
  const client = await clerkClient();
  const [memberships, invitations] = await Promise.all([
    client.organizations.getOrganizationMembershipList({ organizationId: orgId! }),
    client.organizations.getOrganizationInvitationList({
      organizationId: orgId!,
      status: ["pending"],
    }),
  ]);

  const rows: Row[] = [
    ...memberships.data.map((m) => {
      const u = m.publicUserData;
      const name = [u?.firstName, u?.lastName].filter(Boolean).join(" ") || u?.identifier || "";
      return {
        key: m.id,
        name,
        role: roleLabel(m.role),
        status: <Tag tone="accent">Active</Tag>,
      };
    }),
    ...invitations.data.map((i) => ({
      key: i.id,
      name: i.emailAddress,
      role: roleLabel(i.role),
      status: (
        <div className="flex items-center gap-2">
          <Tag>Invite sent</Tag>
          <form action={revokeInvite.bind(null, i.id)}>
            <button type="submit" className="text-[13px] font-medium text-accent hover:underline">
              Revoke
            </button>
          </form>
        </div>
      ),
    })),
  ].sort((a, b) => Number(b.role === roleLabel(FOUNDER_ROLE)) - Number(a.role === roleLabel(FOUNDER_ROLE)));

  // Plan seats: one founder and one cofounder.
  const seatTaken = rows.length >= 2;

  return (
    <Page crumb="Settings / Team">
      <SettingsTabs active="team" />
      <PageHeader
        title="Team"
        subtitle="Who can see and do what in this workspace. Seats for a founder and a cofounder are in the plan."
      />

      <div className="w-full overflow-hidden rounded-[8px] border border-line bg-white">
        <div className="flex w-full items-center gap-4 bg-canvas px-5 py-3 text-[12px] font-semibold text-muted max-md:hidden">
          <p className="w-[220px] shrink-0">Member</p>
          <p className="w-[140px] shrink-0">Role</p>
          <p className="min-w-0 flex-1">Can do</p>
          <p className="w-[160px] shrink-0">Status</p>
        </div>
        {rows.map((m) => (
          <div
            key={m.key}
            className="flex w-full items-center gap-4 border-t border-line px-5 py-3 text-[14px] max-md:flex-wrap max-md:gap-y-1.5 max-md:[&:nth-child(2)]:border-t-0"
          >
            <p className="w-[220px] shrink-0 truncate font-medium text-ink max-md:w-auto">{m.name}</p>
            <p className="w-[140px] shrink-0 text-ink-2 max-md:w-auto">{m.role}</p>
            <p className="min-w-0 flex-1 text-ink-2 max-md:order-last max-md:basis-full">
              {CAN_DO[m.role] ?? ""}
            </p>
            <div className="w-[160px] shrink-0 max-md:ml-auto max-md:w-auto">{m.status}</div>
          </div>
        ))}
      </div>

      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        {seatTaken ? (
          <Card className="flex min-w-0 flex-1 flex-col gap-2 p-6! max-lg:w-full">
            <p className="text-[16px] font-semibold text-ink">Both seats are in use</p>
            <p className="text-[14px] leading-5 text-ink-2">
              The plan has seats for a founder and a cofounder.
              {invitations.data.length > 0 && " Revoke the pending invite to invite someone else."}
            </p>
          </Card>
        ) : (
          <InviteForm />
        )}
        <Card className="flex w-[420px] shrink-0 flex-col gap-2 p-5! max-lg:w-full">
          <p className="text-[15px] font-semibold text-ink">When your cofounder cannot approve</p>
          <p className="text-[14px] leading-5 text-ink-2">
            With Approve batches off, your cofounder can hold a batch or edit a message. The batch
            then waits for you.
          </p>
        </Card>
      </div>
    </Page>
  );
}
