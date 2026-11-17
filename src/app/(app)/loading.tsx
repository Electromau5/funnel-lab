import { PageSkeleton } from "@/components/page-skeleton";

// Suspense boundary for page loads; pages that read URL data also wrap
// themselves so client navigations inside the app stay instant.
export default PageSkeleton;
