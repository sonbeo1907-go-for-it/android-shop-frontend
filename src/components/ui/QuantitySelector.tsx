"use client";

import { Minus, Plus } from "lucide-react";

import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/utils/cn";

export type QuantitySelectorProps = {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  onChange: (value: number) => void;
};

export function QuantitySelector({
  value,
  min = 1,
  max = 10,
  disabled = false,
  className,
  onChange,
}: QuantitySelectorProps) {
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const safeValue = Math.min(Math.max(value, safeMin), safeMax);

  function updateValue(nextValue: number) {
    if (disabled) {
      return;
    }

    onChange(Math.min(Math.max(nextValue, safeMin), safeMax));
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-button border border-border bg-surface p-1",
        className,
      )}
      role="group"
      aria-label="Chọn số lượng"
    >
      <IconButton
        icon={<Minus aria-hidden="true" className="size-4" />}
        label="Giảm số lượng"
        variant="ghost"
        size="sm"
        disabled={disabled || safeValue <= safeMin}
        onClick={() => updateValue(safeValue - 1)}
      />

      <input
        type="number"
        inputMode="numeric"
        min={safeMin}
        max={safeMax}
        value={safeValue}
        disabled={disabled}
        aria-label="Số lượng"
        onChange={(event) => {
          const nextValue = Number(event.target.value);
          if (Number.isFinite(nextValue)) {
            updateValue(nextValue);
          }
        }}
        onBlur={() => updateValue(safeValue)}
        className="h-9 w-12 border-0 bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <IconButton
        icon={<Plus aria-hidden="true" className="size-4" />}
        label="Tăng số lượng"
        variant="ghost"
        size="sm"
        disabled={disabled || safeValue >= safeMax}
        onClick={() => updateValue(safeValue + 1)}
      />
    </div>
  );
}
