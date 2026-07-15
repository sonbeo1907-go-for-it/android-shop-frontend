"use client";

import {
  ArrowDownAZ,
} from "lucide-react";

import {
  Select,
} from "@/components/ui";
import type {
  SortValue,
} from "@/features/phone/phone-sort";
import {
  cn,
} from "@/utils/cn";

export type SortSelectProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
  className?: string;
};

const SORT_OPTIONS: Array<{
  value: SortValue;
  label: string;
}> = [
  {
    value: "newest",
    label: "Mới nhất",
  },
  {
    value: "price-asc",
    label: "Giá tăng dần",
  },
  {
    value: "price-desc",
    label: "Giá giảm dần",
  },
  {
    value: "best-seller",
    label: "Bán chạy",
  },
  {
    value: "name-asc",
    label: "Tên A–Z",
  },
  {
    value: "name-desc",
    label: "Tên Z–A",
  },
];

export function SortSelect({
  value,
  onChange,
  className,
}: SortSelectProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2",
        className,
      )}
    >
      <ArrowDownAZ
        aria-hidden="true"
        className="hidden size-5 shrink-0 text-muted sm:block"
      />

      <Select
        aria-label="Sắp xếp sản phẩm"
        value={value}
        options={SORT_OPTIONS}
        className="min-w-44"
        onValueChange={(nextValue) => {
          onChange(
            nextValue as SortValue,
          );
        }}
      />
    </div>
  );
}