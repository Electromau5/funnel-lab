// Batches for the Approvals list (9:272) and Batch review (9:389), across
// every project. Each list row opens the batch detail it belongs to.

import type { ProjectId } from "@/lib/projects";

export type BatchMessage = {
  id: string;
  to: string;
  subject: string;
  body: string;
  hint?: string;
};

export type BatchDetail = {
  id: string;
  project: ProjectId;
  date: string;
  offer: string;
  total: number;
  test: string;
  offerLine: string;
  role: string;
  icp: string;
  messages: BatchMessage[];
  /** A message the review opens mid-edit, as drawn in Figma. */
  initialEdit?: { id: string; draft: string };
};

export type BatchRow = {
  project: ProjectId;
  batch: string;
  testAndOffer: string;
  messages: number;
  status: string;
  waiting: boolean;
  detailId: string;
};

const SIGN = "Artemis Design Labs";
const PM_SUBJECT = "Two offices, one request pile?";

export const BATCH_DETAILS: BatchDetail[] = [
  {
    id: "pm-offer-a",
    project: "property-managers",
    date: "Thu, Nov 5",
    offer: "Offer A",
    total: 24,
    test: "Test 1: Offer A vs Offer B",
    offerLine: "Offer A: One intake tool for every maintenance request, live in 3 weeks",
    role: "Variant (Offer B is the control)",
    icp: "Owners or COOs at US property management companies, 20 to 150 employees, second office",
    messages: [
      {
        id: "diane-foster",
        to: "Diane Foster, Westbrook Property Group",
        subject: PM_SUBJECT,
        body: `Hi Diane, Westbrook opened its Raleigh office this fall. When a property manager adds a second office, maintenance requests start arriving in two inboxes, two phones and a paper log at each front desk. We build one intake tool where every request lands and gets tracked until it is done. Worth 20 minutes next week? ${SIGN}`,
      },
      {
        id: "luis-herrera",
        to: "Luis Herrera, Cornerstone Residential",
        subject: PM_SUBJECT,
        body: `Hi Luis, a second office usually means the same request gets typed into three places. We build one intake tool that sorts every request by property and urgency. Worth 20 minutes next week? ${SIGN}`,
      },
      {
        id: "kim-nguyen",
        to: "Kim Nguyen, Lakeside Property Partners",
        subject: PM_SUBJECT,
        body: `Hi Kim, Lakeside opened a second office in October. We build one intake tool where every request lands and gets tracked until it is done. Worth 20 minutes next week? ${SIGN}`,
        hint: "Check the last line: does the tool connect to AppFolio today?",
      },
    ],
    initialEdit: {
      id: "kim-nguyen",
      draft: `Hi Kim, Lakeside opened a second office in October. We build one intake tool where every request lands and gets tracked until it is done, and it syncs with AppFolio out of the box.`,
    },
  },
  {
    id: "pm-offer-b",
    project: "property-managers",
    date: "Thu, Nov 5",
    offer: "Offer B",
    total: 24,
    test: "Test 1: Offer A vs Offer B",
    offerLine: "Offer B: A free 30-minute audit that counts what your request pile costs",
    role: "Control",
    icp: "Owners or COOs at US property management companies, 20 to 150 employees, second office",
    messages: [
      {
        id: "greg-sutton",
        to: "Greg Sutton, Riverbend Property Management",
        subject: "What does your request pile cost?",
        body: `Hi Greg, most owners we talk to cannot say how many hours a week their team spends typing requests into three places. In a free 30-minute audit we count it, in writing, with three things to fix first. Worth it? ${SIGN}`,
      },
      {
        id: "paula-mendes",
        to: "Paula Mendes, Crescent Point Properties",
        subject: "What does your request pile cost?",
        body: `Hi Paula, a second office doubles the requests your front desks log by hand. A free 30-minute audit counts what that costs you each week. Worth it? ${SIGN}`,
      },
      {
        id: "andre-wallace",
        to: "Andre Wallace, Maple Grove Management",
        subject: "What does your request pile cost?",
        body: `Hi Andre, in 30 minutes we count the hours your team spends on maintenance intake and send you the number in writing. No pitch on the call. Worth it? ${SIGN}`,
      },
    ],
  },
  {
    id: "fs-offer-a",
    project: "funded-startups",
    date: "Thu, Nov 5",
    offer: "Offer A",
    total: 12,
    test: "Test 1: Offer A vs Offer B",
    offerLine: "Offer A: Your operations layer built in 4 weeks, so engineers stay on product",
    role: "Variant (Offer B is the control)",
    icp: "COOs at enterprise B2B startups, 15 to 60 employees, raised in the last 6 months",
    messages: [
      {
        id: "grace-liu",
        to: "Grace Liu, Northstack",
        subject: "After the Series A: who builds the ops layer?",
        body: `Hi Grace, congratulations on Northstack's Series A. After a round, the internal tools usually land on the engineers. We build that layer in 4 weeks and train your team to run it. Worth 20 minutes next week? ${SIGN}`,
      },
      {
        id: "imani-carter",
        to: "Imani Carter, Corvid Security",
        subject: "After the Series A: who builds the ops layer?",
        body: `Hi Imani, Corvid raised in September. When a team doubles, the reporting that one person built by hand stops scaling. We build the operations layer in 4 weeks. Worth 20 minutes? ${SIGN}`,
      },
      {
        id: "ethan-moore",
        to: "Ethan Moore, Fieldnote AI",
        subject: "After the seed: who builds the ops layer?",
        body: `Hi Ethan, congratulations on the seed. We build the internal tools your team runs on in 4 weeks, so your engineers stay on Fieldnote. Worth 20 minutes next week? ${SIGN}`,
      },
    ],
  },
];

export const BATCH_ROWS: BatchRow[] = [
  { project: "property-managers", batch: "Thu, Nov 5, morning batch", testAndOffer: "Test 1 · Offer A", messages: 24, status: "Waiting for you", waiting: true, detailId: "pm-offer-a" },
  { project: "property-managers", batch: "Thu, Nov 5, morning batch", testAndOffer: "Test 1 · Offer B", messages: 24, status: "Waiting for you", waiting: true, detailId: "pm-offer-b" },
  { project: "funded-startups", batch: "Thu, Nov 5, morning batch", testAndOffer: "Test 1 · Offer A", messages: 12, status: "Waiting for you", waiting: true, detailId: "fs-offer-a" },
  { project: "property-managers", batch: "Wed, Nov 4", testAndOffer: "Test 1 · Offer A", messages: 24, status: "Approved, sent 8:00", waiting: false, detailId: "pm-offer-a" },
  { project: "property-managers", batch: "Wed, Nov 4", testAndOffer: "Test 1 · Offer B", messages: 24, status: "Edited by your cofounder, approved by you", waiting: false, detailId: "pm-offer-b" },
  { project: "funded-startups", batch: "Wed, Nov 4", testAndOffer: "Test 1 · Offer B", messages: 12, status: "Approved, sent 8:00", waiting: false, detailId: "fs-offer-a" },
  { project: "property-managers", batch: "Fri, Oct 30", testAndOffer: "Test 1 · Offer A", messages: 24, status: "Held by your cofounder", waiting: false, detailId: "pm-offer-a" },
];

export function getBatch(id: string | undefined): BatchDetail {
  return BATCH_DETAILS.find((b) => b.id === id) ?? BATCH_DETAILS[0];
}
