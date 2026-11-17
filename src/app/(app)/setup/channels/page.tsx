import Image from "next/image";
import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { SetupSteps } from "@/components/setup/setup-steps";
import { ButtonLink, Card, Checkbox, PageHeader } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";
import type { ProjectId } from "@/lib/projects";

type Channel = { rank: number; title: string; why: string; testFirst: boolean };

const CHANNELS: Record<ProjectId, Channel[]> = {
  "property-managers": [
    {
      rank: 1,
      title: "Cold outreach  ·  Email to the 40 sample owners and COOs",
      why: "Ranked first. You have 40 named buyers with a fresh trigger, and results show within a week.",
      testFirst: true,
    },
    {
      rank: 2,
      title: "Warm outreach  ·  Referrals from people you know in property management",
      why: "Ranked second. A short list, but owners reply fast to someone they trust.",
      testFirst: true,
    },
    {
      rank: 3,
      title: "Content  ·  LinkedIn posts on the manual jobs in a property office",
      why: "Ranked third. Posts take weeks before they bring calls.",
      testFirst: false,
    },
    {
      rank: 4,
      title: "Paid ads  ·  Ads aimed at property management owners",
      why: "Ranked fourth. Ads cost money before you know which offer works.",
      testFirst: false,
    },
  ],
  "funded-startups": [
    {
      rank: 1,
      title: "Cold outreach  ·  Email to COOs at startups that raised in the last 6 months",
      why: "Ranked first. Funding rounds are public, so every lead has a dated trigger.",
      testFirst: true,
    },
    {
      rank: 2,
      title: "Warm outreach  ·  Introductions through investors and founder friends",
      why: "Ranked second. Investors want their new portfolio companies to scale operations.",
      testFirst: true,
    },
    {
      rank: 3,
      title: "Content  ·  LinkedIn posts on operations after a round",
      why: "Ranked third. Founders read operations posts, but posts take weeks to bring calls.",
      testFirst: false,
    },
    {
      rank: 4,
      title: "Paid ads  ·  Ads aimed at startup COOs",
      why: "Ranked fourth. Ads cost money before you know which offer works.",
      testFirst: false,
    },
  ],
};

// Figma: Channels (8:238), for the project picked in the switcher.
export default function ChannelsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ChannelsPageContent />
    </Suspense>
  );
}

async function ChannelsPageContent() {
  const projectId = await getCurrentProjectId();
  const channels = CHANNELS[projectId];
  return (
    <Page crumb="Setup / Channels">
      <SetupSteps />
      <PageHeader
        title="Channels to test first"
        subtitle="The Core Four from $100M Leads, ranked with the Bullseye method from Traction. Test the top two, keep what books calls."
        actions={<ButtonLink href="/tests/1">Start the first test</ButtonLink>}
      />
      <div className="flex w-full items-start gap-8 max-lg:flex-col max-lg:gap-6">
        <Card className="flex w-[360px] shrink-0 flex-col gap-3 p-6! max-lg:w-full max-lg:items-center max-sm:p-4!">
          <h2 className="self-start text-[15px] font-semibold text-ink">Bullseye</h2>
          <Bullseye />
        </Card>
        <div data-tour="channels" className="flex min-w-0 flex-1 flex-col gap-3 max-lg:w-full">
          {channels.map((c) => (
            <Card key={`${projectId}-${c.rank}`} className="w-full p-[18px]">
              <div className="flex w-full items-center gap-4 max-sm:flex-wrap">
                <p className="shrink-0 text-[20px] font-bold text-muted">{c.rank}</p>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="whitespace-pre-wrap text-[15px] font-semibold text-ink">
                    {c.title}
                  </p>
                  <p className="text-[13px] leading-[18px] text-ink-2">{c.why}</p>
                </div>
                <Checkbox
                  label={<span className="text-ink-2">Test first</span>}
                  defaultChecked={c.testFirst}
                  className="shrink-0"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}

// Bullseye rings (8:293): three concentric rings with centered labels.
function Bullseye() {
  return (
    <div className="relative size-[312px] shrink-0 overflow-hidden max-sm:-my-4 max-sm:scale-[0.88]">
      <Image src="/setup/bullseye-outer.svg" alt="" width={312} height={312} className="absolute left-0 top-0" />
      <Image src="/setup/bullseye-middle.svg" alt="" width={216} height={216} className="absolute left-12 top-12" />
      <Image src="/setup/bullseye-inner.svg" alt="" width={120} height={120} className="absolute left-24 top-24" />
      <Label className="top-4 text-[12px] font-semibold text-muted">Not now</Label>
      <Label className="top-16 text-[12px] font-semibold text-ink-2">Maybe later</Label>
      <Label className="top-[140px] text-[12px] font-semibold text-accent">Test first</Label>
      <Label className="top-[160px] text-[11px] text-ink">Cold, Warm</Label>
    </div>
  );
}

function Label({ className, children }: { className: string; children: string }) {
  return (
    <p className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${className}`}>{children}</p>
  );
}
