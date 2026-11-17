"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { Lead } from "@/components/setup/setup-data";

// Lead table (7:229). "Not a fit" removes the lead from the sample.

const cols = {
  name: "w-[180px] shrink-0",
  role: "w-[220px] shrink-0",
  company: "w-[220px] shrink-0",
  size: "w-[90px] shrink-0",
  trigger: "min-w-[160px] flex-1",
  action: "flex w-[90px] shrink-0 justify-end",
};

export function LeadTable({ leads: all, total }: { leads: Lead[]; total: number }) {
  const [removed, setRemoved] = useState<string[]>([]);
  const leads = all.filter((l) => !removed.includes(l.name));

  return (
    <>
      <div className="w-full overflow-x-auto rounded-[8px] border border-line bg-white">
        <div role="table" aria-label="Sample leads" className="min-w-[1000px]">
          <div
            role="row"
            className="flex items-center gap-4 bg-canvas px-5 py-3 text-[12px] font-semibold text-muted"
          >
            <span role="columnheader" className={cols.name}>Name</span>
            <span role="columnheader" className={cols.role}>Role</span>
            <span role="columnheader" className={cols.company}>Company</span>
            <span role="columnheader" className={cols.size}>Employees</span>
            <span role="columnheader" className={cols.trigger}>Buying trigger</span>
            <span role="columnheader" className={cols.action}>
              <span className="sr-only">Actions</span>
            </span>
          </div>
          {leads.map((lead) => (
            <div
              role="row"
              key={lead.name}
              className="flex items-center gap-4 border-t border-line px-5 py-3 text-[14px] text-ink-2"
            >
              <span role="cell" className={`${cols.name} font-medium text-ink`}>
                {lead.name}
              </span>
              <span role="cell" className={cols.role}>{lead.role}</span>
              <span role="cell" className={cols.company}>{lead.company}</span>
              <span role="cell" className={cols.size}>{lead.size}</span>
              <span role="cell" className={cols.trigger}>{lead.trigger}</span>
              <span role="cell" className={cols.action}>
                <Button
                  variant="text"
                  onClick={() => setRemoved((r) => [...r, lead.name])}
                  aria-label={`${lead.name} is not a fit`}
                >
                  Not a fit
                </Button>
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[13px] text-muted">
        Showing {leads.length} of {total - removed.length}
      </p>
    </>
  );
}
