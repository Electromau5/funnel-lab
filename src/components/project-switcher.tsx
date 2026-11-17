"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { setCurrentProject } from "@/lib/project-actions";
import { COMBINED_PATHS, getProject, PROJECTS, projectFilter, type ProjectId } from "@/lib/projects";

// Project switcher (56:749): the only project control. On the combined screens
// (Today, Approvals, Replies) it reads "All projects" and picking a project
// filters the list; everywhere else it changes the project shown.
export function ProjectSwitcher({
  currentProjectId,
  cofounder,
}: {
  currentProjectId: ProjectId;
  cofounder: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  const combined = COMBINED_PATHS.includes(pathname);
  const filter = projectFilter(searchParams.get("project") ?? undefined);
  const selected: ProjectId | "all" = combined ? (filter ?? "all") : currentProjectId;
  const label = selected === "all" ? "All projects" : getProject(selected).name;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id: ProjectId | "all") => {
    setOpen(false);
    if (combined) {
      router.push(id === "all" ? pathname : `${pathname}?project=${id}`);
      return;
    }
    if (id === "all" || id === currentProjectId) return;
    startTransition(async () => {
      await setCurrentProject(id);
      router.refresh();
    });
  };

  const options: { id: ProjectId | "all"; name: string }[] = [
    ...(combined ? [{ id: "all" as const, name: "All projects" }] : []),
    ...PROJECTS.map((p) => ({ id: p.id, name: p.name })),
  ];

  return (
    <div ref={ref} data-tour="project-switcher" className="relative px-0 pb-4">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-[208px] items-center gap-2 rounded-[6px] border border-line bg-white px-3 py-2 text-left hover:bg-canvas"
      >
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[11px] font-medium text-muted">Project</span>
          <span className={`truncate text-[14px] font-semibold text-ink ${pending ? "opacity-60" : ""}`}>
            {label}
          </span>
        </span>
        <span aria-hidden className="text-[12px] font-semibold text-muted">
          v
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-[58px] z-20 flex w-[260px] flex-col rounded-[8px] border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          <ul role="listbox" aria-label="Projects">
            {options.map((o) => {
              const active = o.id === selected;
              return (
                <li key={o.id} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => pick(o.id)}
                    className={`flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-left text-[14px] hover:bg-canvas ${
                      active ? "font-semibold text-accent" : "font-medium text-ink"
                    }`}
                  >
                    <span className="w-4 shrink-0 text-[13px]">{active ? "✓" : ""}</span>
                    {o.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {!cofounder && (
            <>
              <div className="my-1 h-px w-full bg-line" />
              <Link
                href="/settings/projects/new"
                onClick={() => setOpen(false)}
                className="rounded-[6px] px-2.5 py-2 pl-[34px] text-[14px] font-medium text-ink hover:bg-canvas"
              >
                Add new project
              </Link>
              <Link
                href="/settings/projects"
                onClick={() => setOpen(false)}
                className="rounded-[6px] px-2.5 py-2 pl-[34px] text-[14px] font-medium text-ink hover:bg-canvas"
              >
                Manage projects
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
