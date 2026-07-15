import Link from "next/link";

import {
  CartItemOptions,
} from "@/components/cart";
import {
  PhoneImage,
} from "@/components/phone";
import type {
  CartItem,
} from "@/features/cart/cart.types";
import {
  formatCurrency,
} from "@/utils/currency";

export type CheckoutOrderItemProps = {
  item: CartItem;
};

export function CheckoutOrderItem({
  item,
}: CheckoutOrderItemProps) {
  const lineTotal =
    item.displayedUnitPrice
    * item.quantity;

  return (
    <article className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 border-b border-border py-4 last:border-b-0">
      <Link
        href={`/phones/${item.slug}`}
        className="relative aspect-square overflow-hidden rounded-card border border-border bg-white"
      >
        <PhoneImage
          src={item.thumbnailUrl}
          alt={item.phoneName}
          fill
          sizes="72px"
          className="object-contain p-1.5"
        />

        <span className="absolute right-1 top-1 flex min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold leading-5 text-white">
          {item.quantity}
        </span>
      </Link>

      <div className="min-w-0">
        <Link
          href={`/phones/${item.slug}`}
          className="line-clamp-2 text-sm font-bold leading-5 text-foreground transition hover:text-primary"
        >
          {item.phoneName}
        </Link>

        <CartItemOptions
          options={
            item.selectedOptions
          }
          className="mt-2"
        />

        <div className="mt-2 flex items-end justify-between gap-3 text-sm">
          <p className="text-muted">
            {formatCurrency(
              item.displayedUnitPrice,
            )}{" "}
            × {item.quantity}
          </p>

          <p className="shrink-0 font-bold text-primary">
            {formatCurrency(
              lineTotal,
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
