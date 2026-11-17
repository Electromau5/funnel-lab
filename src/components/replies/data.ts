// Reply and thread data shared by /replies and /replies/[id]. Every thread
// belongs to one project; the Replies list combines all projects.

import type { ProjectId } from "@/lib/projects";

export type ThreadMessage = {
  from: "funnel-lab" | "prospect";
  date: string;
  subject: string;
  body: string;
};

export type ReplyThread = {
  id: string;
  project: ProjectId;
  initials: string;
  name: string;
  company: string;
  /** Subtitle under the thread title, e.g. role and buying signal. */
  profile: string;
  test: string;
  offer: "Offer A" | "Offer B";
  offerLine: string;
  channel: string;
  bookedCall: string;
  /** The prospect's latest reply, shown quoted on the Replies list. */
  latestReply: string;
  /** Short suggested answer shown on the Replies list. */
  suggestedSummary?: string;
  /** Full suggested answer shown (and editable) in the thread. */
  suggestedAnswer?: string;
  /** True when Funnel Lab could not answer and the reply needs a person. */
  needsYou: boolean;
  messages: ThreadMessage[];
};

const SIGN = "Artemis Design Labs";
const PM_A = "Offer A: One intake tool for every maintenance request, live in 3 weeks";
const PM_B = "Offer B: A free 30-minute audit that counts what your request pile costs";
const FS_A = "Offer A: Your operations layer built in 4 weeks, so engineers stay on product";
const FS_B = "Offer B: A pilot on the one job that eats your team's week, live in 3 weeks";
const TEST_1 = "Test 1: Offer A vs Offer B";

export const threads: ReplyThread[] = [
  {
    id: "renee-castillo",
    project: "property-managers",
    initials: "RC",
    name: "Renee Castillo",
    company: "Bayview Property Management",
    profile: "Owner · 45 employees · opened a second office in Tampa",
    test: TEST_1,
    offer: "Offer A",
    offerLine: PM_A,
    channel: "Cold email",
    bookedCall: "None yet",
    latestReply: "We already pay for AppFolio. Why would we need another tool?",
    suggestedSummary:
      "AppFolio holds the records; the tool catches the requests that never reach it. Would a 20-minute call Thursday work?",
    suggestedAnswer: `Hi Renee, most of the owners we talk to run AppFolio too. It holds the records well; the trouble is the requests that arrive by text, phone and the front desk and never reach it. The tool catches those, sorts them and pushes them into AppFolio. Would a 20-minute call on Thursday work? ${SIGN}`,
    needsYou: true,
    messages: [
      {
        from: "funnel-lab",
        date: "Mon, Oct 26",
        subject: "Two offices, one request pile?",
        body: "Hi Renee, Bayview just opened its Tampa office. When a property manager adds a second office, maintenance requests start arriving in two inboxes...",
      },
      {
        from: "funnel-lab",
        date: "Thu, Oct 29",
        subject: "Re: Two offices, one request pile?",
        body: "Renee, one more note. The tool sorts each request by property and urgency...",
      },
      {
        from: "prospect",
        date: "Mon, Nov 2",
        subject: "Re: Two offices, one request pile?",
        body: "We already pay for AppFolio. Why would we need another tool?",
      },
    ],
  },
  {
    id: "mark-ostrowski",
    project: "property-managers",
    initials: "MO",
    name: "Mark Ostrowski",
    company: "Keystone Residential",
    profile: "COO · 120 employees · opened an office in Columbus",
    test: TEST_1,
    offer: "Offer A",
    offerLine: PM_A,
    channel: "Cold email",
    bookedCall: "None yet",
    latestReply: "What does something like this cost, roughly?",
    suggestedSummary:
      "A Pilot Build is a fixed $8,000 to $15,000 for one job. Can I show you what it covers on a 20-minute call?",
    suggestedAnswer: `Hi Mark, a Pilot Build is a fixed $8,000 to $15,000, depending on the job, and it is live on real requests within 3 weeks. Can I walk you through what it covers on a 20-minute call? ${SIGN}`,
    needsYou: true,
    messages: [
      {
        from: "funnel-lab",
        date: "Tue, Oct 27",
        subject: "Two offices, one request pile?",
        body: "Hi Mark, Keystone just opened its Columbus office. When a property manager adds a second office...",
      },
      {
        from: "prospect",
        date: "Tue, Nov 3",
        subject: "Re: Two offices, one request pile?",
        body: "What does something like this cost, roughly?",
      },
    ],
  },
  {
    id: "hector-ruiz",
    project: "property-managers",
    initials: "HR",
    name: "Hector Ruiz",
    company: "Pinecrest Management Group",
    profile: "President · 80 employees",
    test: TEST_1,
    offer: "Offer A",
    offerLine: PM_A,
    channel: "Cold email",
    bookedCall: "None yet",
    latestReply: "Can you send an example of something you built for a company like ours?",
    suggestedSummary:
      "No property manager yet. Here is a compliance tracker we built, with the hours it saved each week.",
    suggestedAnswer: `Hi Hector, we have not built for a property manager yet. Here is the closest example: a tracker for compliance work and renewals that flags what is about to slip, with the hours it saved each week. Worth 20 minutes to see how it would look for Pinecrest? ${SIGN}`,
    needsYou: true,
    messages: [
      {
        from: "funnel-lab",
        date: "Tue, Oct 27",
        subject: "Two offices, one request pile?",
        body: "Hi Hector, when a property manager adds a second office, maintenance requests start arriving in two inboxes...",
      },
      {
        from: "prospect",
        date: "Tue, Nov 3",
        subject: "Re: Two offices, one request pile?",
        body: "Can you send an example of something you built for a company like ours?",
      },
    ],
  },
  {
    id: "alicia-grant",
    project: "property-managers",
    initials: "AG",
    name: "Alicia Grant",
    company: "Summit Ridge Property Co.",
    profile: "Owner · 32 employees · took over a 400-unit portfolio",
    test: TEST_1,
    offer: "Offer B",
    offerLine: PM_B,
    channel: "Cold email",
    bookedCall: "Tue, Nov 10, 10:00 with you",
    latestReply: "Sure, Tuesday morning works for the audit.",
    needsYou: false,
    messages: [
      {
        from: "funnel-lab",
        date: "Mon, Oct 26",
        subject: "What does your request pile cost?",
        body: "Hi Alicia, taking over a 400-unit portfolio usually doubles the requests your team types by hand...",
      },
      {
        from: "prospect",
        date: "Fri, Oct 30",
        subject: "Re: What does your request pile cost?",
        body: "Sure, Tuesday morning works for the audit.",
      },
    ],
  },
  {
    id: "sara-lindqvist",
    project: "property-managers",
    initials: "SL",
    name: "Sara Lindqvist",
    company: "Harborview Rentals",
    profile: "COO · 60 employees · new office in Charlotte",
    test: TEST_1,
    offer: "Offer B",
    offerLine: PM_B,
    channel: "Cold email",
    bookedCall: "Wed, Nov 11, 14:00 with your cofounder",
    latestReply: "Wednesday afternoon is good. Send an invite.",
    needsYou: false,
    messages: [
      {
        from: "funnel-lab",
        date: "Tue, Oct 27",
        subject: "What does your request pile cost?",
        body: "Hi Sara, a new office in Charlotte means a second front desk taking requests...",
      },
      {
        from: "prospect",
        date: "Mon, Nov 2",
        subject: "Re: What does your request pile cost?",
        body: "Wednesday afternoon is good. Send an invite.",
      },
    ],
  },
  {
    id: "tanya-brooks",
    project: "property-managers",
    initials: "TB",
    name: "Tanya Brooks",
    company: "Oakline Property Services",
    profile: "Owner · 25 employees · second office opened in September",
    test: TEST_1,
    offer: "Offer B",
    offerLine: PM_B,
    channel: "Cold email",
    bookedCall: "Thu, Nov 12, 9:00 with you",
    latestReply: "Thursday at 9 works.",
    needsYou: false,
    messages: [
      {
        from: "funnel-lab",
        date: "Wed, Oct 28",
        subject: "What does your request pile cost?",
        body: "Hi Tanya, since Oakline opened its second office, requests come in at two front desks...",
      },
      {
        from: "prospect",
        date: "Tue, Nov 3",
        subject: "Re: What does your request pile cost?",
        body: "Thursday at 9 works.",
      },
    ],
  },
  {
    id: "nina-patel",
    project: "funded-startups",
    initials: "NP",
    name: "Nina Patel",
    company: "Ledgerline",
    profile: "COO · 42 employees · raised a $14M Series A in September",
    test: TEST_1,
    offer: "Offer A",
    offerLine: FS_A,
    channel: "Cold email",
    bookedCall: "None yet",
    latestReply: "We have 12 engineers. Why wouldn't we build this ourselves?",
    suggestedSummary:
      "You can, in about six months between everything else. We build it in 4 weeks and train your team to own it.",
    suggestedAnswer: `Hi Nina, you can, in about six months, between everything else your engineers own. We build this one tool end to end in 3 to 4 weeks and train your team to run it, so the engineers stay on Ledgerline. Worth 20 minutes to compare the two? ${SIGN}`,
    needsYou: true,
    messages: [
      {
        from: "funnel-lab",
        date: "Mon, Nov 2",
        subject: "After the Series A: who builds the ops layer?",
        body: "Hi Nina, congratulations on Ledgerline's Series A. After a round, the board wants operations to scale before headcount doubles...",
      },
      {
        from: "prospect",
        date: "Wed, Nov 4",
        subject: "Re: After the Series A: who builds the ops layer?",
        body: "We have 12 engineers. Why wouldn't we build this ourselves?",
      },
    ],
  },
  {
    id: "owen-fischer",
    project: "funded-startups",
    initials: "OF",
    name: "Owen Fischer",
    company: "Brightwire Analytics",
    profile: "Co-founder and CEO · 18 employees · raised a $4M seed in August",
    test: TEST_1,
    offer: "Offer B",
    offerLine: FS_B,
    channel: "Cold email",
    bookedCall: "Thu, Nov 12, 11:00 with you",
    latestReply: "Our onboarding reports eat a day a week. Thursday?",
    needsYou: false,
    messages: [
      {
        from: "funnel-lab",
        date: "Mon, Nov 2",
        subject: "One job that eats your team's week",
        body: "Hi Owen, after a seed round, one manual job usually starts eating a full day a week...",
      },
      {
        from: "prospect",
        date: "Wed, Nov 4",
        subject: "Re: One job that eats your team's week",
        body: "Our onboarding reports eat a day a week. Thursday?",
      },
    ],
  },
];

export function getThread(id: string): ReplyThread | undefined {
  return threads.find((t) => t.id === id);
}

export const repliesNeedingYou = threads.filter((t) => t.needsYou);

export function firstName(thread: ReplyThread) {
  return thread.name.split(" ")[0];
}
