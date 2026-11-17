"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { TopBar } from "@/components/app-shell";
import { CurrentPerson } from "@/components/current-person";
import type { BatchDetail } from "@/components/approvals/data";
import { ProjectTag } from "@/components/project-tag";
import { Button, Card, SectionTitle, Tag } from "@/components/ui";

// Figma: Batch review (9:389, desktop) + Batch review (mobile) (9:479).
// Desktop layout from md up, mobile layout below md. One shared client state.

type Status = "pending" | "approved" | "skipped";

type Message = {
  id: string;
  to: string;
  subject: string;
  body: string;
  hint?: string;
  status: Status;
};

type BatchState = "open" | "approved" | "held";

export function BatchReview({ batch: detail }: { batch: BatchDetail }) {
  const TOTAL = detail.total;
  const [messages, setMessages] = useState<Message[]>(() =>
    detail.messages.map((m) => ({ ...m, status: "pending" as Status })),
  );
  const [editing, setEditing] = useState<{ id: string; draft: string } | null>(
    detail.initialEdit ?? null,
  );
  const [batch, setBatch] = useState<BatchState>("open");

  const skipped = messages.filter((m) => m.status === "skipped").length;
  const approved = messages.filter((m) => m.status === "approved").length;
  const toSend = TOTAL - skipped;
  const locked = batch !== "open";

  const setStatus = (id: string, status: Status) =>
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, status } : m)));

  const actions = {
    editing,
    locked,
    startEdit: (m: Message) => setEditing({ id: m.id, draft: m.body }),
    changeDraft: (draft: string) => setEditing((e) => (e ? { ...e, draft } : e)),
    save: () => {
      if (!editing) return;
      setMessages((ms) =>
        ms.map((m) => (m.id === editing.id ? { ...m, body: editing.draft } : m)),
      );
      setEditing(null);
    },
    cancel: () => setEditing(null),
    approve: (id: string) => setStatus(id, "approved"),
    skip: (id: string) => setStatus(id, "skipped"),
    undo: (id: string) => setStatus(id, "pending"),
  };

  const approveAll = () => {
    setEditing(null);
    setMessages((ms) => ms.map((m) => (m.status === "skipped" ? m : { ...m, status: "approved" })));
    setBatch("approved");
  };
  const hold = () => {
    setEditing(null);
    setBatch((b) => (b === "held" ? "open" : "held"));
  };

  const approveLabel = `Approve all ${toSend}`;
  const holdLabel = batch === "held" ? "Release the batch" : "Hold the batch";

  const banner =
    batch === "approved"
      ? `Approved. ${toSend} messages send at 8:00.`
      : batch === "held"
        ? "Held. Nothing in this batch sends until you release it."
        : approved || skipped
          ? `${approved} approved · ${skipped} skipped · ${TOTAL - approved - skipped} still to review`
          : null;

  return (
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      {/* Desktop top bar */}
      <div className="max-md:hidden">
        <TopBar crumb={`Approvals / ${detail.date} / ${detail.offer}`} />
      </div>
      {/* Mobile top bar */}
      <header className="flex w-full items-center justify-between border-b border-line bg-white px-4 py-3 md:hidden">
        <Link href="/approvals" className="text-[14px] font-medium text-accent">
          {"< Approvals"}
        </Link>
        <CurrentPerson compact />
      </header>

      <main className="flex w-full flex-1 flex-col gap-6 p-8 max-md:gap-3 max-md:p-4">
        {/* Header */}
        <div className="flex w-full items-end gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 max-md:gap-3">
            <div>
              <ProjectTag projectId={detail.project} />
            </div>
            <h1 className="text-[24px] font-bold text-ink max-md:text-[20px]">
              Morning batch for {detail.offer}
            </h1>
            <p className="text-[14px] leading-5 text-ink-2 max-md:hidden">
              {detail.date} · {TOTAL} messages · cold email · sends at 8:00 after approval
            </p>
            <p className="text-[13px] leading-[18px] text-ink-2 md:hidden">
              {detail.date} · {TOTAL} messages · Test 1 · cold email. Sends at 8:00 after approval.
            </p>
          </div>
          <div data-tour="batch-actions" className="flex shrink-0 gap-2 max-md:hidden">
            <Button variant="secondary" onClick={hold} disabled={batch === "approved"}>
              {holdLabel}
            </Button>
            <Button onClick={approveAll} disabled={locked}>
              {batch === "approved" ? "Approved" : approveLabel}
            </Button>
          </div>
        </div>

        {banner && (
          <p
            aria-live="polite"
            className="w-full rounded-[8px] border border-accent bg-accent-soft px-4 py-2.5 text-[13px] font-medium text-accent"
          >
            {banner}
          </p>
        )}

        <div className="flex w-full items-start gap-6">
          {/* Messages */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {messages.map((m) => (
              <MessageCard key={m.id} message={m} {...actions} />
            ))}
            <p className="text-[13px] text-muted max-md:hidden">
              Showing {messages.length} of {TOTAL} messages
            </p>
            <p className="text-[12px] text-muted md:hidden">
              {messages.length} of {TOTAL} shown. Scroll for the rest.
            </p>
          </div>

          {/* Source card (desktop only) */}
          <aside className="w-[360px] shrink-0 max-lg:w-[300px] max-md:hidden">
            <Card className="flex w-full flex-col gap-2.5 p-5">
              <SectionTitle>Where this batch comes from</SectionTitle>
              <SourceRow label="Test" value={detail.test} />
              <SourceRow label="Offer" value={detail.offerLine} />
              <SourceRow label="Role in the test" value={detail.role} />
              <SourceRow label="ICP" value={detail.icp} />
            </Card>
          </aside>
        </div>
      </main>

      {/* Mobile bottom action bar */}
      <div className="sticky bottom-0 flex w-full gap-2 border-t border-line bg-white px-4 pb-7 pt-3 md:hidden">
        <Button variant="secondary" onClick={hold} disabled={batch === "approved"}>
          {batch === "held" ? "Release" : "Hold"}
        </Button>
        <Button className="flex-1" onClick={approveAll} disabled={locked}>
          {batch === "approved" ? "Approved" : approveLabel}
        </Button>
      </div>
    </div>
  );
}

function SourceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[12px] text-muted">{label}</p>
      <p className="text-[14px] font-medium leading-5 text-ink">{value}</p>
    </div>
  );
}

function MessageCard({
  message: m,
  editing,
  locked,
  startEdit,
  changeDraft,
  save,
  cancel,
  approve,
  skip,
  undo,
}: {
  message: Message;
  editing: { id: string; draft: string } | null;
  locked: boolean;
  startEdit: (m: Message) => void;
  changeDraft: (draft: string) => void;
  save: () => void;
  cancel: () => void;
  approve: (id: string) => void;
  skip: (id: string) => void;
  undo: (id: string) => void;
}) {
  const isEditing = editing?.id === m.id && !locked;
  const toLabel = (
    <>
      <span className="max-md:hidden">To: </span>
      {m.to}
    </>
  );

  if (isEditing) {
    return (
      <div className="flex w-full flex-col gap-2 rounded-[8px] border-[1.5px] border-accent bg-white p-4 max-md:p-3.5">
        <div className="flex w-full items-center gap-2">
          <p className="min-w-0 flex-1 text-[13px] font-semibold text-ink">{toLabel}</p>
          <Tag tone="accent">Editing</Tag>
        </div>
        <textarea
          aria-label={`Message to ${m.to}`}
          value={editing.draft}
          onChange={(e) => changeDraft(e.target.value)}
          rows={3}
          className="w-full resize-y rounded-[8px] border border-line bg-white p-3 text-[13px] leading-[19px] text-ink focus:border-accent focus:outline-none"
        />
        {m.hint && <p className="text-[12px] text-muted">{m.hint}</p>}
        <div className="flex w-full gap-2">
          <Button onClick={save}>Save message</Button>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  const dimmed = m.status === "skipped" ? "opacity-60" : "";

  return (
    <div
      className={`flex w-full flex-col gap-1.5 rounded-[8px] border border-line bg-white p-4 max-md:p-3.5 ${dimmed}`}
    >
      <div className="flex w-full items-center gap-2">
        <p className="min-w-0 flex-1 text-[13px] font-semibold text-ink">{toLabel}</p>
        {m.status !== "pending" && (
          <Tag tone={m.status === "approved" ? "accent" : "gray"}>
            {m.status === "approved" ? "Approved" : "Skipped"}
          </Tag>
        )}
        {!locked && (
          <>
            <Button variant="secondary" className="max-md:hidden" onClick={() => startEdit(m)}>
              Edit
            </Button>
            <Button variant="text" className="md:hidden" onClick={() => startEdit(m)}>
              Edit
            </Button>
          </>
        )}
      </div>
      <p className="text-[14px] font-semibold text-ink max-md:hidden">{m.subject}</p>
      <p className="text-[13px] leading-[19px] text-ink-2">{m.body}</p>
      {!locked && (
        <div className="flex gap-4 pt-1">
          {m.status === "pending" ? (
            <>
              <MiniAction className="text-accent" onClick={() => approve(m.id)}>
                Approve
              </MiniAction>
              <MiniAction className="text-ink-2" onClick={() => skip(m.id)}>
                Skip
              </MiniAction>
            </>
          ) : (
            <MiniAction className="text-accent" onClick={() => undo(m.id)}>
              Undo
            </MiniAction>
          )}
        </div>
      )}
    </div>
  );
}

function MiniAction({
  className,
  onClick,
  children,
}: {
  className: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[13px] font-semibold hover:underline ${className}`}
    >
      {children}
    </button>
  );
}
