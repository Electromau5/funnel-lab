"use client";

import { useState } from "react";
import { SelectBox, VariantBar } from "./parts";

// "Compare variants" picker (11:457) and the Comparison card (11:466).
export function CompareVariants({ booked: BOOKED }: { booked: Record<string, number> }) {
  const OFFERS = Object.keys(BOOKED);
  const [variant, setVariant] = useState("Offer A");
  const [control, setControl] = useState("Offer B");

  return (
    <>
      <div className="flex w-full flex-wrap items-center gap-3">
        <p className="whitespace-nowrap text-[14px] font-semibold text-ink">Compare variants</p>
        <SelectBox aria-label="Variant" value={variant} onChange={(e) => setVariant(e.target.value)}>
          {OFFERS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectBox>
        <p className="text-[13px] text-muted">vs</p>
        <SelectBox aria-label="Control" value={control} onChange={(e) => setControl(e.target.value)}>
          {OFFERS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectBox>
      </div>
      <div className="flex w-full flex-col gap-2.5 rounded-[8px] border border-line bg-white p-5">
        <p className="text-[15px] font-semibold text-ink">
          {variant} vs {control}, Test 1
        </p>
        <VariantBar label={`${control} (control)`} booked={BOOKED[control]} />
        <VariantBar label={`${variant} (variant)`} booked={BOOKED[variant]} />
      </div>
    </>
  );
}
