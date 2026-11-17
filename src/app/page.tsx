import Link from "next/link";
import { ButtonLink, Card, Tag } from "@/components/ui";

// Figma: Landing page (5:2)
export default function LandingPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center bg-white">
      <header className="flex w-full items-center justify-between gap-4 border-b border-line px-20 py-5 max-lg:px-8 max-md:px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="size-5 rounded-[5px] bg-accent" />
          <span className="text-[16px] font-bold text-ink">Funnel Lab</span>
        </Link>
        <nav className="flex items-center gap-7 max-md:gap-4">
          <a href="#how-it-works" className="text-[14px] font-medium text-ink-2 hover:text-ink max-md:hidden">
            How it works
          </a>
          <a href="#pricing" className="text-[14px] font-medium text-ink-2 hover:text-ink max-md:hidden">
            Pricing
          </a>
          <Link href="/sign-in" className="text-[14px] font-medium text-ink-2 hover:text-ink">
            Sign in
          </Link>
          <ButtonLink href="/signup">Sign up</ButtonLink>
        </nav>
      </header>

      <section className="flex w-full flex-col items-center gap-5 px-20 pt-[88px] pb-16 max-lg:px-8 max-md:px-4 max-md:pt-12">
        <Tag className="max-w-full whitespace-normal text-center">
          For first-time B2B founders with no sales background
        </Tag>
        <h1 className="max-w-[900px] text-center text-[48px] leading-[56px] font-bold text-ink max-md:text-[32px] max-md:leading-[40px]">
          Find out who buys your product and which offer books calls
        </h1>
        <p className="max-w-[720px] text-center text-[18px] leading-7 text-ink-2 max-md:text-[16px] max-md:leading-6">
          Describe your product in plain words. Funnel Lab names your first buyer, writes two
          offers, sends small tests each day and tells you which part worked. Nothing sends until
          you approve it.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/signup">Sign up</ButtonLink>
          <ButtonLink href="#sample-update" variant="secondary">
            Read the sample update
          </ButtonLink>
        </div>
      </section>

      <section className="flex w-full items-start gap-8 px-20 pb-16 max-lg:flex-col max-lg:px-8 max-md:px-4">
        <SampleUpdate />
        <div id="how-it-works" className="flex min-w-0 flex-1 scroll-mt-6 flex-col gap-4 max-lg:w-full">
          <h2 className="text-[20px] font-bold text-ink">How it works</h2>
          <Step
            title="1. Describe your product"
            body="Answer a few plain questions. Funnel Lab names the buyer and the moment they need you."
          />
          <Step
            title="2. Approve the day's messages"
            body="About two minutes on your phone. Approve all, edit one or hold the batch."
          />
          <Step
            title="3. Read Friday's update"
            body="Booked calls per offer, any alert, and the next test to run."
          />
        </div>
      </section>

      <section id="pricing" className="flex w-full scroll-mt-6 flex-col items-center px-20 pb-20 max-lg:px-8 max-md:px-4">
        <Card className="flex w-[520px] max-w-full flex-col items-center gap-3 p-7">
          <p className="text-[32px] font-bold text-ink">$149 a month</p>
          <p className="max-w-[440px] text-center text-[14px] leading-5 text-ink-2">
            One company. Founder and cofounder seats, lead data and sending within the plan&apos;s
            test volume.
          </p>
          <p className="max-w-[440px] text-center text-[13px] text-muted">
            Outbound agencies charge $150 to $750 per booked meeting.
          </p>
          <ButtonLink href="/signup">Sign up</ButtonLink>
        </Card>
      </section>

      <footer className="mt-auto flex w-full justify-center bg-canvas px-20 py-6 max-md:px-4">
        <p className="text-center text-[13px] font-medium text-ink-2">
          Nothing sends without your approval.
        </p>
      </footer>
    </div>
  );
}

const SAMPLE_ROWS = [
  { offer: "Offer B (control)", sends: "120 sends", replies: "6 replies", calls: "4 booked calls" },
  { offer: "Offer A", sends: "120 sends", replies: "11 replies", calls: "0 booked calls" },
];

function SampleUpdate() {
  return (
    <div id="sample-update" className="w-[760px] max-w-full shrink-0 scroll-mt-6 max-lg:w-full">
      <Card className="flex w-full flex-col items-start gap-4 p-7 max-md:p-5">
        <Tag tone="accent" className="max-w-full whitespace-normal">
          Sample update shared by a founder in a founder WhatsApp group
        </Tag>
        <h2 className="text-[22px] font-bold text-ink">Friday update, week 2</h2>
        <p className="text-[16px] font-semibold text-ink">4 booked calls this week</p>
        <div className="flex w-full flex-col gap-2">
          {SAMPLE_ROWS.map((row) => (
            <div
              key={row.offer}
              className="flex w-full items-start gap-4 rounded-[6px] bg-canvas px-3 py-2.5 text-[14px] text-ink max-md:flex-wrap max-md:gap-x-4 max-md:gap-y-1"
            >
              <span className="w-[220px] font-semibold max-md:w-full">{row.offer}</span>
              <span className="w-[140px] max-md:w-auto">{row.sends}</span>
              <span className="w-[140px] max-md:w-auto">{row.replies}</span>
              <span className="w-[140px] font-semibold max-md:w-auto">{row.calls}</span>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col gap-1.5 rounded-[8px] border border-accent bg-accent-soft p-4 text-[14px]">
          <p className="font-semibold text-accent">Alert: Offer A gets replies but no booked calls</p>
          <p className="leading-5 text-ink-2">
            Likely cause: the offer. Buyers wait 30 days to see a result, so they reply with questions
            and do not book.
          </p>
        </div>
        <p className="text-[14px] text-ink-2">
          Next test: Offer A with a first result in 7 days, against Offer B.
        </p>
      </Card>
    </div>
  );
}

function Step({ title, body }: { title: string; body: string }) {
  return (
    <Card className="flex w-full flex-col gap-1.5">
      <p className="text-[15px] font-semibold text-ink">{title}</p>
      <p className="text-[14px] leading-5 text-ink-2">{body}</p>
    </Card>
  );
}
