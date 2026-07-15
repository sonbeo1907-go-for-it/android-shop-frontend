import {
  AtSign,
  CalendarClock,
  CreditCard,
  MapPin,
  PackageCheck,
  Phone,
  UserRound,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui";
import {
  OrderItemCard,
} from "@/components/order/OrderItemCard";
import type {
  OrderResponse,
} from "@/features/order/order.types";
import {
  formatOrderDate,
  normalizeOrder,
} from "@/features/order/order-view";
import {
  formatCurrency,
} from "@/utils/currency";
import {
  cn,
} from "@/utils/cn";

export type OrderDetailProps = {
  order: OrderResponse;
  compact?: boolean;
  className?: string;
};

function statusVariant(
  status: string,
):
  | "default"
  | "success"
  | "warning"
  | "danger" {
  switch (status) {
    case "PAID":
      return "success";

    case "PENDING":
    case "UNPAID":
    case "PENDING_CONFIRMATION":
      return "warning";

    case "CANCELLED":
      return "danger";

    default:
      return "default";
  }
}

export function OrderDetail({
  order,
  compact = false,
  className,
}: OrderDetailProps) {
  const normalized =
    normalizeOrder(order);

  const createdAt =
    formatOrderDate(
      normalized.createdAt,
    );

  return (
    <section
      className={cn(
        "rounded-section border border-border bg-surface shadow-card",
        compact
          ? "p-4"
          : "p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Chi tiết đơn hàng
          </h2>

          <p className="mt-1 text-sm text-muted">
            {normalized.orderCode}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={
              statusVariant(
                normalized.orderStatus,
              )
            }
          >
            {normalized.orderStatus}
          </Badge>

          <Badge
            variant={
              statusVariant(
                normalized.paymentStatus,
              )
            }
          >
            {normalized.paymentStatus}
          </Badge>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-4 border-b border-border py-5",
          compact
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        <div className="flex items-start gap-3">
          <UserRound
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Người nhận
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {normalized.receiverName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Số điện thoại
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {normalized.phoneNumber}
            </p>
          </div>
        </div>

        {normalized.email && (
            <div className="flex min-w-0 items-start gap-3">
              <AtSign
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-primary"
              />

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Email xác nhận
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-foreground">
                  {normalized.email}
                </p>
              </div>
            </div>
          )}

        <div className="flex items-start gap-3">
          <MapPin
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Địa chỉ
            </p>

            <p className="mt-1 text-sm leading-6 text-foreground">
              {normalized.address}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CreditCard
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Thanh toán
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {normalized.paymentMethod}
            </p>
          </div>
        </div>

        {createdAt && (
          <div className="flex items-start gap-3">
            <CalendarClock
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-primary"
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Thời gian
              </p>

              <p className="mt-1 text-sm text-foreground">
                {createdAt}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <PackageCheck
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Số dòng sản phẩm
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {normalized.items.length}
            </p>
          </div>
        </div>
      </div>

      {normalized.note && (
        <div className="border-b border-border py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Ghi chú
          </p>

          <p className="mt-1 text-sm leading-6 text-foreground">
            {normalized.note}
          </p>
        </div>
      )}

      <div className="py-5">
        <h3 className="font-bold text-foreground">
          Sản phẩm
        </h3>

        <div className="mt-4">
          {normalized.items.map(
            (_, index) => {
              const originalItems =
                (
                  order as unknown as {
                    items?: OrderResponse["items"];
                    orderItems?: OrderResponse["items"];
                  }
                ).items
                ?? (
                  order as unknown as {
                    orderItems?: OrderResponse["items"];
                  }
                ).orderItems
                ?? [];

              const originalItem =
                originalItems[index];

              return originalItem ? (
                <OrderItemCard
                  key={
                    normalized.items[index]
                      .id
                  }
                  item={originalItem}
                  index={index}
                />
              ) : null;
            },
          )}
        </div>
      </div>

      <dl className="space-y-3 border-t border-border pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">
            Tạm tính
          </dt>

          <dd className="font-semibold text-foreground">
            {formatCurrency(
              normalized.subtotal,
            )}
          </dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt className="text-muted">
            Phí vận chuyển
          </dt>

          <dd className="font-semibold text-foreground">
            {formatCurrency(
              normalized.shippingFee,
            )}
          </dd>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-border pt-4">
          <dt className="font-bold text-foreground">
            Tổng cộng
          </dt>

          <dd className="text-xl font-bold text-primary">
            {formatCurrency(
              normalized.totalAmount,
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
