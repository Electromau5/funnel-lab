"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Results board", href: "/results" },
  { label: "Friday updates", href: "/results/updates" },
  { label: "Booked calls", href: "/results/calls" },
];

// Results sub-nav shared by the Results board, Friday updates and Booked calls.
export function ResultsTabs() {
  const pathname = usePathname();
  return (
    <nav className="flex w-full items-start gap-6 overflow-x-auto border-b border-line">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px shrink-0 whitespace-nowrap pb-2.5 text-[14px] ${
              active
                ? "border-b-2 border-accent font-semibold text-accent"
                : "font-medium text-muted hover:text-ink-2"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
