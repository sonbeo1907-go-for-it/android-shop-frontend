"use client";

import { useEffect, useMemo, useState } from "react";

import { Button, Input } from "@/components/ui";
import { formatCurrency } from "@/utils/currency";
import { cn } from "@/utils/cn";

export type PriceFilterValue = {
  minPrice?: number;
  maxPrice?: number;
};

export type PricePreset = {
  label: string;
  min?: number;
  max?: number;
};

export type PriceFilterProps = {
  minPrice?: number;
  maxPrice?: number;
  presets?: PricePreset[];
  onChange: (value: PriceFilterValue) => void;
  className?: string;
};

const defaultPresets: PricePreset[] = [
  {
    label: "Dưới 10 triệu",
    max: 10_000_000,
  },
  {
    label: "10–20 triệu",
    min: 10_000_000,
    max: 20_000_000,
  },
  {
    label: "20–30 triệu",
    min: 20_000_000,
    max: 30_000_000,
  },
  {
    label: "Trên 30 triệu",
    min: 30_000_000,
  },
];

function toInputValue(value?: number): string {
  return typeof value === "number" ? String(value) : "";
}

function parsePrice(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return undefined;
  }

  return Math.max(0, Math.floor(parsed));
}

export function PriceFilter({
  minPrice,
  maxPrice,
  presets = defaultPresets,
  onChange,
  className,
}: PriceFilterProps) {
  const [minimum, setMinimum] = useState(toInputValue(minPrice));
  const [maximum, setMaximum] = useState(toInputValue(maxPrice));

  useEffect(() => {
    setMinimum(toInputValue(minPrice));
    setMaximum(toInputValue(maxPrice));
  }, [minPrice, maxPrice]);

  const parsedMinimum = useMemo(
    () => parsePrice(minimum),
    [minimum],
  );
  const parsedMaximum = useMemo(
    () => parsePrice(maximum),
    [maximum],
  );

  const invalidRange =
    parsedMinimum !== undefined
    && parsedMaximum !== undefined
    && parsedMinimum > parsedMaximum;

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <p className="mb-2 text-sm font-semibold text-foreground">
          Khoảng giá nhanh
        </p>

        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => {
            const active =
              preset.min === minPrice
              && preset.max === maxPrice;

            return (
              <button
                key={preset.label}
                type="button"
                aria-pressed={active}
                className={cn(
                  "min-h-9 rounded-button border px-3 text-xs font-semibold transition",
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-foreground hover:border-primary hover:text-primary",
                )}
                onClick={() => {
                  setMinimum(toInputValue(preset.min));
                  setMaximum(toInputValue(preset.max));
                  onChange({
                    minPrice: preset.min,
                    maxPrice: preset.max,
                  });
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Giá tối thiểu"
          type="number"
          inputMode="numeric"
          min={0}
          step={100_000}
          value={minimum}
          placeholder="0"
          onChange={(event) => setMinimum(event.target.value)}
        />

        <Input
          label="Giá tối đa"
          type="number"
          inputMode="numeric"
          min={0}
          step={100_000}
          value={maximum}
          placeholder="50.000.000"
          error={invalidRange ? "Giá tối đa phải lớn hơn giá tối thiểu" : undefined}
          onChange={(event) => setMaximum(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {parsedMinimum !== undefined || parsedMaximum !== undefined
            ? `${parsedMinimum !== undefined ? formatCurrency(parsedMinimum) : "0 ₫"} – ${parsedMaximum !== undefined ? formatCurrency(parsedMaximum) : "Không giới hạn"}`
            : "Chưa chọn khoảng giá"}
        </p>

        <Button
          size="sm"
          disabled={invalidRange}
          onClick={() => {
            onChange({
              minPrice: parsedMinimum,
              maxPrice: parsedMaximum,
            });
          }}
        >
          Áp dụng giá
        </Button>
      </div>
    </div>
  );
}
