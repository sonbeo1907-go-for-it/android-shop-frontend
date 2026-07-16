import Link from "next/link";
import { ArrowRight, Flame, PackageCheck } from "lucide-react";

import { PhoneImage } from "@/components/phone/PhoneImage";
import { StockStatus } from "@/components/phone/StockStatus";
import { Badge, Price } from "@/components/ui";
import type { PhoneCardResponse } from "@/features/phone/phone.types";
import { cn } from "@/utils/cn";

export type PhoneCardBadge =
  | "featured"
  | "best-seller"
  | "new"
  | null;

export type PhoneCardProps = {
  phone: PhoneCardResponse;
  badge?: PhoneCardBadge;
  showBrand?: boolean;
  showSoldCount?: boolean;
  showStock?: boolean;
  compact?: boolean;
  priorityImage?: boolean;
  className?: string;
};

const badgeLabels: Exclude<PhoneCardBadge, null>[] = [
  "featured",
  "best-seller",
  "new",
];

const badgeContent: Record<Exclude<PhoneCardBadge, null>, string> = {
  featured: "Nổi bật",
  "best-seller": "Bán chạy",
  new: "Mới",
};

export function PhoneCard({
  phone,
  badge = null,
  showBrand = true,
  showSoldCount = true,
  showStock = true,
  compact = false,
  priorityImage = false,
  className,
}: PhoneCardProps) {
  const validBadge = badge && badgeLabels.includes(badge)
    ? badge
    : null;

  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition duration-200",
        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover",
        compact ? "p-3" : "p-3 sm:p-4",
        className,
      )}
    >
      <div className="relative">
        <Link
          href={`/phones/${phone.slug}`}
          aria-label={`Xem ${phone.name}`}
          className="relative block aspect-square overflow-hidden rounded-card bg-white"
        >
          <PhoneImage
            src={phone.thumbnailUrl}
            alt={phone.name}
            fill
            priority={priorityImage}
            sizes={
              compact
                ? "(max-width: 640px) 45vw, 220px"
                : "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
            }
            className="object-contain p-2 transition duration-300 group-hover:scale-105 sm:p-3"
          />
        </Link>

        {validBadge && (
          <Badge
            variant={validBadge === "new" ? "success" : "danger"}
            size="sm"
            className="absolute left-1.5 top-1.5 z-10 shadow-sm"
          >
            {validBadge === "best-seller" && (
              <Flame aria-hidden="true" className="mr-1 size-3" />
            )}
            {badgeContent[validBadge]}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        {showBrand && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            {phone.brand}
          </p>
        )}

        <Link
          href={`/phones/${phone.slug}`}
          className={cn(
            "mt-1 line-clamp-2 font-bold leading-5 text-foreground transition hover:text-primary",
            compact ? "min-h-10 text-sm" : "min-h-10 text-sm sm:text-base",
          )}
        >
          {phone.name}
        </Link>

        <Price
          value={phone.basePrice}
          originalValue={phone.originalPrice}
          size={compact ? "sm" : "md"}
          className="mt-3"
        />

        <div className="mt-3 flex min-h-7 flex-wrap items-center gap-2">
          {showSoldCount && (
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <PackageCheck aria-hidden="true" className="size-3.5" />
              Đã bán {phone.soldCount.toLocaleString("vi-VN")}
            </span>
          )}

          {showStock && (
            <StockStatus
              stockQuantity={phone.stockQuantity}
              className="ml-auto"
            />
          )}
        </div>

        <div className={cn("mt-auto", compact ? "pt-3" : "pt-4")}>
          <Link
            href={`/phones/${phone.slug}`}
            className={cn(
              "inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-button border border-primary/20 bg-primary-soft px-3 text-sm font-semibold text-primary transition",
              "hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
            )}
          >
            Thêm vào giỏ hàng
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
