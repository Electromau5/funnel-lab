"use client";

import { useState } from "react";
import { Button, ButtonLink, Card, Field, StateNote, Tag } from "@/components/ui";

type Inbox = "none" | "connecting" | "connected";

// New project form (53:780): name the segment, connect its sending inbox,
// then continue to the segment questions in the intake.
export function NewProjectForm() {
  const [name, setName] = useState("");
  const [inbox, setInbox] = useState<Inbox>("none");
  const ready = name.trim().length > 0 && inbox === "connected";

  const connect = () => {
    setInbox("connecting");
    setTimeout(() => setInbox("connected"), 900);
  };

  const inboxTag =
    inbox === "connected" ? (
      <Tag tone="accent">Connected (sample)</Tag>
    ) : inbox === "connecting" ? (
      <Tag>Connecting…</Tag>
    ) : (
      <Tag>Not connected yet</Tag>
    );

  return (
    <div className="flex w-full items-start gap-6 max-lg:flex-col">
      <Card className="flex min-w-0 flex-1 flex-col gap-5 p-6! max-lg:w-full">
        <Field
          label="Segment name"
          placeholder="For example: Hospitality groups"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex w-full flex-col gap-2">
          <p className="text-[13px] font-medium text-ink-2">Sending inbox</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={connect} disabled={inbox !== "none"}>
              Connect sending inbox
            </Button>
            {inboxTag}
          </div>
          <p className="text-[13px] text-muted">
            Each project sends from its own inbox, so one segment&apos;s tests never affect
            another&apos;s.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ready ? (
            <ButtonLink href="/setup/intake">Continue to intake</ButtonLink>
          ) : (
            <Button disabled>Continue to intake</Button>
          )}
          <ButtonLink href="/settings/projects" variant="secondary">
            Cancel
          </ButtonLink>
        </div>
        {ready && (
          <StateNote title="Prototype">
            <p className="text-[13px] text-ink-2">
              Projects are sample data until a database is connected, so no project is saved. The
              intake opens for the current project.
            </p>
          </StateNote>
        )}
      </Card>
      <aside className="flex w-[360px] shrink-0 flex-col gap-3 max-lg:w-full">
        <Card className="flex w-full flex-col gap-2 p-5">
          <p className="text-[16px] font-semibold text-ink">The product description carries over</p>
          <p className="text-[14px] leading-5 text-ink-2">
            Your product stays the same across projects. The intake only asks the segment
            questions: who buys, and what makes them buy now.
          </p>
        </Card>
      </aside>
    </div>
  );
}
