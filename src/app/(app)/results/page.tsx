import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { CompareVariants } from "@/components/results/compare-variants";
import { RESULTS } from "@/components/results/data";
import { ResultsTabs } from "@/components/results/results-tabs";
import { PageHeader } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";


// Column widths from the Variant table (11:479): 90 / flex / 70 / 70 / 100 / 100 / 260.
const COLS = "grid grid-cols-[90px_minmax(0,1fr)_70px_70px_100px_100px_260px] items-center gap-4 px-5 py-3";

// Figma: Results board (11:410), for the project picked in the switcher.
export default function ResultsBoardPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ResultsBoardContent />
    </Suspense>
  );
}

async function ResultsBoardContent() {
  const projectId = await getCurrentProjectId();
  const { rows, bookedByOffer } = RESULTS[projectId];
  return (
    <Page crumb="Results / Results board">
      <ResultsTabs />
      <PageHeader
        title="Results board"
        subtitle="Booked calls and closed deals for every ICP, offer and channel variant. Opens and clicks are left out."
      />
      <CompareVariants key={projectId} booked={bookedByOffer} />
      <div data-tour="results-table" className="w-full overflow-x-auto rounded-[8px] border border-line bg-white">
        <div className="min-w-[960px]" role="table" aria-label="Variant results">
          <div role="row" className={`${COLS} bg-canvas text-[12px] font-semibold text-muted`}>
            {["Type", "Variant", "Sends", "Replies", "Booked calls", "Closed deals", "Verdict"].map(
              (h) => (
                <span key={h} role="columnheader">
                  {h}
                </span>
              ),
            )}
          </div>
          {rows.map((r, i) => (
            <div key={i} role="row" className={`${COLS} border-t border-line text-[14px] text-ink-2`}>
              <span role="cell" className="font-medium text-ink">
                {r.type}
              </span>
              <span role="cell">{r.variant}</span>
              <span role="cell">{r.sends}</span>
              <span role="cell">{r.replies}</span>
              <span role="cell">{r.booked}</span>
              <span role="cell">{r.closed}</span>
              <span
                role="cell"
                className={`text-[13px] ${r.flag ? "font-semibold text-accent" : ""}`}
              >
                {r.verdict}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
