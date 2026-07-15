"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

export type ActiveFilter = {
  key: string;
  label: string;
};

export type ActiveFilterListProps = {
  filters: ActiveFilter[];
  onRemove: (key: string) => void;
  onClearAll?: () => void;
  className?: string;
};

export function ActiveFilterList({
  filters,
  onRemove,
  onClearAll,
  className,
}: ActiveFilterListProps) {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        className,
      )}
      aria-label="Bộ lọc đang áp dụng"
    >
      <span className="text-sm font-semibold text-foreground">
        Đang lọc:
      </span>

      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className="inline-flex min-h-8 items-center gap-1 rounded-full border border-primary/20 bg-primary-soft px-3 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
          onClick={() => onRemove(filter.key)}
        >
          {filter.label}
          <X aria-hidden="true" className="size-3.5" />
        </button>
      ))}

      {onClearAll && filters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="min-h-8 px-2 text-xs"
          onClick={onClearAll}
        >
          Xóa tất cả
        </Button>
      )}
    </div>
  );
}
