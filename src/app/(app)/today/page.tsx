import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Page } from "@/components/app-shell";
import { ProjectTag } from "@/components/project-tag";
import { isFounder } from "@/lib/roles";
import { projectFilter, type ProjectId } from "@/lib/projects";
import {
  ButtonAnchor,
  ButtonLink,
  Card,
  PageHeader,
  SectionTitle,
  StateNote,
  switchHref,
  Tag,
} from "@/components/ui";

type Item = {
  project: ProjectId;
  kind: "Batch" | "Reply" | "Alert";
  title: string;
  detail: string;
  cofounderDetail?: string;
  href: string;
  /** Set when the link opens a per-project page, so it switches project first. */
  switchTo?: boolean;
  action: string;
  /** Shown on the cofounder's Today as well. */
  cofounder: boolean;
};

// Everything that needs a person, across every project.
const ITEMS: Item[] = [
  {
    project: "property-managers",
    kind: "Batch",
    title: "Morning batch: 24 messages for Offer A",
    detail: "Test 1, cold email. Sends at 8:00 after you approve.",
    cofounderDetail: "Test 1, cold email. Hold it if a message claims something we have not built.",
    href: "/approvals/batch?id=pm-offer-a",
    action: "Open batch",
    cofounder: true,
  },
  {
    project: "funded-startups",
    kind: "Batch",
    title: "Morning batch: 12 messages for Offer A",
    detail: "Test 1, cold email. Sends at 8:00 after you approve.",
    href: "/approvals/batch?id=fs-offer-a",
    action: "Open batch",
    cofounder: false,
  },
  {
    project: "property-managers",
    kind: "Reply",
    title: `Renee Castillo, Bayview: "We already pay for AppFolio."`,
    detail: "Funnel Lab could not answer this one. Suggested answer ready.",
    href: "/replies/renee-castillo",
    action: "Open reply",
    cofounder: false,
  },
  {
    project: "funded-startups",
    kind: "Reply",
    title: `Nina Patel, Ledgerline: "Why wouldn't we build this ourselves?"`,
    detail: "Funnel Lab could not answer this one. Suggested answer ready.",
    cofounderDetail: "Objection about building in-house. Suggested answer ready for you to check.",
    href: "/replies/nina-patel",
    action: "Open reply",
    cofounder: true,
  },
  {
    project: "property-managers",
    kind: "Alert",
    title: "Test 1 is heading the wrong way",
    detail: "Offer A gets replies but no booked calls. Likely cause: the offer.",
    href: "/tests/next",
    switchTo: true,
    action: "Open alert",
    cofounder: false,
  },
];

type Week = { booked: number; next: string; tests: number };

const WEEK: Record<ProjectId, Week> = {
  "property-managers": { booked: 3, next: "Alicia Grant, Tue 10:00 is next", tests: 1 },
  "funded-startups": { booked: 1, next: "Owen Fischer, Thu 11:00 is next", tests: 1 },
};

// Figma: Today (6:15); Today (cofounder) (6:109) for anyone who is not the founder.
// Combines every project; the project switcher filters it through ?project=.
export default function TodayPage(props: PageProps<"/today">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TodayPageContent {...props} />
    </Suspense>
  );
}

async function TodayPageContent(props: PageProps<"/today">) {
  const filter = projectFilter((await props.searchParams).project);
  const { orgRole } = await auth();
  const user = await currentUser();
  const firstName = user?.firstName ?? "";
  const items = filter ? ITEMS.filter((i) => i.project === filter) : ITEMS;
  const week = filter
    ? WEEK[filter]
    : {
        booked: WEEK["property-managers"].booked + WEEK["funded-startups"].booked,
        next: WEEK["property-managers"].next,
        tests: 2,
      };
  const testsNote = filter ? "Test 1: Offer A vs Offer B" : "Test 1 in each project";

  if (!isFounder(orgRole)) {
    return (
      <CofounderToday
        firstName={firstName}
        items={items.filter((i) => i.cofounder)}
        week={week}
        testsNote={testsNote}
      />
    );
  }
  return (
    <Page crumb="Today">
      <PageHeader
        title={greeting(firstName)}
        subtitle={`${items.length} ${items.length === 1 ? "thing needs" : "things need"} you${
          filter ? "" : " across your projects"
        }. Everything else is running.`}
      />
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <section data-tour="needs-you" className="flex min-w-0 flex-1 flex-col gap-3 max-lg:w-full">
          <SectionTitle>Needs you</SectionTitle>
          {items.map((item) => (
            <NeedsYouItem key={item.href} item={item} />
          ))}
          <StateNote title="State: day one (before the intake)">
            <ItemRow
              tag={<Tag>Task</Tag>}
              title="Describe your product"
              detail="Funnel Lab needs this before it can name a buyer."
              action={<ButtonLink href="/setup/intake">Start the intake</ButtonLink>}
            />
          </StateNote>
        </section>
        <aside data-tour="this-week" className="flex w-[360px] shrink-0 flex-col gap-3 max-lg:w-full">
          <SectionTitle>This week</SectionTitle>
          <Stat label="Booked calls" value={String(week.booked)} note={week.next} />
          <Stat label="Tests running" value={String(week.tests)} note={testsNote} />
          <Stat
            label="Next Friday update"
            value="Fri, Nov 6"
            note="Booked calls per variant and the next test, for each project"
          />
        </aside>
      </div>
    </Page>
  );
}

function greeting(firstName: string) {
  return firstName ? `Good morning, ${firstName}` : "Good morning";
}

// Figma: Today (cofounder) (6:109)
function CofounderToday({
  firstName,
  items,
  week,
  testsNote,
}: {
  firstName: string;
  items: Item[];
  week: Week;
  testsNote: string;
}) {
  return (
    <Page crumb="Today">
      <PageHeader
        title={greeting(firstName)}
        subtitle={`${items.length} ${items.length === 1 ? "thing" : "things"} you can handle today.`}
      />
      <Card className="flex w-full items-center gap-3 p-3.5 max-sm:flex-wrap">
        <Tag>Your rights</Tag>
        <p className="min-w-0 flex-1 text-[13px] leading-[18px] text-ink-2">
          You can review and hold batches, answer replies and read every thread. The founder
          approves batches, edits the ICP and offers, and manages the plan. You see every project.
        </p>
      </Card>
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <section data-tour="needs-you" className="flex min-w-0 flex-1 flex-col gap-3 max-lg:w-full">
          <SectionTitle>Needs you</SectionTitle>
          {items.map((item) => (
            <NeedsYouItem key={item.href} item={item} cofounder />
          ))}
        </section>
        <aside data-tour="this-week" className="flex w-[360px] shrink-0 flex-col gap-3 max-lg:w-full">
          <SectionTitle>This week (view only)</SectionTitle>
          <Stat
            label="Booked calls"
            value={String(week.booked)}
            note="Thread and offer attached to each call"
          />
          <Stat label="Tests running" value={String(week.tests)} note={testsNote} />
        </aside>
      </div>
    </Page>
  );
}

function ItemRow({
  tag,
  title,
  detail,
  action,
  detailClass = "text-muted",
}: {
  tag: React.ReactNode;
  title: string;
  detail: string;
  action: React.ReactNode;
  detailClass?: string;
}) {
  return (
    <div className="flex w-full items-center gap-4 max-sm:flex-wrap">
      {tag}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className={`text-[13px] ${detailClass}`}>{detail}</p>
      </div>
      {action}
    </div>
  );
}

function NeedsYouItem({ item, cofounder = false }: { item: Item; cofounder?: boolean }) {
  const alert = item.kind === "Alert";
  const variant = alert || item.kind === "Batch" || cofounder ? "primary" : "secondary";
  const action = item.switchTo ? (
    <ButtonAnchor href={switchHref(item.project, item.href)} variant={variant}>
      {item.action}
    </ButtonAnchor>
  ) : (
    <ButtonLink href={item.href} variant={variant}>
      {item.action}
    </ButtonLink>
  );
  const tag = (
    <div className="flex shrink-0 flex-col items-start gap-1.5">
      <Tag tone={alert ? "accent" : "gray"}>{item.kind}</Tag>
      <ProjectTag projectId={item.project} />
    </div>
  );
  const row = (
    <ItemRow
      tag={tag}
      title={item.title}
      detail={(cofounder && item.cofounderDetail) || item.detail}
      detailClass={alert ? "text-ink-2" : "text-muted"}
      action={action}
    />
  );
  return alert ? (
    <div className="w-full rounded-[8px] border-[1.5px] border-accent bg-accent-soft p-4">{row}</div>
  ) : (
    <Card className="w-full">{row}</Card>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card className="flex w-full flex-col gap-1">
      <p className="text-[13px] text-muted">{label}</p>
      <p className="text-[24px] font-bold text-ink">{value}</p>
      <p className="text-[13px] text-ink-2">{note}</p>
    </Card>
  );
}
