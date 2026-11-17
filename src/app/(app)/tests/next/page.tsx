import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { ConfirmButton } from "@/components/tests/confirm-button";
import { NEXT_TEST } from "@/components/tests/data";
import { ButtonLink, Card, PageHeader, SectionTitle, Tag } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";

// Figma: Next test (9:206), for the project picked in the switcher.
export default function NextTestPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NextTestContent />
    </Suspense>
  );
}

async function NextTestContent() {
  const NEXT = NEXT_TEST[await getCurrentProjectId()];
  return (
    <Page crumb="Tests / Next test">
      <div className="max-md:[&>div]:flex-col max-md:[&>div]:items-start w-full">
        <PageHeader
          title={NEXT.title}
          subtitle={NEXT.summary}
          actions={
            <div className="flex gap-2">
              <ButtonLink href="/setup/offers/a" variant="secondary">
                Change it
              </ButtonLink>
              <ConfirmButton label="Confirm the next test" doneLabel="Next test confirmed" />
            </div>
          }
        />
      </div>

      <Card className="flex w-full flex-col gap-2 p-5">
        <SectionTitle>Why this test</SectionTitle>
        <p className="text-[14px] leading-5 text-ink-2">{NEXT.why}</p>
      </Card>

      <div className="flex w-full items-start gap-6 max-md:flex-col">
        <ArmCard role="Control" {...NEXT.control} />
        <ArmCard role="Variant" {...NEXT.variant} />
      </div>

      <Card className="flex w-full flex-col gap-2 p-5">
        <SectionTitle>What stays the same</SectionTitle>
        <p className="text-[14px] leading-5 text-ink-2">{NEXT.staysTheSame}</p>
      </Card>
    </Page>
  );
}

function ArmCard({
  role,
  offer,
  headline,
  note,
}: {
  role: "Control" | "Variant";
  offer: string;
  headline: string;
  note: string;
}) {
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-2.5 p-5 max-md:w-full">
      <div className="flex w-full items-center gap-2">
        <Tag tone={role === "Variant" ? "accent" : "gray"}>{role}</Tag>
        <p className="text-[15px] font-semibold text-ink">{offer}</p>
      </div>
      <p className="text-[16px] font-semibold leading-[22px] text-ink">{headline}</p>
      <p className="text-[13px] text-muted">{note}</p>
    </Card>
  );
}
