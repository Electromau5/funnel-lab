import Link from "next/link";

// Header used on the public auth pages (Sign up, 5:72).
export function PublicHeader() {
  return (
    <header className="flex w-full items-center border-b border-line bg-white px-20 py-5 max-lg:px-8 max-md:px-4">
      <Link href="/" className="flex items-center gap-2">
        <span className="size-5 rounded-[5px] bg-accent" />
        <span className="text-[16px] font-bold text-ink">Funnel Lab</span>
      </Link>
    </header>
  );
}
