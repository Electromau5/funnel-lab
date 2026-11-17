import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { BATCH_ROWS } from "@/components/approvals/data";
import { PageSkeleton } from "@/components/page-skeleton";
import { ProjectTag } from "@/components/project-tag";
import { ButtonLink, PageHeader, Tag } from "@/components/ui";
import { projectFilter } from "@/lib/projects";

// Shared column template: Batch (fluid) · Project · Test and offer · Messages · Status · action
const COLS =
  "md:grid md:grid-cols-[minmax(0,1fr)_170px_150px_90px_220px_110px] md:items-center md:gap-4";

// Figma: Approvals (9:272). Combines every project; the project switcher
// filters the list through ?project=.
export default function ApprovalsPage(props: PageProps<"/approvals">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ApprovalsPageContent {...props} />
    </Suspense>
  );
}

async function ApprovalsPageContent(props: PageProps<"/approvals">) {
  const filter = projectFilter((await props.searchParams).project);
  const rows = filter ? BATCH_ROWS.filter((b) => b.project === filter) : BATCH_ROWS;

  return (
    <Page crumb="Approvals">
      <PageHeader
        title="Batches waiting for approval"
        subtitle={`Newest first${filter ? "" : ", from every project"}. Nothing sends until a batch is approved.`}
      />
      <div data-tour="approvals" className="w-full overflow-hidden rounded-[8px] border border-line bg-white">
        <div
          className={`bg-canvas px-5 py-3 text-[12px] font-semibold text-muted max-md:hidden ${COLS}`}
        >
          <span>Batch</span>
          <span>Project</span>
          <span>Test and offer</span>
          <span>Messages</span>
          <span>Status</span>
          <span />
        </div>
        {rows.map((b, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 border-t border-line px-5 py-3 max-md:nth-2:border-t-0 ${COLS}`}
          >
            <p className="text-[14px] font-medium text-ink">{b.batch}</p>
            <div>
              <ProjectTag projectId={b.project} />
            </div>
            <p className="text-[14px] text-ink-2">
              {b.testAndOffer}
              <span className="md:hidden"> · {b.messages} messages</span>
            </p>
            <p className="text-[14px] text-ink-2 max-md:hidden">{b.messages}</p>
            <div>
              <Tag tone={b.waiting ? "accent" : "gray"}>{b.status}</Tag>
            </div>
            <div>
              <ButtonLink
                href={`/approvals/batch?id=${b.detailId}`}
                variant={b.waiting ? "primary" : "secondary"}
              >
                {b.waiting ? "Open batch" : "Open"}
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
