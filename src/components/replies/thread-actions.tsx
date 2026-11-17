"use client";

import { useState } from "react";
import { Button, Tag } from "@/components/ui";

// "Mark as not interested" in the thread header (10:390).
export function NotInterestedButton() {
  const [marked, setMarked] = useState(false);
  return (
    <Button variant="secondary" onClick={() => setMarked((m) => !m)} aria-pressed={marked}>
      {marked ? "Marked as not interested" : "Mark as not interested"}
    </Button>
  );
}

// Suggested answer card (10:413): editable draft, send or edit.
export function SuggestedAnswer({ initial }: { initial: string }) {
  const [text, setText] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div data-tour="suggested-answer" className="flex w-full flex-col gap-2.5 rounded-[8px] border-[1.5px] border-accent bg-white p-[18px]">
      <div className="flex w-full items-center gap-2">
        <p className="min-w-0 flex-1 text-[14px] font-semibold text-ink">Suggested answer</p>
        <Tag tone="accent">{sent ? "Sent" : "Needs you"}</Tag>
      </div>
      {editing ? (
        <textarea
          aria-label="Suggested answer"
          className="min-h-24 w-full rounded-[8px] border border-accent bg-white p-3 text-[13px] leading-[19px] text-ink focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      ) : (
        <div className="w-full rounded-[8px] border border-line bg-white p-3">
          <p className="whitespace-pre-wrap text-[13px] leading-[19px] text-ink">{text}</p>
        </div>
      )}
      {sent ? (
        <p className="text-[13px] text-ink-2">Sent. Funnel Lab will watch for the next reply.</p>
      ) : (
        <div className="flex w-full flex-wrap items-start gap-2">
          <Button
            onClick={() => {
              setEditing(false);
              setSent(true);
            }}
            disabled={!text.trim()}
          >
            Send the suggested answer
          </Button>
          <Button variant="secondary" onClick={() => setEditing((e) => !e)}>
            {editing ? "Done" : "Edit"}
          </Button>
        </div>
      )}
    </div>
  );
}
