import type { ComponentProps } from "react";

// Select from the wireframe (label + "v" chevron), backed by a native <select>.
export function SelectBox({ className = "", children, ...props }: ComponentProps<"select">) {
  return (
    <span className={`relative inline-flex shrink-0 ${className}`}>
      <select
        className="cursor-pointer appearance-none rounded-[6px] border border-line bg-white py-2 pl-3 pr-7 text-[13px] text-ink-2 focus:border-accent focus:outline-none"
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-muted"
      >
        v
      </span>
    </span>
  );
}

// Horizontal "Bar" (label, 320px track, value) used for booked calls per variant.
export function VariantBar({ label, booked, max = 4 }: { label: string; booked: number; max?: number }) {
  return (
    <div className="flex w-full items-center gap-3">
      <p className="w-40 shrink-0 text-[13px] font-medium text-ink max-sm:w-28">{label}</p>
      <div className="h-3.5 w-80 min-w-0 shrink overflow-hidden rounded-[4px] bg-chip">
        <div
          className="h-full rounded-[4px] bg-accent"
          style={{ width: `${Math.min(booked / max, 1) * 100}%` }}
        />
      </div>
      <p className="shrink-0 whitespace-nowrap text-[13px] font-semibold text-ink">{booked} booked</p>
    </div>
  );
}
