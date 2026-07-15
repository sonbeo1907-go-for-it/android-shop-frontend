"use client";

import {
  Banknote,
  QrCode,
} from "lucide-react";

import {
  RadioCard,
} from "@/components/ui";
import type {
  PaymentMethod,
} from "@/features/checkout/checkout.types";

export type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (
    value: PaymentMethod,
  ) => void;
  error?: string;
};

export function PaymentMethodSelector({
  value,
  onChange,
  error,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Phương thức thanh toán"
        aria-invalid={
          Boolean(error)
        }
        className="grid gap-3 sm:grid-cols-2"
      >
        <RadioCard
          name="paymentMethod"
          value="COD"
          checked={value === "COD"}
          title="Thanh toán khi nhận hàng"
          description="Thanh toán trực tiếp khi đơn hàng được giao."
          icon={
            <Banknote
              aria-hidden="true"
              className="size-5"
            />
          }
          onChange={(nextValue) => {
            onChange(
              nextValue as PaymentMethod,
            );
          }}
        />

        <RadioCard
          name="paymentMethod"
          value="QR_TRANSFER"
          checked={
            value
            === "QR_TRANSFER"
          }
          title="Chuyển khoản QR"
          description="Thông tin QR sẽ xuất hiện sau khi tạo đơn thành công."
          icon={
            <QrCode
              aria-hidden="true"
              className="size-5"
            />
          }
          onChange={(nextValue) => {
            onChange(
              nextValue as PaymentMethod,
            );
          }}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-1.5 text-xs leading-5 text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}
