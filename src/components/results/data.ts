// Results for each project: the variant table (11:479), booked calls per offer,
// the booked call list (10:487) and the Friday update (11:326).

import type { ProjectId } from "@/lib/projects";

export type ResultRow = {
  type: "ICP" | "Offer" | "Channel";
  variant: string;
  sends: number;
  replies: number;
  booked: number;
  closed: number;
  verdict: string;
  flag?: boolean;
};

export type BookedCall = {
  when: string;
  prospect: string;
  offer: string;
  owner: string;
  thread: string;
};

export type FridayUpdate = {
  headline: string;
  summary: string;
  bars: { label: string; booked: number }[];
  alert?: { title: string; body: string };
  nextTest: string;
};

type ProjectResults = {
  rows: ResultRow[];
  bookedByOffer: Record<string, number>;
  calls: BookedCall[];
  update: FridayUpdate;
};

export const RESULTS: Record<ProjectId, ProjectResults> = {
  "property-managers": {
    rows: [
      {
        type: "ICP",
        variant: "Owners or COOs, property management, 20 to 150 staff, second office",
        sends: 240,
        replies: 14,
        booked: 3,
        closed: 0,
        verdict: "Keep. This ICP books calls.",
      },
      {
        type: "Offer",
        variant: "Offer B: free 30-minute audit of the request pile",
        sends: 120,
        replies: 6,
        booked: 3,
        closed: 0,
        verdict: "Keep. Books calls.",
      },
      {
        type: "Offer",
        variant: "Offer A: one intake tool, live in 3 weeks",
        sends: 120,
        replies: 8,
        booked: 0,
        closed: 0,
        verdict: "Change. Replies, no calls. Next test adds a before-and-after.",
        flag: true,
      },
      {
        type: "Channel",
        variant: "Cold email",
        sends: 240,
        replies: 14,
        booked: 3,
        closed: 0,
        verdict: "Keep. All calls so far.",
      },
      {
        type: "Channel",
        variant: "Warm outreach",
        sends: 0,
        replies: 0,
        booked: 0,
        closed: 0,
        verdict: "Not tested yet.",
      },
    ],
    bookedByOffer: { "Offer A": 0, "Offer B": 3 },
    calls: [
      {
        when: "Tue, Nov 10, 10:00",
        prospect: "Alicia Grant, Summit Ridge Property Co.",
        offer: "Offer B · Test 1",
        owner: "You",
        thread: "/replies/alicia-grant",
      },
      {
        when: "Wed, Nov 11, 14:00",
        prospect: "Sara Lindqvist, Harborview Rentals",
        offer: "Offer B · Test 1",
        owner: "Your cofounder",
        thread: "/replies/sara-lindqvist",
      },
      {
        when: "Thu, Nov 12, 9:00",
        prospect: "Tanya Brooks, Oakline Property Services",
        offer: "Offer B · Test 1",
        owner: "You",
        thread: "/replies/tanya-brooks",
      },
    ],
    update: {
      headline: "3 booked calls this week",
      summary: "All three came from Offer B, the free audit. Offer A got more replies and no calls.",
      bars: [
        { label: "Offer B (control)", booked: 3 },
        { label: "Offer A (variant)", booked: 0 },
      ],
      alert: {
        title: "Offer A gets replies but no booked calls",
        body: "Likely cause: the offer. Owners ask for an example from a company like theirs.",
      },
      nextTest:
        "Offer A2 (with a before-and-after from a real build) against Offer B. Queued to start when Test 1 ends on Fri, Nov 6.",
    },
  },
  "funded-startups": {
    rows: [
      {
        type: "ICP",
        variant: "COOs, enterprise B2B startups, 15 to 60 staff, raised in 6 months",
        sends: 96,
        replies: 5,
        booked: 1,
        closed: 0,
        verdict: "Too early. One week of sends.",
      },
      {
        type: "Offer",
        variant: "Offer B: a pilot on one job, live in 3 weeks",
        sends: 48,
        replies: 2,
        booked: 1,
        closed: 0,
        verdict: "Keep testing. Booked the only call.",
      },
      {
        type: "Offer",
        variant: "Offer A: operations layer in 4 weeks",
        sends: 48,
        replies: 3,
        booked: 0,
        closed: 0,
        verdict: "Too early. Replies, no calls yet.",
      },
      {
        type: "Channel",
        variant: "Cold email",
        sends: 96,
        replies: 5,
        booked: 1,
        closed: 0,
        verdict: "Keep. All calls so far.",
      },
      {
        type: "Channel",
        variant: "Warm introductions",
        sends: 0,
        replies: 0,
        booked: 0,
        closed: 0,
        verdict: "Queued for Test 2.",
      },
    ],
    bookedByOffer: { "Offer A": 0, "Offer B": 1 },
    calls: [
      {
        when: "Thu, Nov 12, 11:00",
        prospect: "Owen Fischer, Brightwire Analytics",
        offer: "Offer B · Test 1",
        owner: "You",
        thread: "/replies/owen-fischer",
      },
    ],
    update: {
      headline: "1 booked call this week",
      summary: "The first week of sends. The call came from Offer B, the pilot. No alert yet.",
      bars: [
        { label: "Offer B (control)", booked: 1 },
        { label: "Offer A (variant)", booked: 0 },
      ],
      nextTest:
        "Test 2 moves Offer B to warm introductions through investors, against cold email. Queued to start when Test 1 ends on Fri, Nov 13.",
    },
  },
};
