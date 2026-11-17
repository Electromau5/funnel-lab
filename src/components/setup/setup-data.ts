import type { ProjectId } from "@/lib/projects";

// Sample Setup data for each project: the intake, the ICP built from it, and
// the lead sample. The product description is written once for the workspace;
// each project adds its own segment questions.

export const PRODUCT_DESCRIPTION =
  "We build internal AI tools that take the manual work out of companies still running on spreadsheets, phone calls and paper.";

export type FollowUp = { label: string; answer: string };

export type Intake = {
  /** What the description is too broad to say, shown above the questions. */
  tooBroad: string;
  followUps: FollowUp[];
  soFar: { buyer: string; trigger: string; industry: string };
};

export type IcpPart = { label: string; value: string; why: string };

export type Icp = { sentence: string; parts: IcpPart[] };

export type Lead = {
  name: string;
  role: string;
  company: string;
  size: string;
  trigger: string;
};

type SetupData = { intake: Intake; icp: Icp; leads: Lead[]; leadTotal: number };

export const SETUP: Record<ProjectId, SetupData> = {
  "property-managers": {
    intake: {
      tooBroad: `"Companies on spreadsheets" is too broad to name a buyer. Two questions about property managers:`,
      followUps: [
        {
          label: "Who can say yes to a $15k to $25k build?",
          answer: "The owner, or the COO who runs operations day to day",
        },
        {
          label: "What makes the manual work break?",
          answer: "Opening a second office. What one office did by hand, two cannot.",
        },
      ],
      soFar: { buyer: "Owner or COO", trigger: "Opened a second office", industry: "Property management" },
    },
    icp: {
      sentence:
        "Owners or COOs at US property management companies with 20 to 150 employees that just opened a second office.",
      parts: [
        {
          label: "Industry",
          value: "Property management companies (US, privately held)",
          why: "Why: Requests arrive by text, email, phone and a paper log, and there is no heavy regulation to slow the first build.",
        },
        {
          label: "Company size",
          value: "20 to 150 employees, 5+ years in business",
          why: "Why: Big enough that intake and reporting cost real hours each week, small enough that there is no IT team to build the fix.",
        },
        {
          label: "Buyer role",
          value: "Owner or COO",
          why: "Why: You said the owner, or the COO who runs operations, can say yes to the build.",
        },
        {
          label: "Buying trigger",
          value: "Opened a second office",
          why: "Why: You said what one office did by hand, two cannot.",
        },
      ],
    },
    leadTotal: 40,
    leads: [
      { name: "Renee Castillo", role: "Owner", company: "Bayview Property Management", size: "45", trigger: "Opened a second office in Tampa" },
      { name: "Mark Ostrowski", role: "COO", company: "Keystone Residential", size: "120", trigger: "Opened an office in Columbus" },
      { name: "Hector Ruiz", role: "President", company: "Pinecrest Management Group", size: "80", trigger: "Second office opened in August" },
      { name: "Alicia Grant", role: "Owner", company: "Summit Ridge Property Co.", size: "32", trigger: "Took over a 400-unit portfolio across town" },
      { name: "Sara Lindqvist", role: "COO", company: "Harborview Rentals", size: "60", trigger: "New office in Charlotte" },
      { name: "Tanya Brooks", role: "Owner", company: "Oakline Property Services", size: "25", trigger: "Second office opened in September" },
    ],
  },
  "funded-startups": {
    intake: {
      tooBroad: `The product description carries over from Property managers. Two questions about funded startups:`,
      followUps: [
        {
          label: "Who signs off on internal tools at a funded startup?",
          answer: "The COO, or the CEO when there is no COO yet",
        },
        {
          label: "What changes after a round closes?",
          answer: "The board wants operations to scale before headcount doubles",
        },
      ],
      soFar: { buyer: "COO", trigger: "Closed a funding round", industry: "Enterprise B2B software" },
    },
    icp: {
      sentence:
        "COOs at enterprise B2B startups with 15 to 60 employees that closed a Seed or Series A round in the last 6 months.",
      parts: [
        {
          label: "Industry",
          value: "Enterprise B2B software startups",
          why: "Why: Data-heavy products with internal teams growing faster than their internal systems.",
        },
        {
          label: "Company size",
          value: "15 to 60 employees, $2M to $20M raised",
          why: "Why: Large enough to feel the copy-paste work, too early to have built an operations layer.",
        },
        {
          label: "Buyer role",
          value: "COO",
          why: "Why: You said the COO signs off on internal tools, or the CEO when there is no COO.",
        },
        {
          label: "Buying trigger",
          value: "Closed a funding round in the last 6 months",
          why: "Why: You said the board wants operations to scale before headcount doubles.",
        },
      ],
    },
    leadTotal: 40,
    leads: [
      { name: "Nina Patel", role: "COO", company: "Ledgerline", size: "42", trigger: "Raised a $14M Series A in September" },
      { name: "Owen Fischer", role: "Co-founder and CEO", company: "Brightwire Analytics", size: "18", trigger: "Raised a $4M seed in August" },
      { name: "Grace Liu", role: "COO", company: "Northstack", size: "55", trigger: "Raised a $19M Series A in October" },
      { name: "Marco Bellini", role: "VP Operations", company: "Vellum Data", size: "30", trigger: "Raised a $7M seed extension in July" },
      { name: "Imani Carter", role: "COO", company: "Corvid Security", size: "48", trigger: "Raised a $12M Series A in September" },
      { name: "Ethan Moore", role: "Co-founder and COO", company: "Fieldnote AI", size: "22", trigger: "Raised a $5M seed in October" },
    ],
  },
};
