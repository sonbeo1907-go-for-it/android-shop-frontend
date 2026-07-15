"use client";

import Link from "next/link";
import {
  Trash2,
} from "lucide-react";

import {
  CartItemOptions,
} from "@/components/cart/CartItemOptions";
import {
  PhoneImage,
} from "@/components/phone";
import {
  IconButton,
  Price,
  QuantitySelector,
} from "@/components/ui";
import type {
  CartItem as CartItemModel,
} from "@/features/cart/cart.types";
import {
  MAX_CART_ITEM_QUANTITY,
} from "@/features/cart/cart.store";
import {
  formatCurrency,
} from "@/utils/currency";
import {
  cn,
} from "@/utils/cn";

export type CartItemProps = {
  item: CartItemModel;
  onQuantityChange: (
    quantity: number,
  ) => void;
  onRemove: () => void;
  className?: string;
};

export function CartItem({
  item,
  onQuantityChange,
  onRemove,
  className,
}: CartItemProps) {
  const maxQuantity = Math.max(
    1,
    Math.min(
      MAX_CART_ITEM_QUANTITY,
      item.stockQuantity,
    ),
  );

  const lineTotal =
    item.displayedUnitPrice
    * item.quantity;

  const outOfStock =
    item.stockQuantity <= 0;

  return (
    <article
      className={cn(
        "rounded-section border border-border bg-surface p-4 shadow-card sm:p-5",
        className,
      )}
    >
      <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto]">
        <Link
          href={`/phones/${item.slug}`}
          className="group relative aspect-square overflow-hidden rounded-card border border-border bg-white"
        >
          <PhoneImage
            src={item.thumbnailUrl}
            alt={item.phoneName}
            fill
            sizes="128px"
            className="object-contain p-2 transition duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/phones/${item.slug}`}
                className="line-clamp-2 font-bold leading-6 text-foreground transition hover:text-primary"
              >
                {item.phoneName}
              </Link>

              <CartItemOptions
                options={
                  item.selectedOptions
                }
                className="mt-2.5"
              />
            </div>

            <IconButton
              icon={
                <Trash2
                  aria-hidden="true"
                  className="size-4"
                />
              }
              label={`Xóa ${item.phoneName} khỏi giỏ hàng`}
              variant="danger"
              size="sm"
              className="shrink-0 sm:hidden"
              onClick={onRemove}
            />
          </div>

          <Price
            value={
              item.displayedUnitPrice
            }
            size="sm"
            showDiscount={false}
            className="mt-3"
          />

          {outOfStock ? (
            <p className="mt-3 text-sm font-semibold text-danger">
              Sản phẩm đang hết hàng
            </p>
          ) : (
            <p className="mt-3 text-xs text-muted">
              Tối đa{" "}
              {maxQuantity} sản phẩm
              cho cấu hình này.
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:hidden">
            <QuantitySelector
              value={item.quantity}
              min={1}
              max={maxQuantity}
              disabled={outOfStock}
              onChange={
                onQuantityChange
              }
            />

            <div className="text-right">
              <p className="text-xs text-muted">
                Thành tiền
              </p>

              <p className="font-bold text-primary">
                {formatCurrency(
                  lineTotal,
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden min-w-40 flex-col items-end justify-between gap-4 sm:flex">
          <IconButton
            icon={
              <Trash2
                aria-hidden="true"
                className="size-4"
              />
            }
            label={`Xóa ${item.phoneName} khỏi giỏ hàng`}
            variant="danger"
            size="sm"
            onClick={onRemove}
          />

          <QuantitySelector
            value={item.quantity}
            min={1}
            max={maxQuantity}
            disabled={outOfStock}
            onChange={
              onQuantityChange
            }
          />

          <div className="text-right">
            <p className="text-xs text-muted">
              Thành tiền
            </p>

            <p className="mt-1 font-bold text-primary">
              {formatCurrency(
                lineTotal,
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
