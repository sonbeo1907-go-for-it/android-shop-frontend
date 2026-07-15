"use client";

import {
  CheckCircle2,
  Copy,
} from "lucide-react";

import {
  Badge,
  Button,
  Price,
} from "@/components/ui";
import type {
  PaymentMethod,
} from "@/features/checkout/checkout.types";
import {
  cn,
} from "@/utils/cn";

export type OrderSuccessCardProps = {
  orderCode: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  onCopyOrderCode?: () => void;
  className?: string;
};

const paymentLabels:
  Record<PaymentMethod, string> = {
    COD: "Thanh toán khi nhận hàng",
    QR_TRANSFER:
      "Chuyển khoản QR",
  };

export function OrderSuccessCard({
  orderCode,
  paymentMethod,
  totalAmount,
  onCopyOrderCode,
  className,
}: OrderSuccessCardProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-section border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-6 shadow-card sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2
            aria-hidden="true"
            className="size-8"
          />
        </span>

        <div className="min-w-0 flex-1">
          <Badge
            variant="success"
            size="md"
          >
            Đặt hàng thành công
          </Badge>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Cảm ơn bạn đã đặt hàng
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted">
            Cửa hàng đã nhận đơn và
            sẽ xử lý theo trạng thái
            hiển thị bên dưới.
          </p>

          <div className="mt-5 grid gap-4 rounded-card border border-border bg-white p-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Mã đơn hàng
              </p>

              <div className="mt-1 flex items-center gap-2">
                <strong className="break-all text-lg text-primary">
                  {orderCode}
                </strong>

                {onCopyOrderCode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={
                      <Copy
                        aria-hidden="true"
                        className="size-4"
                      />
                    }
                    onClick={
                      onCopyOrderCode
                    }
                  >
                    Sao chép
                  </Button>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Thanh toán
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {
                  paymentLabels[
                    paymentMethod
                  ]
                }
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Tổng đơn
              </p>

              <Price
                value={totalAmount}
                size="md"
                showDiscount={false}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
