import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { notFound } from "next/navigation";
import { Page } from "@/components/app-shell";
import { getOffer, SCORE_RULES, type OfferScore } from "@/components/setup/offers-data";
import { SetupSteps } from "@/components/setup/setup-steps";
import { Button, Card, PageHeader, SectionTitle, Tag } from "@/components/ui";
import { getCurrentProjectId } from "@/lib/current-project";

// Offer ids ("a", "b") are the same in every project.
export function generateStaticParams() {
  return [{ id: "a" }, { id: "b" }];
}

// Figma: Offer detail (8:144)
export default function OfferDetailPage(props: PageProps<"/setup/offers/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <OfferDetailPageContent {...props} />
    </Suspense>
  );
}

async function OfferDetailPageContent(props: PageProps<"/setup/offers/[id]">) {
  const { id } = await props.params;
  const offer = getOffer(await getCurrentProjectId(), id);
  if (!offer) notFound();

  return (
    <Page crumb={`Setup / Offers / ${offer.name}`}>
      <SetupSteps />
      <PageHeader
        title={`${offer.name}: ${offer.title}`}
        subtitle="Four Value Equation scores, the rule behind each, and the messages built from this offer."
        actions={
          <>
            <Button variant="secondary">Edit the offer</Button>
            <Button>Regenerate the weak part</Button>
          </>
        }
      />
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <div className="flex min-w-0 flex-1 flex-col gap-3 max-lg:w-full">
          {offer.scores.map((score) => (
            <ScoreCard key={score.label} score={score} />
          ))}
        </div>
        {offer.messages.length > 0 && (
          <section className="flex w-[480px] shrink-0 flex-col gap-3 max-lg:w-full">
            <SectionTitle>Messages built from this offer</SectionTitle>
            {offer.messages.map((m) => (
              <Card key={m.tag} className="flex w-full flex-col items-start gap-1.5">
                <Tag>{m.tag}</Tag>
                <p className="text-[14px] font-semibold text-ink">{m.subject}</p>
                <p className="text-[13px] leading-[19px] text-ink-2">{m.body}</p>
              </Card>
            ))}
          </section>
        )}
      </div>
    </Page>
  );
}

// Score card (8:200); the weak part is highlighted (8:212).
function ScoreCard({ score }: { score: OfferScore }) {
  return (
    <div
      className={`flex w-full flex-col gap-1.5 rounded-[8px] p-[18px] ${
        score.weak ? "border-[1.5px] border-accent bg-accent-soft" : "border border-line bg-white"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-[15px] text-ink">
        <p className="font-semibold">{score.label}</p>
        <p className="font-bold">{score.value}/10</p>
        {score.weak && <Tag tone="accent">Weak part</Tag>}
      </div>
      {score.detail && <p className="text-[14px] leading-5 text-ink-2">{score.detail}</p>}
      <p className="text-[13px] text-muted">Rule from $100M Offers: {SCORE_RULES[score.label]}</p>
    </div>
  );
}
