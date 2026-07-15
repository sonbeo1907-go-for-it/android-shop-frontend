import {
  CheckCircle2,
} from "lucide-react";

import {
  OrderDetail,
} from "@/components/order/OrderDetail";
import {
  Badge,
} from "@/components/ui";
import type {
  OrderResponse,
} from "@/features/order/order.types";
import {
  cn,
} from "@/utils/cn";

export type OrderLookupResultProps = {
  order: OrderResponse;
  className?: string;
};

export function OrderLookupResult({
  order,
  className,
}: OrderLookupResultProps) {
  return (
    <section
      className={cn(
        "space-y-4",
        className,
      )}
    >
      <div className="flex flex-col gap-3 rounded-section border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
          <CheckCircle2
            aria-hidden="true"
            className="size-6"
          />
        </span>

        <div>
          <Badge variant="success">
            Đã tìm thấy đơn hàng
          </Badge>

          <p className="mt-2 text-sm leading-6 text-emerald-800">
            Đơn hàng đã được tìm thấy.
            Vui lòng kiểm tra thông tin bên dưới.
          </p>
        </div>
      </div>

      <OrderDetail
        order={order}
      />
    </section>
  );
}
