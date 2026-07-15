"use client";

import {
  LockKeyhole,
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

export type CheckoutSubmitBarProps = {
  displayedTotal: number;
  loading?: boolean;
  disabled?: boolean;
  onSubmit: () => void;
  className?: string;
};

export function CheckoutSubmitBar({
  displayedTotal,
  loading = false,
  disabled = false,
  onSubmit,
  className,
}: CheckoutSubmitBarProps) {
  return (
    <div
      className={cn(
        "rounded-section border border-border bg-surface p-4 shadow-card",
        "sm:flex sm:items-center sm:justify-between sm:gap-5",
        className,
      )}
    >
      <div>
        <p className="text-sm text-muted">
          Tổng thanh toán hiển thị
        </p>

        <p className="mt-1 text-xl font-bold text-primary">
          {formatCurrency(
            displayedTotal,
          )}
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        loading={loading}
        disabled={disabled}
        leftIcon={
          <LockKeyhole
            aria-hidden="true"
            className="size-5"
          />
        }
        className="mt-3 w-full sm:mt-0 sm:w-auto"
        onClick={onSubmit}
      >
        Đặt hàng
      </Button>
    </div>
  );
}
