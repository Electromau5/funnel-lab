"use client";

import { useActionState, useState } from "react";
import { inviteCofounder, type InviteState } from "@/app/(app)/settings/team/actions";
import { Button, Card, Checkbox, Field } from "@/components/ui";

const RIGHTS = [
  { key: "review", label: "Review and hold batches", initial: true },
  { key: "approve", label: "Approve batches", initial: false },
  { key: "reply", label: "Answer replies", initial: true },
  { key: "read", label: "Read every thread and offer", initial: true },
  { key: "edit", label: "Edit the ICP and offers", initial: false },
  { key: "plan", label: "Change the plan", initial: false },
];

// "Invite your cofounder" form on Team (11:722).
export function InviteForm() {
  const [email, setEmail] = useState("");
  const [rights, setRights] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(RIGHTS.map((r) => [r.key, r.initial])),
  );
  const [state, formAction, pending] = useActionState<InviteState, FormData>(inviteCofounder, {});

  return (
    <Card className="flex min-w-0 flex-1 flex-col items-start gap-3.5 p-6 max-lg:w-full">
      <form action={formAction} className="flex w-full flex-col items-start gap-3.5">
        <h2 className="text-[16px] font-semibold text-ink">Invite your cofounder</h2>
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder="cofounder@yourcompany.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-[13px] font-semibold text-ink">What they can do</p>
        <div className="flex w-full flex-col gap-2">
          {RIGHTS.map((r) => (
            <Checkbox
              key={r.key}
              label={<span className="text-ink-2">{r.label}</span>}
              className="py-0.5"
              name="rights"
              value={r.key}
              checked={rights[r.key]}
              onChange={(e) => setRights((prev) => ({ ...prev, [r.key]: e.target.checked }))}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send invite"}
          </Button>
          {!pending && state.ok && <span className="text-[13px] text-muted">Invite sent</span>}
          {!pending && state.error && (
            <span className="text-[13px] text-[#b42318]">{state.error}</span>
          )}
        </div>
      </form>
    </Card>
  );
}
