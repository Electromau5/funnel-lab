// Mock offer data shared by the Offers list (7:328) and Offer detail (8:144),
// one set per project.

import type { ProjectId } from "@/lib/projects";

export type ScoreKey = "Dream outcome" | "Likelihood" | "Time delay" | "Effort";

export type OfferScore = {
  label: ScoreKey;
  value: number; // out of 10
  weak?: boolean;
  // What the score means for this offer (shown on the detail page).
  detail?: string;
};

export type OfferMessage = {
  tag: string;
  subject: string;
  body: string;
};

export type Offer = {
  id: string;
  name: string; // "Offer A"
  title: string;
  scores: OfferScore[];
  weakNote: string;
  messages: OfferMessage[];
};

// The rule from $100M Offers behind each Value Equation score.
export const SCORE_RULES: Record<ScoreKey, string> = {
  "Dream outcome": "Name the result the buyer wants, in their own words.",
  Likelihood: "Show proof it worked for a company like theirs.",
  "Time delay": "Shorten the time until the buyer sees a first result.",
  Effort: "Cut the work the buyer has to do themselves.",
};

export const OFFERS: Record<ProjectId, Offer[]> = {
  "property-managers": [
    {
      id: "a",
      name: "Offer A",
      title: "One intake tool for every maintenance request, live in 3 weeks",
      scores: [
        {
          label: "Dream outcome",
          value: 8,
          detail: "Every request from text, email, phone and the front desk lands in one place and gets tracked until it is done.",
        },
        {
          label: "Likelihood",
          value: 4,
          weak: true,
          detail: "No before-and-after yet from a property manager. The builds you can show are for other jobs.",
        },
        {
          label: "Time delay",
          value: 7,
          detail: "A Pilot Build puts the tool on real requests within 3 weeks.",
        },
        {
          label: "Effort",
          value: 7,
          detail: "You build and train; their team gives a few hours to show how the job runs today.",
        },
      ],
      weakNote:
        "Weak part. Likelihood: no before-and-after yet from a property manager, so owners cannot picture it working for them.",
      messages: [
        {
          tag: "First email",
          subject: "Two offices, one request pile?",
          body: "Hi Renee, Bayview just opened its Tampa office. When a property manager adds a second office, maintenance requests start arriving in two inboxes, two phones and a paper log at each front desk. We build one intake tool where every request lands and gets tracked until it is done. Worth 20 minutes next week? Artemis Design Labs",
        },
        {
          tag: "Follow-up, day 3",
          subject: "Re: Two offices, one request pile?",
          body: "Renee, one more note. The tool sorts each request by property and urgency, so nobody types the same details into three places. Open to a short call? Artemis Design Labs",
        },
      ],
    },
    {
      id: "b",
      name: "Offer B",
      title: "A free 30-minute audit that counts what your request pile costs",
      scores: [
        {
          label: "Dream outcome",
          value: 5,
          weak: true,
          detail: "An audit names the cost of the manual work but does not remove it.",
        },
        { label: "Likelihood", value: 8 },
        { label: "Time delay", value: 9 },
        { label: "Effort", value: 8 },
      ],
      weakNote:
        "Weak part. Dream outcome: an audit counts the hours the request pile costs but does not remove them.",
      messages: [],
    },
  ],
  "funded-startups": [
    {
      id: "a",
      name: "Offer A",
      title: "Your operations layer built in 4 weeks, so engineers stay on product",
      scores: [
        {
          label: "Dream outcome",
          value: 8,
          detail: "Reporting, records and approvals in one internal tool, built before headcount doubles.",
        },
        { label: "Likelihood", value: 6, detail: "Two internal tools shipped for other startups." },
        { label: "Time delay", value: 6, detail: "A Full Build goes live in 3 to 4 weeks." },
        {
          label: "Effort",
          value: 5,
          weak: true,
          detail: "The COO has to free up the people who run the job today for interviews in week one.",
        },
      ],
      weakNote:
        "Weak part. Effort: the COO has to free up the people who run the job today for interviews in week one.",
      messages: [
        {
          tag: "First email",
          subject: "After the Series A: who builds the ops layer?",
          body: "Hi Nina, congratulations on Ledgerline's Series A. After a round, the board wants operations to scale before headcount doubles, and the internal tools usually land on the engineers. We build that layer in 4 weeks and train your team to run it. Worth 20 minutes next week? Artemis Design Labs",
        },
      ],
    },
    {
      id: "b",
      name: "Offer B",
      title: "A pilot on the one job that eats your team's week, live in 3 weeks",
      scores: [
        { label: "Dream outcome", value: 6 },
        { label: "Likelihood", value: 7 },
        { label: "Time delay", value: 8 },
        {
          label: "Effort",
          value: 6,
          weak: true,
          detail: "The team has to name the job and count its hours before the pilot starts.",
        },
      ],
      weakNote:
        "Weak part. Effort: the team has to name the job and count its hours before the pilot starts.",
      messages: [],
    },
  ],
};

export function getOffers(projectId: ProjectId) {
  return OFFERS[projectId];
}

export function getOffer(projectId: ProjectId, id: string) {
  return OFFERS[projectId].find((o) => o.id === id);
}
