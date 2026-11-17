import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { notFound } from "next/navigation";
import { Page } from "@/components/app-shell";
import { ConfirmButton } from "@/components/tests/confirm-button";
import { getTest, type TestArm } from "@/components/tests/data";
import { ButtonLink, Card, SectionTitle, PageHeader, StateNote, Tag } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";

// Figma: Test detail (8:338), for the project picked in the switcher.
export default function TestDetailPage(props: PageProps<"/tests/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TestDetailPageContent {...props} />
    </Suspense>
  );
}

async function TestDetailPageContent(props: PageProps<"/tests/[id]">) {
  const { id } = await props.params;
  const test = getTest(await getCurrentProjectId(), id);
  if (!test) notFound();

  return (
    <Page crumb={`Tests / Test ${test.id}`}>
      <PageHeader title={test.title} subtitle={test.summary} />

      {test.alert && (
        <div className="flex w-full flex-col gap-2 rounded-[8px] border-[1.5px] border-accent bg-accent-soft p-5">
          <div className="flex w-full items-center gap-2">
            <Tag tone="accent">Alert</Tag>
            <p className="min-w-0 flex-1 text-[15px] font-semibold text-ink">{test.alert.title}</p>
          </div>
          <p className="text-[14px] leading-5 text-ink-2">{test.alert.body}</p>
          <div className="flex w-full flex-wrap gap-2 pt-1">
            <ButtonLink href="/tests/next">Accept the proposed next test</ButtonLink>
            <ButtonLink href="/setup/offers/a" variant="secondary">
              Change it
            </ButtonLink>
          </div>
        </div>
      )}

      <div data-tour="test-arms" className="flex w-full items-start gap-6 max-md:flex-col">
        <ArmCard arm={test.control} />
        <ArmCard arm={test.variant} />
      </div>

      <Card className="flex w-full flex-col gap-2 p-5">
        <SectionTitle>Daily batch plan</SectionTitle>
        <p className="text-[14px] leading-5 text-ink-2">{test.batchPlan}</p>
      </Card>

      <StateNote title="State: new test, before it starts">
        <div className="flex w-full items-center gap-4 max-sm:flex-col max-sm:items-start">
          <p className="min-w-0 flex-1 text-[14px] text-ink-2">
            Check what the test changes, the control, the variants and the batch plan, then start
            it.
          </p>
          <ConfirmButton label="Confirm and start" doneLabel="Started" />
        </div>
      </StateNote>
    </Page>
  );
}

function ArmCard({ arm }: { arm: TestArm }) {
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-3 p-5 max-md:w-full">
      <div className="flex w-full items-center gap-2">
        <Tag tone={arm.role === "Variant" ? "accent" : "gray"}>{arm.role}</Tag>
        <p className="text-[15px] font-semibold text-ink">{arm.offer}</p>
      </div>
      <p className="text-[14px] text-ink-2">{arm.headline}</p>
      <div className="flex w-full items-start gap-4">
        <Metric label="Sends" value={arm.sends} />
        <Metric label="Replies" value={arm.replies} />
        <Metric label="Booked calls" value={arm.bookedCalls} />
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <p className="text-[12px] text-muted">{label}</p>
      <p className="text-[20px] font-bold text-ink">{value}</p>
    </div>
  );
}
