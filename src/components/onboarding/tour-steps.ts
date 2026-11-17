// Steps for the guided tour. Each step opens a page and points at one part of
// it, marked in the page with data-tour="<target>". A step with no target
// shows its card in the middle of the screen. Founders and cofounders get
// different tours: cofounders cannot open Setup or Settings.

export type TourStep = {
  id: string;
  /** Page to open; may include a query string. */
  route: string;
  /** data-tour value of the element to point at. */
  target?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export const FOUNDER_STEPS: TourStep[] = [
  {
    id: "welcome",
    route: "/today",
    eyebrow: "Welcome",
    title: "Let's walk through Funnel Lab",
    body: "Funnel Lab names a buyer, writes offers, runs small tests and tells you which one books calls. This tour opens each part of the app in the order you'll use it. It takes about two minutes.",
  },
  {
    id: "today",
    route: "/today",
    target: "needs-you",
    eyebrow: "Today",
    title: "Start each day here",
    body: "Needs you lists only what is waiting on you, from every project: batches to approve, replies to answer and alerts on tests. Everything else keeps running.",
  },
  {
    id: "switcher",
    route: "/today",
    target: "project-switcher",
    eyebrow: "Projects",
    title: "Switch between projects",
    body: "Each project is one market segment for your product. On Today, Approvals and Replies the switcher shows All projects and filters the list; on Setup, Tests and Results it picks the project you see.",
  },
  {
    id: "intake",
    route: "/setup/intake",
    target: "intake",
    eyebrow: "Setup · Intake",
    title: "Describe your product in plain words",
    body: "Funnel Lab asks follow-up questions until it can name who buys and what makes them buy now. You write the product description once; each new project only answers the segment questions.",
  },
  {
    id: "icp",
    route: "/setup/icp",
    target: "icp",
    eyebrow: "Setup · ICP",
    title: "Your ideal customer, in one sentence",
    body: "Industry, company size, buyer role and buying trigger, each with the reason it was chosen. Edit any part before Funnel Lab pulls leads.",
  },
  {
    id: "offers",
    route: "/setup/offers",
    target: "offers",
    eyebrow: "Setup · Offers",
    title: "Two offers, scored and compared",
    body: "Each offer is scored on the Value Equation from $100M Offers, and the weak part is named, so you know what to fix before a buyer sees it.",
  },
  {
    id: "channels",
    route: "/setup/channels",
    target: "channels",
    eyebrow: "Setup · Channels",
    title: "Where to reach buyers first",
    body: "Warm outreach, cold outreach, content and paid ads, ranked with the Bullseye method. The top two are tested first.",
  },
  {
    id: "test",
    route: "/tests/1",
    target: "test-arms",
    eyebrow: "Tests",
    title: "Each test changes one thing",
    body: "A variant runs against a control, changing only the ICP, the offer or the channel. When a test heads the wrong way, an alert names the likely cause and proposes the next test.",
  },
  {
    id: "approvals",
    route: "/approvals",
    target: "approvals",
    eyebrow: "Approvals",
    title: "Nothing sends without you",
    body: "Every morning's messages wait here in batches, from every project, with who touched them last.",
  },
  {
    id: "batch",
    route: "/approvals/batch?id=pm-offer-a",
    target: "batch-actions",
    eyebrow: "Approvals · Batch review",
    title: "Approve, edit or hold",
    body: "Approve the whole batch in a minute, edit one message, or hold the batch so nothing sends. Your cofounder can review and hold batches too.",
  },
  {
    id: "replies",
    route: "/replies",
    target: "replies",
    eyebrow: "Replies",
    title: "Only the replies it can't answer",
    body: "Funnel Lab answers common questions from the offer's own terms and books calls. The rest come here with the thread, the offer used and a suggested answer.",
  },
  {
    id: "results",
    route: "/results",
    target: "results-table",
    eyebrow: "Results",
    title: "Results are booked calls, not opens",
    body: "Booked calls and closed deals for every ICP, offer and channel you test, with a plain verdict on each.",
  },
  {
    id: "updates",
    route: "/results/updates",
    target: "friday-updates",
    eyebrow: "Results · Friday update",
    title: "A one-page update every Friday",
    body: "This week's booked calls, any alert and the next test, one section per project. Share it with an advisor as a link or an image.",
  },
  {
    id: "projects",
    route: "/settings/projects",
    target: "projects",
    eyebrow: "Settings · Projects",
    title: "Add a segment when you're ready",
    body: "Your plan holds up to 3 projects, each with its own sending inbox. Add one here or from the switcher's menu.",
  },
  {
    id: "finish",
    route: "/today",
    eyebrow: "You're set",
    title: "Start with the intake",
    body: "Describe your product and Funnel Lab builds your first ICP. You can replay this tour anytime from How it works in the top bar.",
  },
];

export const COFOUNDER_STEPS: TourStep[] = [
  {
    id: "welcome",
    route: "/today",
    eyebrow: "Welcome",
    title: "Let's walk through Funnel Lab",
    body: "Funnel Lab runs your team's sales funnel. As the cofounder, you check what goes out and answer replies. This tour opens each part you'll use.",
  },
  {
    id: "today",
    route: "/today",
    target: "needs-you",
    eyebrow: "Today",
    title: "What you can handle today",
    body: "Batches you can review and replies you can answer, from every project.",
  },
  {
    id: "switcher",
    route: "/today",
    target: "project-switcher",
    eyebrow: "Projects",
    title: "You see every project",
    body: "Each project is one market segment for your product. The switcher filters Today, Approvals and Replies to one project, and picks the project on Tests and Results.",
  },
  {
    id: "approvals",
    route: "/approvals",
    target: "approvals",
    eyebrow: "Approvals",
    title: "Review batches before they send",
    body: "Every morning's messages wait here in batches, from every project.",
  },
  {
    id: "batch",
    route: "/approvals/batch?id=pm-offer-a",
    target: "batch-actions",
    eyebrow: "Approvals · Batch review",
    title: "Hold anything that overpromises",
    body: "If a message claims something the product can't do yet, edit it or hold the batch. Nothing sends while a batch is held.",
  },
  {
    id: "replies",
    route: "/replies",
    target: "replies",
    eyebrow: "Replies",
    title: "Replies that need a person",
    body: "Each comes with the thread, the offer used and a suggested answer.",
  },
  {
    id: "answer",
    route: "/replies/nina-patel",
    target: "suggested-answer",
    eyebrow: "Replies · Thread",
    title: "Send or edit the suggested answer",
    body: "The full thread and the offer behind it sit beside the answer, so you can reply without asking what was promised.",
  },
  {
    id: "calls",
    route: "/results/calls",
    target: "booked-calls",
    eyebrow: "Results · Booked calls",
    title: "Read up before every call",
    body: "Each booked call has its thread and offer attached, and who takes it.",
  },
  {
    id: "finish",
    route: "/today",
    eyebrow: "You're set",
    title: "That's the tour",
    body: "You can replay it anytime from How it works in the top bar.",
  },
];
