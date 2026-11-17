"use client";

import { SignUp, useAuth, useOrganizationList } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { embeddedAppearance } from "@/components/auth/embedded";
import { Button, Field, Tag } from "@/components/ui";

// Step 1: sign up with Google or an email code (Clerk).
// Step 2: name the company, which creates the workspace with you as founder.
// Invited cofounders arrive with a ticket, join the existing workspace and skip step 2.
export function SignUpSteps() {
  const { isLoaded, isSignedIn } = useAuth();
  const invited = useSearchParams().has("__clerk_ticket");

  if (!isLoaded) return <div className="h-64 w-full" />;

  if (!isSignedIn) {
    return (
      <>
        {invited ? (
          <>
            <Tag>Invite</Tag>
            <h1 className="text-[22px] font-bold text-ink">Join your cofounder&apos;s workspace</h1>
            <p className="text-[14px] leading-5 text-ink-2">
              You were invited as cofounder. Sign up with the email the invite was sent to.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-[22px] font-bold text-ink">Create your workspace</h1>
            <p className="text-[14px] text-ink-2">Sign in with Google, then name your company.</p>
          </>
        )}
        <SignUp appearance={embeddedAppearance} />
        <Note invited={invited} />
      </>
    );
  }

  return <WorkspaceStep />;
}

function WorkspaceStep() {
  const router = useRouter();
  const { isLoaded, createOrganization, setActive, userMemberships } = useOrganizationList({
    userMemberships: true,
  });
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const existing = userMemberships.data?.[0]?.organization.id;

  // Already in a workspace (returning founder, or a cofounder who just
  // accepted an invite): open it.
  useEffect(() => {
    if (!isLoaded || !existing) return;
    setActive({ organization: existing }).then(() => router.replace("/today"));
  }, [isLoaded, existing, setActive, router]);

  if (!isLoaded || userMemberships.isLoading || existing) {
    return <p className="text-[14px] text-ink-2">Opening your workspace…</p>;
  }

  return (
    <form
      className="flex w-full flex-col items-start gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const name = company.trim();
        if (!name) return setError("Enter your company name.");
        setBusy(true);
        setError("");
        try {
          const org = await createOrganization({ name });
          await setActive({ organization: org.id });
          router.replace("/today");
        } catch {
          setError("Could not create the workspace. Try again.");
          setBusy(false);
        }
      }}
    >
      <h1 className="text-[22px] font-bold text-ink">Create your workspace</h1>
      <p className="text-[14px] text-ink-2">Name your company. You can invite your cofounder next.</p>
      <Field
        label="Company name"
        name="company"
        placeholder="Your company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        autoFocus
      />
      {error && <p className="text-[13px] text-[#b42318]">{error}</p>}
      <Button type="submit" disabled={busy}>
        {busy ? "Creating…" : "Create workspace"}
      </Button>
      <Note invited={false} />
    </form>
  );
}

function Note({ invited }: { invited: boolean }) {
  return (
    <div className="w-full rounded-[6px] bg-canvas p-3">
      <p className="text-[13px] leading-[18px] text-ink-2">
        {invited
          ? "You will be able to review batches and answer replies. The founder manages Setup, the plan and the team."
          : "Nothing sends without your approval. You approve every batch of messages first."}
      </p>
    </div>
  );
}
