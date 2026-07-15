import {
  ShoppingCart,
} from "lucide-react";

import {
  EmptyState,
} from "@/components/ui";

export type EmptyCartProps = {
  continueShoppingHref?: string;
};

export function EmptyCart({
  continueShoppingHref =
    "/phones",
}: EmptyCartProps) {
  return (
    <EmptyState
      icon={
        <ShoppingCart
          aria-hidden="true"
          className="size-11"
        />
      }
      title="Giỏ hàng đang trống"
      description="Hãy chọn một điện thoại, chọn đầy đủ màu sắc, RAM và bộ nhớ rồi thêm vào giỏ hàng."
      actionLabel="Tiếp tục mua sắm"
      actionHref={
        continueShoppingHref
      }
      className="min-h-80"
    />
  );
}
