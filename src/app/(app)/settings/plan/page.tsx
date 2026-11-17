import { Page } from "@/components/app-shell";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { Button, ButtonLink, Card, PageHeader, Tag } from "@/components/ui";
import { PLAN_PROJECT_LIMIT, PROJECTS } from "@/lib/projects";

// Figma: Plan (11:570)
export default function PlanPage() {
  return (
    <Page crumb="Settings / Plan">
      <SettingsTabs active="plan" />
      <PageHeader title="Your plan" subtitle="Month one ends Tue, Nov 24." />
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <Card className="flex min-w-0 flex-1 flex-col items-start gap-3.5 p-7 max-lg:w-full max-md:p-5">
          <div className="flex flex-col gap-1">
            <p className="text-[32px] font-bold text-ink">$149 a month</p>
            <p className="text-[14px] font-medium text-ink-2">Up to {PLAN_PROJECT_LIMIT} projects</p>
          </div>
          <ProjectsUsed />
          <div className="flex w-full gap-6">
            <Metric label="Booked calls this month" value="4" />
            <Metric label="Cost per booked call" value="about $37" />
          </div>
          <p className="text-[14px] leading-5 text-ink-2">
            Includes founder and cofounder seats, lead data, and sending within the plan&apos;s test
            volume. Each project gets its own sending inbox.
          </p>
          <div className="flex w-full items-center gap-2 rounded-[6px] bg-canvas p-3 max-sm:flex-wrap">
            <Tag>Queued</Tag>
            <p className="min-w-0 flex-1 text-[13px] text-ink-2">
              Test 2 starts when Test 1 ends in each project, so testing carries on in month two.
            </p>
          </div>
          <Button>Pay for month two</Button>
        </Card>

        <aside className="flex w-[420px] shrink-0 flex-col gap-3 max-lg:w-full">
          <Card className="flex w-full flex-col gap-2.5 p-5">
            <p className="text-[16px] font-semibold text-ink">What the same calls cost elsewhere</p>
            <p className="text-[14px] leading-5 text-ink-2">
              Outbound agencies: $150 to $750 per booked meeting.
            </p>
            <p className="text-[14px] leading-5 text-ink-2">
              Apollo Basic plus Instantly Growth: about $96 a month, and you still write the ICP and
              the offers yourself.
            </p>
          </Card>
          <Card className="flex w-full flex-col gap-2 p-5">
            <p className="text-[16px] font-semibold text-ink">Booked calls by month</p>
            <div className="flex w-full items-start justify-between gap-4 text-[14px]">
              <p className="text-ink-2">Month one (Oct 25 to Nov 24)</p>
              <p className="shrink-0 font-semibold text-ink">4 so far</p>
            </div>
          </Card>
          <Card className="flex w-full flex-col items-start gap-2.5 p-5">
            <p className="text-[16px] font-semibold text-ink">Need a 4th project?</p>
            <p className="text-[14px] leading-5 text-ink-2">
              The $149 plan covers {PLAN_PROJECT_LIMIT} projects. For more, move to the higher plan,
              or delete a project you no longer test.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary">Ask about the higher plan</Button>
              <ButtonLink href="/settings/projects" variant="text">
                Manage projects
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </div>
    </Page>
  );
}

function ProjectsUsed() {
  const used = PROJECTS.length;
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-1.5">
      <p className="text-[13px] font-medium text-ink-2">
        {used} of {PLAN_PROJECT_LIMIT} projects used
      </p>
      <div className="h-2 w-full overflow-hidden rounded-[4px] bg-chip">
        <div
          className="h-2 rounded-[4px] bg-accent"
          style={{ width: `${(used / PLAN_PROJECT_LIMIT) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <p className="text-[12px] text-muted">{label}</p>
      <p className="text-[22px] font-bold text-ink">{value}</p>
    </div>
  );
}
