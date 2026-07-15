"use client";

import { Check } from "lucide-react";

import { PhoneImage } from "@/components/phone/PhoneImage";
import type { PhoneOptionResponse } from "@/features/phone/phone.types";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/currency";

export type PhoneOptionItemProps = {
  option: PhoneOptionResponse;
  selected: boolean;
  disabled?: boolean;
  onSelect: (option: PhoneOptionResponse) => void;
};

export function PhoneOptionItem({
  option,
  selected,
  disabled = false,
  onSelect,
}: PhoneOptionItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "relative flex min-h-14 min-w-24 items-center gap-2 rounded-button border px-3 py-2 text-left transition",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
        selected
          ? "border-primary bg-primary-soft text-primary shadow-sm"
          : "border-border bg-surface text-foreground hover:border-primary/60 hover:bg-primary-soft/40",
      )}
      onClick={() => onSelect(option)}
    >
      {option.imageUrl && (
        <span className="relative size-9 shrink-0 overflow-hidden rounded-md bg-white">
          <PhoneImage
            src={option.imageUrl}
            alt=""
            fill
            sizes="36px"
            className="object-contain p-0.5"
          />
        </span>
      )}

      <span className="min-w-0">
        <span className="block text-sm font-bold">
          {option.value}
        </span>

        <span className="mt-0.5 block text-[11px] text-muted">
          {option.extraPrice > 0
            ? `+${formatCurrency(option.extraPrice)}`
            : "Không thêm phí"}
        </span>
      </span>

      {selected && (
        <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-white shadow">
          <Check aria-hidden="true" className="size-3" />
        </span>
      )}
    </button>
  );
}
