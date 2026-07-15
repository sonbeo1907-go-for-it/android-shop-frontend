"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

export type PhoneSpecificationsProps = {
  specifications: Record<string, string>;
  collapsible?: boolean;
  initialVisibleCount?: number;
  className?: string;
};

export function PhoneSpecifications({
  specifications,
  collapsible = true,
  initialVisibleCount = 6,
  className,
}: PhoneSpecificationsProps) {
  const entries = useMemo(
    () => Object.entries(specifications),
    [specifications],
  );
  const [expanded, setExpanded] = useState(false);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted">
        Chưa có thông số kỹ thuật.
      </p>
    );
  }

  const safeInitialCount = Math.max(1, initialVisibleCount);
  const canCollapse = collapsible && entries.length > safeInitialCount;
  const visibleEntries = canCollapse && !expanded
    ? entries.slice(0, safeInitialCount)
    : entries;

  return (
    <div className={cn("overflow-hidden rounded-card border border-border", className)}>
      <dl>
        {visibleEntries.map(([name, value], index) => (
          <div
            key={name}
            className={cn(
              "grid grid-cols-[minmax(7rem,0.9fr)_minmax(0,1.5fr)] gap-3 px-4 py-3 text-sm",
              index % 2 === 0 ? "bg-slate-50" : "bg-surface",
            )}
          >
            <dt className="font-semibold text-foreground">
              {name}
            </dt>
            <dd className="break-words text-muted">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {canCollapse && (
        <div className="border-t border-border bg-surface p-3 text-center">
          <Button
            variant="ghost"
            size="sm"
            rightIcon={
              expanded
                ? <ChevronUp aria-hidden="true" className="size-4" />
                : <ChevronDown aria-hidden="true" className="size-4" />
            }
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Thu gọn" : "Xem thêm thông số"}
          </Button>
        </div>
      )}
    </div>
  );
}
