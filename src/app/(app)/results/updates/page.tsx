import { Page } from "@/components/app-shell";
import { ProjectTag } from "@/components/project-tag";
import { RESULTS, type FridayUpdate } from "@/components/results/data";
import { VariantBar } from "@/components/results/parts";
import { ResultsTabs } from "@/components/results/results-tabs";
import { UpdateActions } from "@/components/results/update-actions";
import { PageHeader, Tag } from "@/components/ui";
import { PROJECTS, type ProjectId } from "@/lib/projects";

// Figma: Friday updates (11:326). One update for the workspace, one section per project.
export default function FridayUpdatesPage() {
  return (
    <Page crumb="Results / Friday updates">
      <ResultsTabs />
      <PageHeader
        title="Friday update, week of Oct 26"
        subtitle="One page with this week's booked calls, any alert and the next test, for each project."
        actions={<UpdateActions />}
      />
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <nav aria-label="Updates" className="flex w-[220px] shrink-0 flex-col gap-2 max-lg:w-full">
          <p className="text-[13px] font-semibold text-muted">Updates</p>
          <span
            aria-current="page"
            className="w-full rounded-[6px] bg-accent-soft px-3 py-2.5 text-[14px] font-semibold text-accent"
          >
            Week of Oct 26
          </span>
          <span className="w-full px-3 py-2.5 text-[14px] text-muted">Week of Nov 2 (Fri, Nov 6)</span>
        </nav>
        <div data-tour="friday-updates" className="flex min-w-0 flex-1 flex-col gap-6 max-lg:w-full">
          {PROJECTS.map((p) => (
            <ProjectUpdate key={p.id} projectId={p.id} update={RESULTS[p.id].update} />
          ))}
        </div>
      </div>
    </Page>
  );
}

function ProjectUpdate({ projectId, update }: { projectId: ProjectId; update: FridayUpdate }) {
  return (
    <article className="flex w-full flex-col gap-[18px] rounded-[8px] border border-line bg-white p-8 max-md:p-5">
      <div>
        <ProjectTag projectId={projectId} />
      </div>
      <h2 className="text-[28px] font-bold text-ink">{update.headline}</h2>
      <p className="text-[15px] text-ink-2">{update.summary}</p>
      <div className="flex w-full flex-col gap-2.5">
        <p className="text-[13px] font-semibold text-muted">Booked calls per variant</p>
        {update.bars.map((b) => (
          <VariantBar key={b.label} label={b.label} booked={b.booked} />
        ))}
      </div>
      {update.alert && (
        <div className="flex w-full flex-col gap-1.5 rounded-[8px] border-[1.5px] border-accent bg-accent-soft p-4">
          <div className="flex w-full items-center gap-2">
            <Tag tone="accent">Alert</Tag>
            <p className="min-w-0 flex-1 text-[14px] font-semibold text-ink">{update.alert.title}</p>
          </div>
          <p className="text-[14px] text-ink-2">{update.alert.body}</p>
        </div>
      )}
      <div className="flex w-full flex-col gap-1">
        <p className="text-[13px] font-semibold text-muted">Next test</p>
        <p className="text-[14px] leading-5 text-ink">{update.nextTest}</p>
      </div>
    </article>
  );
}
