import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Components from the Figma "Wireframe kit" (node 4:2).

const buttonBase =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[6px] text-[14px] font-semibold transition-colors disabled:opacity-50";

const buttonVariants = {
  // Button/Primary (4:4)
  primary: "bg-accent px-4 py-2.5 text-white hover:bg-[#0c5f59]",
  // Button/Secondary (4:6)
  secondary: "border border-ink bg-white px-4 py-2.5 text-ink hover:bg-canvas",
  // Button/Text (4:8)
  text: "px-4 py-2.5 text-accent hover:underline",
};

type Variant = keyof typeof buttonVariants;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}

// Plain <a> styled as a button, for links that must not be prefetched
// (e.g. /switch, which changes the current project).
export function ButtonAnchor({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...props} />;
}

/** Opens a per-project page after picking its project. */
export function switchHref(project: string, to: string) {
  return `/switch?project=${project}&to=${encodeURIComponent(to)}`;
}

// Tag/Gray (4:10) and Tag/Accent (4:12)
export function Tag({
  tone = "gray",
  children,
  className = "",
}: {
  tone?: "gray" | "accent";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    gray: "bg-chip text-ink-2",
    accent: "bg-accent-soft text-accent",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] px-2 py-[3px] text-[12px] font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

// Field (4:21)
export function Field({
  label,
  className = "",
  multiline = false,
  ...props
}: { label: string; multiline?: boolean } & ComponentProps<"input"> &
  ComponentProps<"textarea">) {
  const input =
    "w-full rounded-[6px] border border-line bg-white px-3 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-accent focus:outline-none";
  return (
    <label className={`flex w-full flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-medium text-ink-2">{label}</span>
      {multiline ? (
        <textarea className={`${input} min-h-24 leading-5`} {...props} />
      ) : (
        <input className={input} {...props} />
      )}
    </label>
  );
}

// Checkbox (4:31)
export function Checkbox({
  label,
  className = "",
  ...props
}: { label: ReactNode } & ComponentProps<"input">) {
  return (
    <label className={`flex cursor-pointer items-center gap-2 text-[14px] text-ink ${className}`}>
      <input type="checkbox" className="size-4 rounded-[4px] accent-accent" {...props} />
      <span>{label}</span>
    </label>
  );
}

export function Card({ className = "", children, ...props }: ComponentProps<"div">) {
  return (
    <div className={`rounded-[8px] border border-line bg-white p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

// Dashed "State: ..." annotation used across the wireframes.
export function StateNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[8px] border border-dashed border-muted bg-canvas p-4">
      <p className="text-[12px] font-semibold text-muted">{title}</p>
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex w-full items-end gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h1 className="text-[24px] font-bold text-ink">{title}</h1>
        {subtitle && <p className="text-[14px] leading-5 text-ink-2">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[16px] font-semibold text-ink">{children}</h2>;
}
