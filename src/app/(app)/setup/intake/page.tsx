import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { PRODUCT_DESCRIPTION, SETUP } from "@/components/setup/setup-data";
import { SetupSteps } from "@/components/setup/setup-steps";
import { Button, ButtonLink, Card, Field, PageHeader } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";

// Figma: Intake (6:184), for the project picked in the switcher.
export default function IntakePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <IntakePageContent />
    </Suspense>
  );
}

async function IntakePageContent() {
  const { intake } = SETUP[await getCurrentProjectId()];
  return (
    <Page crumb="Setup / Intake">
      <SetupSteps />
      <PageHeader
        title="Describe your product"
        subtitle="Use plain words. Funnel Lab asks follow-up questions until it can name a buyer role and a buying trigger."
      />
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <div className="flex min-w-0 flex-1 flex-col gap-4 max-lg:w-full">
          <Card data-tour="intake" className="flex w-full flex-col gap-3 p-5!">
            <label
              htmlFor="product-description"
              className="text-[16px] font-semibold text-ink"
            >
              What does your product do, and who might it help?
            </label>
            <textarea
              id="product-description"
              defaultValue={PRODUCT_DESCRIPTION}
              className="min-h-24 w-full resize-y rounded-[8px] border border-line bg-white p-3.5 text-[14px] text-ink focus:border-accent focus:outline-none"
            />
          </Card>
          <Card className="flex w-full flex-col gap-3.5 p-5!">
            <h2 className="text-[16px] font-semibold text-ink">Follow-up questions</h2>
            <p className="text-[14px] text-ink-2">{intake.tooBroad}</p>
            {intake.followUps.map((q) => (
              <Field key={q.label} label={q.label} defaultValue={q.answer} />
            ))}
            <div className="flex flex-wrap items-start gap-2">
              <ButtonLink href="/setup/icp">Build my ICP</ButtonLink>
              <Button variant="secondary">Answer another question</Button>
            </div>
          </Card>
        </div>
        <aside className="flex w-[360px] shrink-0 flex-col gap-3 max-lg:w-full">
          <Card className="flex w-full flex-col gap-2.5 p-5!">
            <h2 className="text-[16px] font-semibold text-ink">What Funnel Lab has so far</h2>
            <SoFar label="Buyer role" value={intake.soFar.buyer} />
            <SoFar label="Buying trigger" value={intake.soFar.trigger} />
            <SoFar label="Industry" value={`${intake.soFar.industry} (to confirm)`} />
          </Card>
          <div className="w-full rounded-[6px] border border-line bg-white p-3">
            <p className="text-[13px] text-ink-2">
              No leads are pulled until the buyer role is named.
            </p>
          </div>
        </aside>
      </div>
    </Page>
  );
}

function SoFar({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[12px] text-muted">{label}</p>
      <p className="text-[14px] font-semibold text-ink">{value}</p>
    </div>
  );
}
