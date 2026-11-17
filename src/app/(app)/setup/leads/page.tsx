import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { LeadTable } from "@/components/setup/lead-table";
import { SETUP } from "@/components/setup/setup-data";
import { SetupSteps } from "@/components/setup/setup-steps";
import { ButtonLink, PageHeader, Tag } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";

// Figma: Lead sample (7:171), for the project picked in the switcher.
export default function LeadSamplePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LeadSampleContent />
    </Suspense>
  );
}

async function LeadSampleContent() {
  const projectId = await getCurrentProjectId();
  const { leads, leadTotal } = SETUP[projectId];
  return (
    <Page crumb="Setup / ICP / Lead sample">
      <SetupSteps />
      <PageHeader
        title={`${leadTotal} sample leads that match your ICP`}
        subtitle="Check that these look like people who would buy. If they do not, go back and edit the ICP."
        actions={
          <>
            <ButtonLink href="/setup/icp" variant="secondary">
              Edit the ICP
            </ButtonLink>
            <ButtonLink href="/setup/offers">Leads look right</ButtonLink>
          </>
        }
      />
      <div className="flex w-full flex-wrap items-center gap-2">
        <Tag>Sample data</Tag>
        <p className="text-[13px] text-muted">
          Mock contacts for the prototype. Nothing has been sent.
        </p>
      </div>
      <LeadTable key={projectId} leads={leads} total={leadTotal} />
    </Page>
  );
}
