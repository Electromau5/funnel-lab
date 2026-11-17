import { Suspense } from "react";
import { Page } from "@/components/app-shell";
import { PageSkeleton } from "@/components/page-skeleton";
import { ProjectTag } from "@/components/project-tag";
import { repliesNeedingYou, type ReplyThread } from "@/components/replies/data";
import { ButtonLink, PageHeader } from "@/components/ui";
import { getProject, projectFilter } from "@/lib/projects";

// Figma: Replies (10:274). Combines every project; the project switcher
// filters the list through ?project=.
export default function RepliesPage(props: PageProps<"/replies">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RepliesPageContent {...props} />
    </Suspense>
  );
}

async function RepliesPageContent(props: PageProps<"/replies">) {
  const filter = projectFilter((await props.searchParams).project);
  const replies = filter ? repliesNeedingYou.filter((r) => r.project === filter) : repliesNeedingYou;
  const scope = filter ? `in ${getProject(filter).name}` : "across every project";

  return (
    <Page crumb="Replies">
      <PageHeader
        title="Replies Funnel Lab could not answer"
        subtitle={`${replies.length} ${replies.length === 1 ? "reply needs" : "replies need"} you ${scope}, each with a suggested answer.`}
      />
      <div data-tour="replies" className="flex w-full flex-col gap-6">
        {replies.map((reply) => (
          <ReplyRow key={reply.id} reply={reply} />
        ))}
      </div>
    </Page>
  );
}

function ReplyRow({ reply }: { reply: ReplyThread }) {
  return (
    <article className="flex w-full flex-col gap-2.5 rounded-[8px] border border-line bg-white p-[18px]">
      <div className="flex w-full items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-chip text-[12px] font-semibold text-ink">
          {reply.initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-[15px] font-semibold text-ink">
            {reply.name}, {reply.company}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <ProjectTag projectId={reply.project} />
            <p className="text-[12px] text-muted">Test 1 · {reply.offer}</p>
          </div>
        </div>
        <ButtonLink href={`/replies/${reply.id}`}>Open reply</ButtonLink>
      </div>
      <p className="text-[14px] leading-5 text-ink">&quot;{reply.latestReply}&quot;</p>
      <p className="w-full rounded-[6px] bg-canvas p-3 text-[13px] leading-[18px] text-ink-2">
        Suggested answer: {reply.suggestedSummary}
      </p>
    </article>
  );
}
