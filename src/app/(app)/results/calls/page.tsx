import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { RESULTS } from "@/components/results/data";
import { SelectBox } from "@/components/results/parts";
import { ResultsTabs } from "@/components/results/results-tabs";
import { ButtonLink, PageHeader } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";


const OUTCOMES = ["Showed up", "No-show", "Moved to a deal", "Closed deal", "Not a fit"];

// Column widths from the Booked call list (10:487): 150 / flex / 200 / 120 / 150 / 170.
const COLS = "grid grid-cols-[150px_minmax(0,1fr)_200px_120px_150px_170px] items-center gap-4 px-5 py-3";

// Figma: Booked calls (10:440), for the project picked in the switcher.
export default function BookedCallsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BookedCallsContent />
    </Suspense>
  );
}

async function BookedCallsContent() {
  const { calls } = RESULTS[await getCurrentProjectId()];
  return (
    <Page crumb="Results / Booked calls">
      <ResultsTabs />
      <PageHeader
        title="Booked calls"
        subtitle="Every call has its thread and offer attached, so you or your cofounder can read up before it starts."
      />
      <div data-tour="booked-calls" className="w-full overflow-x-auto rounded-[8px] border border-line bg-white">
        <div className="min-w-[1000px]" role="table" aria-label="Booked calls">
          <div role="row" className={`${COLS} bg-canvas text-[12px] font-semibold text-muted`}>
            {["When", "Prospect", "Offer and test", "Who takes it", "Thread", "Outcome"].map((h) => (
              <span key={h} role="columnheader">
                {h}
              </span>
            ))}
          </div>
          {calls.map((c) => (
            <div key={c.when} role="row" className={`${COLS} border-t border-line text-[14px] text-ink-2`}>
              <span role="cell" className="font-medium text-ink">
                {c.when}
              </span>
              <span role="cell">{c.prospect}</span>
              <span role="cell">{c.offer}</span>
              <span role="cell">{c.owner}</span>
              <span role="cell">
                <ButtonLink href={c.thread} variant="secondary">
                  Open the thread
                </ButtonLink>
              </span>
              <span role="cell">
                <SelectBox aria-label={`Outcome for ${c.prospect}`} defaultValue="">
                  <option value="" disabled>
                    Mark the outcome
                  </option>
                  {OUTCOMES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </SelectBox>
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[13px] text-muted">
        Sample data. Calls come from the mock calendar in the prototype.
      </p>
    </Page>
  );
}
