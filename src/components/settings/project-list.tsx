"use client";

import { useState } from "react";
import { Button, ButtonLink, Tag } from "@/components/ui";
import { PLAN_PROJECT_LIMIT, PROJECTS } from "@/lib/projects";

// Project list on Projects (53:623). Delete asks to confirm; projects are
// sample data in the prototype, so a delete only lasts until the page reloads.
export function ProjectList() {
  const [deleted, setDeleted] = useState<string[]>([]);
  const [confirming, setConfirming] = useState<string | null>(null);
  const projects = PROJECTS.filter((p) => !deleted.includes(p.id));
  const empty = PLAN_PROJECT_LIMIT - projects.length;

  return (
    <div className="w-full overflow-hidden rounded-[8px] border border-line bg-white">
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,1.6fr)_100px_180px] items-center gap-4 bg-canvas px-5 py-3 text-[12px] font-semibold text-muted max-lg:hidden">
        <span>Project</span>
        <span>Segment</span>
        <span>Sending inbox</span>
        <span>Status</span>
        <span />
      </div>
      {projects.map((p) => (
        <div
          key={p.id}
          className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,1.6fr)_100px_180px] items-center gap-4 border-t border-line px-5 py-3.5 text-[14px] text-ink-2 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:gap-1.5 max-lg:first:border-t-0"
        >
          <span className="font-semibold text-ink">{p.name}</span>
          <span>{p.segment}</span>
          <span className="break-all">{p.inbox}</span>
          <span>
            <Tag tone="accent">{p.status}</Tag>
          </span>
          <span className="flex justify-end gap-1 max-lg:justify-start">
            {confirming === p.id ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDeleted((d) => [...d, p.id]);
                    setConfirming(null);
                  }}
                >
                  Delete
                </Button>
                <Button variant="text" onClick={() => setConfirming(null)}>
                  Keep
                </Button>
              </>
            ) : (
              <Button variant="text" onClick={() => setConfirming(p.id)}>
                Delete
              </Button>
            )}
          </span>
        </div>
      ))}
      {Array.from({ length: Math.max(empty, 0) }, (_, i) => (
        <div
          key={`empty-${i}`}
          className="flex items-center justify-between gap-4 border-t border-dashed border-line px-5 py-3.5 max-sm:flex-col max-sm:items-start"
        >
          <span className="text-[14px] text-muted">Empty slot on your plan</span>
          <ButtonLink href="/settings/projects/new" variant="text">
            Add new project
          </ButtonLink>
        </div>
      ))}
    </div>
  );
}
