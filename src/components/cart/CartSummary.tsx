"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui";
import {
  formatCurrency,
} from "@/utils/currency";
import {
  cn,
} from "@/utils/cn";

export type CartSummaryProps = {
  subtotal: number;
  shippingFee?: number;
  total?: number;
  checkoutHref?: string;
  disabled?: boolean;
  onClearCart?: () => void;
  className?: string;
};

export function CartSummary({
  subtotal,
  shippingFee = 0,
  total,
  checkoutHref = "/checkout",
  disabled = false,
  onClearCart,
  className,
}: CartSummaryProps) {
  const calculatedTotal =
    total
    ?? subtotal
    + shippingFee;

  return (
    <aside
      className={cn(
        "rounded-section border border-border bg-surface p-5 shadow-card",
        className,
      )}
    >
      <h2 className="text-xl font-bold text-foreground">
        Tóm tắt giỏ hàng
      </h2>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">
            Tạm tính
          </dt>

          <dd className="font-semibold text-foreground">
            {formatCurrency(subtotal)}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">
            Phí vận chuyển
          </dt>

          <dd className="font-semibold text-foreground">
            {shippingFee > 0
              ? formatCurrency(
                  shippingFee,
                )
              : "Sẽ xác nhận"}
          </dd>
        </div>
      </dl>

      <div className="my-5 border-t border-border" />

      <div className="flex items-end justify-between gap-4">
        <p className="font-semibold text-foreground">
          Tổng hiển thị
        </p>

        <p className="text-xl font-bold text-primary">
          {formatCurrency(
            calculatedTotal,
          )}
        </p>
      </div>
      
        <p className="mt-2 text-xs leading-5 text-muted">
          Giá sản phẩm và phí giao hàng sẽ được
          xác nhận khi đơn hàng được tạo.
        </p>

      <Link
        href={disabled ? "#" : checkoutHref}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={cn(
          "primary-link-button mt-5 min-h-12 w-full gap-2 px-5 text-base font-bold",
          disabled &&
            "pointer-events-none cursor-not-allowed opacity-60",
        )}
      >
        Tiến hành thanh toán

        <ArrowRight
          aria-hidden="true"
          className="size-5"
        />
      </Link>

      <div className="mt-4 flex items-start gap-2 rounded-card bg-primary-soft p-3 text-xs leading-5 text-primary-dark">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0"
        />

        <p>
          Giá và phí giao hàng sẽ được xác nhận
          khi bạn đặt hàng.
        </p>
      </div>

      {onClearCart && (
        <Button
          variant="ghost"
          fullWidth
          leftIcon={
            <Trash2
              aria-hidden="true"
              className="size-4"
            />
          }
          className="mt-3 text-danger hover:bg-red-50 hover:text-danger"
          onClick={
            onClearCart
          }
        >
          Xóa toàn bộ giỏ hàng
        </Button>
      )}
    </aside>
  );
}
