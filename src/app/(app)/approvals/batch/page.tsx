import { Suspense } from "react";
import { getBatch } from "@/components/approvals/data";
import { BatchReview } from "@/components/approvals/batch-review";
import { PageSkeleton } from "@/components/page-skeleton";

// Figma: Batch review (9:389) and Batch review (mobile) (9:479), one responsive route.
// ?id= picks the batch; it defaults to the first batch waiting for approval.
export default function BatchReviewPage(props: PageProps<"/approvals/batch">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BatchReviewContent {...props} />
    </Suspense>
  );
}

async function BatchReviewContent(props: PageProps<"/approvals/batch">) {
  const { id } = await props.searchParams;
  const batch = getBatch(typeof id === "string" ? id : undefined);
  return <BatchReview key={batch.id} batch={batch} />;
}
