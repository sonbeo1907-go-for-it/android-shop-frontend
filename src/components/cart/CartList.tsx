"use client";

import {
  CartItem,
} from "@/components/cart/CartItem";
import type {
  CartItem as CartItemModel,
} from "@/features/cart/cart.types";
import {
  cn,
} from "@/utils/cn";

export type CartListProps = {
  items: CartItemModel[];
  onQuantityChange: (
    key: string,
    quantity: number,
  ) => void;
  onRemove: (key: string) => void;
  className?: string;
};

export function CartList({
  items,
  onQuantityChange,
  onRemove,
  className,
}: CartListProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        className,
      )}
    >
      {items.map((item) => (
        <CartItem
          key={item.key}
          item={item}
          onQuantityChange={(
            quantity,
          ) => {
            onQuantityChange(
              item.key,
              quantity,
            );
          }}
          onRemove={() => {
            onRemove(item.key);
          }}
        />
      ))}
    </div>
  );
}
