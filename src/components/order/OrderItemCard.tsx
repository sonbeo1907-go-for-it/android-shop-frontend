import Link from "next/link";

import {
  PhoneImage,
} from "@/components/phone";
import type {
  OrderItemResponse,
} from "@/features/order/order.types";
import {
  normalizeOrderItem,
} from "@/features/order/order-view";
import {
  formatCurrency,
} from "@/utils/currency";

export type OrderItemCardProps = {
  item: OrderItemResponse;
  index?: number;
};

export function OrderItemCard({
  item,
  index = 0,
}: OrderItemCardProps) {
  const normalized =
    normalizeOrderItem(
      item,
      index,
    );

  const image = (
    <div className="relative aspect-square overflow-hidden rounded-card border border-border bg-white">
      <PhoneImage
        src={
          normalized.thumbnailUrl
          || "/images/phone-placeholder.svg"
        }
        alt={normalized.phoneName}
        fill
        sizes="88px"
        className="object-contain p-2"
      />
    </div>
  );

  return (
    <article className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0">
      {normalized.slug ? (
        <Link
          href={`/phones/${normalized.slug}`}
          aria-label={`Xem ${normalized.phoneName}`}
        >
          {image}
        </Link>
      ) : (
        image
      )}

      <div className="min-w-0">
        {normalized.slug ? (
          <Link
            href={`/phones/${normalized.slug}`}
            className="line-clamp-2 font-bold leading-6 text-foreground transition hover:text-primary"
          >
            {normalized.phoneName}
          </Link>
        ) : (
          <h3 className="line-clamp-2 font-bold leading-6 text-foreground">
            {normalized.phoneName}
          </h3>
        )}

        {normalized.optionLabels.length
          > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {normalized.optionLabels.map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
                >
                  {label}
                </span>
              ),
            )}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-end justify-between gap-3 text-sm">
          <p className="text-muted">
            {formatCurrency(
              normalized.unitPrice,
            )}{" "}
            × {normalized.quantity}
          </p>

          <p className="font-bold text-primary">
            {formatCurrency(
              normalized.lineTotal,
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
