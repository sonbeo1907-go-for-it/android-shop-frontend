import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/currency";
import { calculateDiscountPercent } from "@/utils/discount";

export type PriceSize = "sm" | "md" | "lg" | "xl";

export type PriceProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  value: number;
  originalValue?: number | null;
  size?: PriceSize;
  showDiscount?: boolean;
};

const valueClasses: Record<PriceSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
  xl: "text-3xl sm:text-4xl",
};

export function Price({
  value,
  originalValue,
  size = "md",
  showDiscount = true,
  className,
  ...props
}: PriceProps) {
  const safeOriginalValue =
    typeof originalValue === "number" ? originalValue : null;
  const discount = calculateDiscountPercent(value, safeOriginalValue);
  const hasOriginalPrice =
    safeOriginalValue !== null && safeOriginalValue > value;

  return (
    <div className={cn("flex flex-wrap items-end gap-x-2 gap-y-1", className)} {...props}>
      <span className={cn("font-bold leading-none text-primary", valueClasses[size])}>
        {formatCurrency(value)}
      </span>

      {hasOriginalPrice && (
        <span className="text-sm text-muted line-through">
          {formatCurrency(safeOriginalValue)}
        </span>
      )}

      {showDiscount && discount !== null && (
        <Badge variant="danger" size="sm">
          -{discount}%
        </Badge>
      )}
    </div>
  );
}
