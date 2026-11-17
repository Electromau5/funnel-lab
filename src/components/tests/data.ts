// Mock data for the Tests section (Figma: Test detail 8:338, Next test 9:206),
// one set per project.

import type { ProjectId } from "@/lib/projects";

export type TestArm = {
  role: "Control" | "Variant";
  offer: string;
  headline: string;
  sends: number;
  replies: number;
  bookedCalls: number;
};

export type TestDetail = {
  id: string;
  title: string;
  summary: string;
  alert?: { title: string; body: string };
  control: TestArm;
  variant: TestArm;
  batchPlan: string;
};

export type NextTest = {
  title: string;
  summary: string;
  why: string;
  control: { offer: string; headline: string; note: string };
  variant: { offer: string; headline: string; note: string };
  staysTheSame: string;
};

export const TESTS: Record<ProjectId, Record<string, TestDetail>> = {
  "property-managers": {
    "1": {
      id: "1",
      title: "Test 1: Offer A vs Offer B",
      summary:
        "What it changes: the offer. Same ICP, same channel (cold email). Running since Mon, Oct 26.",
      alert: {
        title: "Offer A gets replies but no booked calls",
        body: "8 replies and 0 booked calls from 120 sends, while Offer B booked 3 calls from the same ICP. Likely cause: the offer. Its likelihood scores 4/10: owners reply asking for an example from a company like theirs, then go quiet. Proposed next test: Offer A with a before-and-after from a real build, against Offer B as the control.",
      },
      control: {
        role: "Control",
        offer: "Offer B",
        headline: "A free 30-minute audit that counts what your request pile costs",
        sends: 120,
        replies: 6,
        bookedCalls: 3,
      },
      variant: {
        role: "Variant",
        offer: "Offer A",
        headline: "One intake tool for every maintenance request, live in 3 weeks",
        sends: 120,
        replies: 8,
        bookedCalls: 0,
      },
      batchPlan:
        "24 messages a day per variant, Monday to Friday. Each batch waits for approval, then sends at 8:00. The test ends Fri, Nov 6.",
    },
  },
  "funded-startups": {
    "1": {
      id: "1",
      title: "Test 1: Offer A vs Offer B",
      summary:
        "What it changes: the offer. Same ICP, same channel (cold email). Running since Mon, Nov 2.",
      control: {
        role: "Control",
        offer: "Offer B",
        headline: "A pilot on the one job that eats your team's week, live in 3 weeks",
        sends: 48,
        replies: 2,
        bookedCalls: 1,
      },
      variant: {
        role: "Variant",
        offer: "Offer A",
        headline: "Your operations layer built in 4 weeks, so engineers stay on product",
        sends: 48,
        replies: 3,
        bookedCalls: 0,
      },
      batchPlan:
        "12 messages a day per variant, Monday to Friday. Each batch waits for approval, then sends at 8:00. The test ends Fri, Nov 13.",
    },
  },
};

export function getTest(projectId: ProjectId, id: string): TestDetail | undefined {
  return TESTS[projectId][id];
}

export const NEXT_TEST: Record<ProjectId, NextTest> = {
  "property-managers": {
    title: "Test 2: Offer A2 vs Offer B",
    summary: "Queued. Starts when Test 1 ends on Fri, Nov 6, so a test is always running.",
    why: "Test 1 alert: Offer A got 8 replies and 0 booked calls. Funnel Lab named the offer's likelihood as the likely cause, and you accepted the proposed change.",
    control: {
      offer: "Offer B",
      headline: "A free 30-minute audit that counts what your request pile costs",
      note: "Unchanged from Test 1. It booked 3 calls.",
    },
    variant: {
      offer: "Offer A2",
      headline: "One intake tool for every request, with a before-and-after from a real build",
      note: "Changes one thing: the likelihood, by adding the hours a compliance tracker saved.",
    },
    staysTheSame:
      "ICP: owners or COOs at US property management companies with 20 to 150 employees that just opened a second office. Channel: cold email. Batches: 24 messages a day per variant, Monday to Friday, sent at 8:00 after approval.",
  },
  "funded-startups": {
    title: "Test 2: Cold email vs Warm introductions",
    summary: "Queued. Starts when Test 1 ends on Fri, Nov 13, so a test is always running.",
    why: "Offer B booked the only call so far. The second channel picked for this project, warm introductions through investors, has not been tested yet.",
    control: {
      offer: "Cold email",
      headline: "Offer B by cold email to COOs who raised in the last 6 months",
      note: "The channel from Test 1.",
    },
    variant: {
      offer: "Warm introductions",
      headline: "Offer B through introductions from investors and founder friends",
      note: "Changes one thing: the channel.",
    },
    staysTheSame:
      "ICP: COOs at enterprise B2B startups with 15 to 60 employees that closed a Seed or Series A round in the last 6 months. Offer: Offer B, a pilot on the one job that eats the team's week.",
  },
};
