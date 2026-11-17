"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Suspense, use, type ReactNode } from "react";
import { CurrentPerson } from "@/components/current-person";
import { HowItWorksButton } from "@/components/onboarding/product-tour";
import { ProjectSwitcher } from "@/components/project-switcher";
import { PROJECTS, type ProjectId } from "@/lib/projects";
import { isFounder } from "@/lib/roles";

const NAV = [
  { label: "Today", href: "/today", match: ["/today"] },
  { label: "Setup", href: "/setup/intake", match: ["/setup"], founderOnly: true },
  { label: "Tests", href: "/tests/1", match: ["/tests"] },
  { label: "Approvals", href: "/approvals", match: ["/approvals"] },
  { label: "Replies", href: "/replies", match: ["/replies"] },
  { label: "Results", href: "/results", match: ["/results"] },
  { label: "Settings", href: "/settings/plan", match: ["/settings"], founderOnly: true },
];

// Left nav (6:16) built from the Nav item component (4:20).
// usePathname and the project cookie need a Suspense boundary under Cache Components.
export function Sidebar({ currentProjectId }: { currentProjectId: Promise<ProjectId> }) {
  return (
    <Suspense fallback={<SidebarNav pathname="" cofounder={false} />}>
      <SidebarWithRole currentProjectId={currentProjectId} />
    </Suspense>
  );
}

function SidebarWithRole({ currentProjectId }: { currentProjectId: Promise<ProjectId> }) {
  const pathname = usePathname();
  const { isLoaded, orgRole } = useAuth();
  const cofounder = isLoaded && !!orgRole && !isFounder(orgRole);
  return (
    <SidebarNav
      pathname={pathname}
      cofounder={cofounder}
      switcher={<ProjectSwitcher currentProjectId={use(currentProjectId)} cofounder={cofounder} />}
    />
  );
}

// Today (cofounder) (6:109): founder-only areas are dimmed for the cofounder.
function SidebarNav({
  pathname,
  cofounder,
  switcher,
}: {
  pathname: string;
  cofounder: boolean;
  switcher?: ReactNode;
}) {
  return (
    <nav className="sticky top-0 z-10 flex h-screen w-60 shrink-0 flex-col gap-1 border-r border-line bg-white px-4 py-6 max-md:hidden">
      <Link href="/today" className="flex items-center gap-2 px-3 pb-5">
        <span className="size-5 rounded-[5px] bg-accent" />
        <span className="text-[16px] font-bold text-ink">Funnel Lab</span>
      </Link>
      {switcher ?? <SwitcherPlaceholder />}
      {NAV.map((item) => {
        const active = item.match.some((m) => pathname.startsWith(m));
        if (cofounder && item.founderOnly) {
          return (
            <span
              key={item.label}
              aria-disabled="true"
              className="flex w-[208px] items-center gap-2 rounded-[6px] px-3 py-[9px] text-[14px] font-medium text-muted opacity-60"
            >
              <span className="size-4 rounded-[4px] bg-line" />
              {item.label} (founder only)
            </span>
          );
        }
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex w-[208px] items-center gap-2 rounded-[6px] px-3 py-[9px] text-[14px] ${
              active
                ? "bg-accent-soft font-semibold text-accent"
                : "font-medium text-ink-2 hover:bg-canvas"
            }`}
          >
            <span className={`size-4 rounded-[4px] ${active ? "bg-accent" : "bg-line"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Closed switcher while the current project loads.
function SwitcherPlaceholder() {
  return (
    <div className="pb-4">
      <div className="flex w-[208px] flex-col rounded-[6px] border border-line bg-white px-3 py-2">
        <span className="text-[11px] font-medium text-muted">Project</span>
        <span className="text-[14px] font-semibold text-ink">{PROJECTS[0].name}</span>
      </div>
    </div>
  );
}

export function TopBar({ crumb }: { crumb: ReactNode }) {
  return (
    <header className="flex w-full items-center justify-between border-b border-line bg-white px-8 py-3.5 max-md:px-4">
      <p className="text-[13px] text-muted">{crumb}</p>
      <div className="flex items-center gap-5">
        <HowItWorksButton />
        <CurrentPerson />
      </div>
    </header>
  );
}

// Main column (6:41): top bar + padded content stack.
export function Page({ crumb, children }: { crumb: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <TopBar crumb={crumb} />
      <main className="flex w-full flex-col gap-6 p-8 max-md:p-4">{children}</main>
    </div>
  );
}
