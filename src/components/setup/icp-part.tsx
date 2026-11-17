"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";

// "ICP part" card (e.g. 7:135) with an inline Edit / Save toggle.
export function IcpPart({ label, value, why }: { label: string; value: string; why: string }) {
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState(value);
  const [draft, setDraft] = useState(value);

  return (
    <Card className="w-full p-5!">
      <div className="flex w-full items-start gap-6 max-md:flex-wrap max-md:gap-3">
        <p className="w-[180px] shrink-0 text-[12px] font-semibold text-muted max-md:w-full">
          {label}
        </p>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {editing ? (
            <input
              aria-label={label}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              className="w-full rounded-[6px] border border-line bg-white px-3 py-2 text-[16px] font-semibold text-ink focus:border-accent focus:outline-none"
            />
          ) : (
            <p className="text-[16px] font-semibold text-ink">{current}</p>
          )}
          <p className="text-[14px] leading-5 text-ink-2">{why}</p>
        </div>
        {editing ? (
          <div className="flex shrink-0 gap-2">
            <Button
              variant="text"
              onClick={() => {
                setDraft(current);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setCurrent(draft.trim() || current);
                setEditing(false);
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
      </div>
    </Card>
  );
}
