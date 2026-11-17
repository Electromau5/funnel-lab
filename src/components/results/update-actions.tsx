"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

// "Copy link" + "Share as image" in the Friday update header (11:373).
export function UpdateActions() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-start gap-2">
      <Button
        variant="secondary"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            // Clipboard unavailable; nothing to do in the prototype.
          }
        }}
      >
        {copied ? "Link copied" : "Copy link"}
      </Button>
      <Button>Share as image</Button>
    </div>
  );
}
