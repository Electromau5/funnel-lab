"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { isFounder } from "@/lib/roles";
import { COFOUNDER_STEPS, FOUNDER_STEPS } from "./tour-steps";

// Guided tour: each step opens a page, scrolls to the part it describes
// (marked data-tour="..."), dims everything else and puts a card next to it.
// Opens on a person's first visit and from "How it works" in the top bar.
// Whether it was seen is kept in this browser only (no database yet).

export const OPEN_TOUR_EVENT = "fl:open-tour";

const seenKey = (userId: string) => `fl-tour-seen:${userId}`;
const GAP = 12; // space between the highlight and the card
const PAD = 8; // highlight padding around the target
const EDGE = 16; // minimum distance from the viewport edge
const FIND_TIMEOUT = 4000;

type Rect = { top: number; left: number; width: number; height: number };

function readSeen(userId: string) {
  try {
    return window.localStorage.getItem(seenKey(userId)) === "1";
  } catch {
    return true; // Storage blocked: don't restart the tour on every page.
  }
}

function markSeen(userId: string | undefined) {
  if (!userId) return;
  try {
    window.localStorage.setItem(seenKey(userId), "1");
  } catch {
    // Storage blocked; the tour may start again next visit.
  }
}

/** Starts the tour from anywhere in the app. */
export function openProductTour() {
  window.dispatchEvent(new Event(OPEN_TOUR_EVENT));
}

export function ProductTour() {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const { orgRole } = useAuth();
  const userId = user?.id;
  const founder = !orgRole || isFounder(orgRole);
  const steps = founder ? FOUNDER_STEPS : COFOUNDER_STEPS;

  const [manualOpen, setManualOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  // Target position for the current step; null = centered card (no target,
  // or the target is not on screen, e.g. the sidebar on a phone).
  const [found, setFound] = useState<{ step: number; rect: Rect | null } | null>(null);
  const [cardSize, setCardSize] = useState({ width: 380, height: 240 });
  const targetRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const firstVisit =
    isLoaded && !!userId && typeof window !== "undefined" && !dismissed && !readSeen(userId);
  const active = manualOpen || firstVisit;
  const step = steps[Math.min(index, steps.length - 1)];
  const last = index >= steps.length - 1;
  const ready = found?.step === index;
  const rect = ready ? found.rect : null;

  // "How it works" button.
  useEffect(() => {
    const onOpen = () => {
      setIndex(0);
      setFound(null);
      setManualOpen(true);
    };
    window.addEventListener(OPEN_TOUR_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_TOUR_EVENT, onOpen);
  }, []);

  // Open the step's page, then wait for its target to appear.
  useEffect(() => {
    if (!active) return;
    const here = window.location.pathname + window.location.search;
    if (here !== step.route) router.push(step.route);

    targetRef.current = null;
    if (!step.target) {
      const id = window.setTimeout(() => setFound({ step: index, rect: null }), 0);
      return () => window.clearTimeout(id);
    }
    const started = Date.now();
    const poll = window.setInterval(() => {
      const onPage = window.location.pathname + window.location.search === step.route;
      const el = document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
      const box = el?.getBoundingClientRect();
      if (onPage && el && box && box.width > 0 && box.height > 0) {
        window.clearInterval(poll);
        targetRef.current = el;
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        setFound({ step: index, rect: toRect(el) });
      } else if (Date.now() - started > FIND_TIMEOUT) {
        window.clearInterval(poll);
        setFound({ step: index, rect: null });
      }
    }, 100);
    return () => window.clearInterval(poll);
  }, [active, index, step, router]);

  // Follow the target while the page scrolls (including the smooth scroll above) or resizes.
  useEffect(() => {
    if (!active) return;
    const update = () => {
      const el = targetRef.current;
      if (el && el.isConnected) setFound((f) => (f && f.rect ? { ...f, rect: toRect(el) } : f));
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [active]);

  // Measure the card so it can be placed without leaving the screen.
  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setCardSize({ width: el.offsetWidth, height: el.offsetHeight }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [active, ready]);

  useEffect(() => {
    if (ready) cardRef.current?.focus();
  }, [ready, index]);

  const end = useCallback(() => {
    markSeen(userId);
    setDismissed(true);
    setManualOpen(false);
    setFound(null);
    targetRef.current = null;
  }, [userId]);

  const go = useCallback(
    (to: number) => {
      if (to < 0 || to >= steps.length) return;
      setIndex(to);
    },
    [steps.length],
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") end();
      if (e.key === "ArrowRight" && !last) go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, index, last, go, end]);

  if (!active) return null;

  const spot = rect && {
    top: Math.max(rect.top - PAD, 4),
    left: Math.max(rect.left - PAD, 4),
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };
  const position = placeCard(spot, cardSize);

  return (
    <div className="fixed inset-0 z-50" aria-live="polite">
      {/* Blocks clicks on the page while the tour runs. */}
      <div className={`absolute inset-0 ${spot ? "" : "bg-black/45"}`} />
      {spot && (
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-[10px] ring-2 ring-accent transition-all duration-200"
          style={{ ...spot, boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)" }}
        />
      )}
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
        tabIndex={-1}
        className={`absolute flex w-[min(380px,calc(100vw-32px))] flex-col gap-3 rounded-[10px] border border-line bg-white p-5 text-ink shadow-[0_16px_48px_rgba(0,0,0,0.22)] outline-none transition-[top,left] duration-200 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={position}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-accent">
            {step.eyebrow}
          </p>
          <p className="shrink-0 text-[12px] text-muted">
            {index + 1} of {steps.length}
          </p>
        </div>
        <h2 id="tour-title" className="text-[18px] font-bold leading-6 text-ink">
          {step.title}
        </h2>
        <p className="text-[14px] leading-[21px] text-ink-2">{step.body}</p>
        <Progress count={steps.length} index={index} />
        <div className="flex items-center justify-between gap-2 pt-1">
          <Button variant="text" className="px-0!" onClick={end}>
            {last ? "Close" : "End tour"}
          </Button>
          <div className="flex gap-2">
            {index > 0 && (
              <Button variant="secondary" onClick={() => go(index - 1)}>
                Back
              </Button>
            )}
            {!last && <Button onClick={() => go(index + 1)}>Next</Button>}
            {last && founder && (
              <Button
                onClick={() => {
                  end();
                  router.push("/setup/intake");
                }}
              >
                Start the intake
              </Button>
            )}
            {last && !founder && <Button onClick={end}>Done</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Progress({ count, index }: { count: number; index: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={count}
      aria-valuenow={index + 1}
      aria-label="Tour progress"
      className="h-1 w-full overflow-hidden rounded-full bg-chip"
    >
      <div
        className="h-full rounded-full bg-accent transition-all duration-200"
        style={{ width: `${((index + 1) / count) * 100}%` }}
      />
    </div>
  );
}

function toRect(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

// Below the highlight if it fits, else above, else beside it, else pinned to
// the bottom of the screen (for targets taller than the viewport).
function placeCard(spot: Rect | null, card: { width: number; height: number }) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const clampLeft = (x: number) => Math.min(Math.max(x, EDGE), vw - card.width - EDGE);
  const clampTop = (y: number) => Math.min(Math.max(y, EDGE), vh - card.height - EDGE);

  if (!spot) {
    return { top: clampTop((vh - card.height) / 2), left: clampLeft((vw - card.width) / 2) };
  }
  const below = spot.top + spot.height + GAP;
  if (below + card.height <= vh - EDGE) return { top: below, left: clampLeft(spot.left) };
  const above = spot.top - GAP - card.height;
  if (above >= EDGE) return { top: above, left: clampLeft(spot.left) };
  const right = spot.left + spot.width + GAP;
  if (right + card.width <= vw - EDGE) return { top: clampTop(spot.top), left: right };
  const left = spot.left - GAP - card.width;
  if (left >= EDGE) return { top: clampTop(spot.top), left };
  return { top: vh - card.height - EDGE, left: clampLeft(vw - card.width - EDGE) };
}

/** "How it works" button in the top bar. */
export function HowItWorksButton() {
  return (
    <button
      type="button"
      onClick={openProductTour}
      className="text-[13px] font-semibold text-accent hover:underline"
    >
      How it works
    </button>
  );
}
