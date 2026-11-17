import Link from "next/link";

// Settings tabs (11:606 / 11:680). "Connected tools" has no screen yet, so it is not a link.
const TABS = [
  { key: "team", label: "Team", href: "/settings/team" },
  { key: "projects", label: "Projects", href: "/settings/projects" },
  { key: "tools", label: "Connected tools", href: null },
  { key: "plan", label: "Plan", href: "/settings/plan" },
] as const;

export function SettingsTabs({ active }: { active: "team" | "projects" | "plan" }) {
  return (
    <nav className="flex w-full items-start gap-6 overflow-x-auto border-b border-line">
      {TABS.map((tab) => {
        if (tab.key === active) {
          return (
            <span
              key={tab.key}
              aria-current="page"
              className="-mb-px shrink-0 border-b-2 border-accent pb-2.5 text-[14px] font-semibold whitespace-nowrap text-accent"
            >
              {tab.label}
            </span>
          );
        }
        const cls = "shrink-0 pb-2.5 text-[14px] font-medium whitespace-nowrap text-muted";
        return tab.href ? (
          <Link key={tab.key} href={tab.href} className={`${cls} hover:text-ink-2`}>
            {tab.label}
          </Link>
        ) : (
          <span key={tab.key} className={cls}>
            {tab.label}
          </span>
        );
      })}
    </nav>
  );
}
