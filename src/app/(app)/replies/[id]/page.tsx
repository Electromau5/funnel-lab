import { Suspense } from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import { notFound } from "next/navigation";
import { Page } from "@/components/app-shell";
import {
  firstName,
  getThread,
  threads,
  type ReplyThread,
  type ThreadMessage,
} from "@/components/replies/data";
import { NotInterestedButton, SuggestedAnswer } from "@/components/replies/thread-actions";
import { PageHeader } from "@/components/ui";
import { getProject } from "@/lib/projects";

export function generateStaticParams() {
  return threads.map((t) => ({ id: t.id }));
}

// Figma: Thread (10:350)
export default function ThreadPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ThreadPageContent {...props} />
    </Suspense>
  );
}

async function ThreadPageContent(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const thread = getThread(id);
  if (!thread) notFound();

  return (
    <Page crumb={`Replies / ${thread.name}`}>
      <PageHeader
        title={`${thread.name}, ${thread.company}`}
        subtitle={thread.profile}
        actions={<NotInterestedButton />}
      />
      <div className="flex w-full items-start gap-6 max-lg:flex-col">
        <section className="flex min-w-0 flex-1 flex-col gap-3 max-lg:w-full">
          {thread.messages.map((m, i) => (
            <Message key={i} message={m} who={firstName(thread)} />
          ))}
          {thread.suggestedAnswer && <SuggestedAnswer initial={thread.suggestedAnswer} />}
        </section>
        <aside className="w-[360px] shrink-0 max-lg:w-full">
          <BehindThread thread={thread} />
        </aside>
      </div>
    </Page>
  );
}

function Message({ message, who }: { message: ThreadMessage; who: string }) {
  const fromUs = message.from === "funnel-lab";
  return (
    <div
      className={`flex w-full flex-col gap-1 rounded-[8px] border border-line p-4 ${
        fromUs ? "bg-canvas" : "bg-white"
      }`}
    >
      <div className="flex w-full items-center gap-2">
        <p className="min-w-0 flex-1 text-[13px] font-semibold text-ink">
          {fromUs ? "Sent by Funnel Lab" : `Reply from ${who}`}
        </p>
        <p className="shrink-0 whitespace-nowrap text-[12px] text-muted">{message.date}</p>
      </div>
      <p className="text-[13px] font-medium text-ink">{message.subject}</p>
      <p className="text-[13px] leading-[19px] text-ink-2">{message.body}</p>
    </div>
  );
}

function BehindThread({ thread }: { thread: ReplyThread }) {
  const facts = [
    { label: "Project", value: getProject(thread.project).name },
    { label: "Test", value: thread.test },
    { label: "Offer used", value: thread.offerLine },
    { label: "Channel", value: thread.channel },
    { label: "Booked call", value: thread.bookedCall },
  ];
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[8px] border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold text-ink">Behind this thread</h2>
      {facts.map((f) => (
        <div key={f.label} className="flex w-full flex-col gap-0.5">
          <p className="text-[12px] text-muted">{f.label}</p>
          <p className="text-[14px] font-medium leading-5 text-ink">{f.value}</p>
        </div>
      ))}
    </div>
  );
}
