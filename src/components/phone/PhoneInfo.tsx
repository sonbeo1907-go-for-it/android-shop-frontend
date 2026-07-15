import {
  Boxes,
  Building2,
  PackageCheck,
} from "lucide-react";

import {
  Price,
} from "@/components/ui";
import {
  StockStatus,
} from "@/components/phone/StockStatus";
import type {
  PhoneDetailResponse,
} from "@/features/phone/phone.types";
import {
  cn,
} from "@/utils/cn";

export type PhoneInfoProps = {
  phone: Pick<
    PhoneDetailResponse,
    | "brand"
    | "model"
    | "basePrice"
    | "originalPrice"
    | "shortDescription"
    | "stockQuantity"
    | "soldCount"
  >;
  className?: string;
};

export function PhoneInfo({
  phone,
  className,
}: PhoneInfoProps) {
  return (
    <section
      className={cn(
        "rounded-section border border-border bg-surface p-5 shadow-card sm:p-6",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
          <Building2
            aria-hidden="true"
            className="size-3.5"
          />
          {phone.brand}
        </span>

        {phone.model && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Boxes
              aria-hidden="true"
              className="size-3.5"
            />
            {phone.model}
          </span>
        )}

        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <PackageCheck
            aria-hidden="true"
            className="size-3.5"
          />
          Đã bán {phone.soldCount}
        </span>
      </div>

      <Price
        value={phone.basePrice}
        originalValue={
          phone.originalPrice
        }
        size="xl"
        showDiscount
        className="mt-5"
      />

      {phone.shortDescription && (
        <p className="mt-4 text-sm leading-6 text-muted">
          {phone.shortDescription}
        </p>
      )}

      <div className="mt-4 border-t border-border pt-4">
        <StockStatus
          stockQuantity={
            phone.stockQuantity
          }
          showQuantity
        />
      </div>
    </section>
  );
}
