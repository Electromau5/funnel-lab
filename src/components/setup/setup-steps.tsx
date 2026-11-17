"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Setup tabs (e.g. 6:220): Intake / ICP / Offers / Channels.
// The lead sample lives under the ICP step, offer detail under Offers.
const STEPS = [
  { label: "Intake", href: "/setup/intake", match: ["/setup/intake"] },
  { label: "ICP", href: "/setup/icp", match: ["/setup/icp", "/setup/leads"] },
  { label: "Offers", href: "/setup/offers", match: ["/setup/offers"] },
  { label: "Channels", href: "/setup/channels", match: ["/setup/channels"] },
];

export function SetupSteps() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Setup steps"
      className="flex w-full items-start gap-6 overflow-x-auto border-b border-line"
    >
      {STEPS.map((step) => {
        const active = step.match.some((m) => pathname.startsWith(m));
        return (
          <Link
            key={step.href}
            href={step.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px shrink-0 whitespace-nowrap pb-2.5 text-[14px] ${
              active
                ? "border-b-2 border-accent font-semibold text-accent"
                : "font-medium text-muted hover:text-ink-2"
            }`}
          >
            {step.label}
          </Link>
        );
      })}
    </nav>
  );
}
