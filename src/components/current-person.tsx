"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { roleLabel } from "@/lib/roles";

// Signed-in person in the top bar (6:44). The avatar opens Clerk's account
// menu (profile, sign out).
export function CurrentPerson({ compact = false }: { compact?: boolean }) {
  const { user } = useUser();
  const { orgRole } = useAuth();
  const name = user?.fullName || user?.primaryEmailAddress?.emailAddress || "";

  const avatar = (
    <span className="flex size-8 items-center justify-center rounded-full bg-chip">
      <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
    </span>
  );

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-ink">{name}</span>
        {avatar}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      {avatar}
      <span className="flex flex-col">
        <span className="text-[13px] font-semibold text-ink">{name}</span>
        <span className="text-[12px] text-muted">{roleLabel(orgRole)}</span>
      </span>
    </div>
  );
}
