import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { getOffers, type Offer, type OfferScore } from "@/components/setup/offers-data";
import { SetupSteps } from "@/components/setup/setup-steps";
import { ButtonLink, Card, Checkbox, PageHeader, Tag } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";

// Figma: Offers (7:328), for the project picked in the switcher.
export default function OffersPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <OffersPageContent />
    </Suspense>
  );
}

async function OffersPageContent() {
  const offers = getOffers(await getCurrentProjectId());
  return (
    <Page crumb="Setup / Offers">
      <SetupSteps />
      <PageHeader
        title="Offers for your ICP"
        subtitle="Each offer is scored on the Value Equation from $100M Offers. Pick two to test against each other."
        actions={<ButtonLink href="/setup/channels">Test these two offers</ButtonLink>}
      />
      <div data-tour="offers" className="flex w-full items-start gap-6 max-lg:flex-col">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </Page>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-3.5 p-6! max-lg:w-full">
      <div className="flex w-full items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-muted">{offer.name}</p>
        <Checkbox label={<span className="text-ink-2">Pick for testing</span>} defaultChecked />
      </div>
      <h2 className="text-[18px] font-semibold leading-6 text-ink">{offer.title}</h2>
      <div className="flex w-full flex-col gap-2.5">
        {offer.scores.map((score) => (
          <ScoreRow key={score.label} score={score} />
        ))}
      </div>
      <div className="w-full rounded-[6px] bg-canvas p-3">
        <p className="text-[13px] leading-[18px] text-ink-2">{offer.weakNote}</p>
      </div>
      <div>
        <ButtonLink href={`/setup/offers/${offer.id}`} variant="secondary">
          Open offer
        </ButtonLink>
      </div>
    </Card>
  );
}

// Score row (7:389): label, 160px track, value, optional "Weak part" tag.
function ScoreRow({ score }: { score: OfferScore }) {
  return (
    <div className="flex w-full items-center gap-3">
      <p className="w-[110px] shrink-0 text-[13px] font-medium text-ink">{score.label}</p>
      <div
        role="meter"
        aria-label={score.label}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={score.value}
        className="h-2 w-[160px] shrink overflow-hidden rounded-[4px] bg-chip"
      >
        <div
          className={`h-2 rounded-[4px] ${score.weak ? "bg-accent" : "bg-ink"}`}
          style={{ width: `${score.value * 10}%` }}
        />
      </div>
      <p className="shrink-0 text-[13px] font-semibold text-ink">{score.value}/10</p>
      {score.weak && <Tag tone="accent">Weak part</Tag>}
    </div>
  );
}
