import {
  ShieldCheck,
} from "lucide-react";

import {
  CheckoutOrderItem,
} from "@/components/checkout/CheckoutOrderItem";
import type {
  CartItem,
} from "@/features/cart/cart.types";
import {
  formatCurrency,
} from "@/utils/currency";
import {
  cn,
} from "@/utils/cn";

export type OrderSummaryProps = {
  items: CartItem[];
  displayedSubtotal: number;
  displayedShippingFee?: number;
  displayedTotal: number;
  className?: string;
};

export function OrderSummary({
  items,
  displayedSubtotal,
  displayedShippingFee = 0,
  displayedTotal,
  className,
}: OrderSummaryProps) {
  return (
    <aside
      className={cn(
        "rounded-section border border-border bg-surface p-5 shadow-card",
        className,
      )}
    >
      <h2 className="text-xl font-bold text-foreground">
        Đơn hàng của bạn
      </h2>

      <p className="mt-1 text-sm text-muted">
        {items.length} cấu hình sản phẩm
      </p>

      <div className="mt-3">
        {items.map((item) => (
          <CheckoutOrderItem
            key={item.key}
            item={item}
          />
        ))}
      </div>

      <dl className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">
            Tạm tính
          </dt>

          <dd className="font-semibold text-foreground">
            {formatCurrency(
              displayedSubtotal,
            )}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">
            Phí vận chuyển hiển thị
          </dt>

          <dd className="font-semibold text-foreground">
            {displayedShippingFee > 0
              ? formatCurrency(
                  displayedShippingFee,
                )
              : "Sẽ xác nhận"}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-end justify-between gap-4 border-t border-border pt-4">
        <p className="font-bold text-foreground">
          Tổng hiển thị
        </p>

        <p className="text-xl font-bold text-primary">
          {formatCurrency(
            displayedTotal,
          )}
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-card bg-primary-soft p-3 text-xs leading-5 text-primary-dark">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0"
        />

      <p>
        Tổng tiền trên màn hình là tạm tính.
        Giá, tình trạng sản phẩm và phí giao
        hàng sẽ được xác nhận khi tạo đơn.
      </p>
      </div>
    </aside>
  );
}
