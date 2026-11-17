// Placeholder for the main column while a page's URL data resolves.
export function PageSkeleton() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-[61px] w-full border-b border-line bg-white" />
      <div className="flex w-full flex-col gap-6 p-8 max-md:p-4">
        <div className="h-7 w-64 animate-pulse rounded-[6px] bg-chip" />
        <div className="h-24 w-full animate-pulse rounded-[8px] bg-white" />
        <div className="h-24 w-full animate-pulse rounded-[8px] bg-white" />
      </div>
    </div>
  );
}
