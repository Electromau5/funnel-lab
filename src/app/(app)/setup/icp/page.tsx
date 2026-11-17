import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { IcpPart } from "@/components/setup/icp-part";
import { SETUP } from "@/components/setup/setup-data";
import { SetupSteps } from "@/components/setup/setup-steps";
import { ButtonLink, Card, PageHeader } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";



// Figma: ICP (7:78), for the project picked in the switcher.
export default function IcpPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <IcpPageContent />
    </Suspense>
  );
}

async function IcpPageContent() {
  const projectId = await getCurrentProjectId();
  const { icp } = SETUP[projectId];
  return (
    <Page crumb="Setup / ICP">
      <SetupSteps />
      <PageHeader
        title="Your first ICP"
        subtitle="Built from your intake. Edit any part before Funnel Lab pulls leads."
        actions={
          <>
            <ButtonLink href="/setup/leads" variant="secondary">
              See lead sample
            </ButtonLink>
            <ButtonLink href="/setup/leads">Confirm the ICP</ButtonLink>
          </>
        }
      />
      <Card data-tour="icp" className="flex w-full flex-col gap-1.5 p-5!">
        <p className="text-[12px] font-semibold text-muted">In one sentence</p>
        <p className="text-[20px] font-semibold leading-7 text-ink">{icp.sentence}</p>
      </Card>
      {icp.parts.map((part) => (
        <IcpPart key={`${projectId}-${part.label}`} {...part} />
      ))}
    </Page>
  );
}
