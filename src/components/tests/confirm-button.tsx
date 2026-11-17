"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

// Primary button that flips to a confirmed state once clicked.
export function ConfirmButton({ label, doneLabel }: { label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button onClick={() => setDone(true)} disabled={done} aria-live="polite">
      {done ? doneLabel : label}
    </Button>
  );
}
