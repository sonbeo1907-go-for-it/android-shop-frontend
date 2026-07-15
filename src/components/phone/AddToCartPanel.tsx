"use client";

import { ShoppingCart } from "lucide-react";

import { StockStatus } from "@/components/phone/StockStatus";
import { Button, Price, QuantitySelector } from "@/components/ui";
import type {
  PhoneOptionType,
  SelectedPhoneOptions,
} from "@/features/phone/phone.types";

export type AddToCartPanelProps = {
  basePrice: number;
  selectedOptions: SelectedPhoneOptions;
  quantity: number;
  stockQuantity: number;
  disabled?: boolean;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
};

const requiredTypes: PhoneOptionType[] = [
  "COLOR",
  "RAM",
  "STORAGE",
];

const optionLabels: Record<PhoneOptionType, string> = {
  COLOR: "màu sắc",
  RAM: "RAM",
  STORAGE: "bộ nhớ",
};

export function AddToCartPanel({
  basePrice,
  selectedOptions,
  quantity,
  stockQuantity,
  disabled = false,
  onQuantityChange,
  onAddToCart,
}: AddToCartPanelProps) {
  const selectedValues = requiredTypes
    .map((type) => selectedOptions[type])
    .filter((option) => option !== undefined);
  const optionExtraPrice = requiredTypes.reduce(
    (total, type) =>
      total + (selectedOptions[type]?.extraPrice ?? 0),
    0,
  );
  const unitPrice = basePrice + optionExtraPrice;
  const safeStock = Math.max(0, Math.floor(stockQuantity));
  const maxQuantity = Math.max(1, Math.min(10, safeStock));
  const missingTypes = requiredTypes.filter(
    (type) => !selectedOptions[type],
  );
  const outOfStock = safeStock <= 0;
  const cannotAdd =
    disabled
    || outOfStock
    || missingTypes.length > 0;

  return (
    <section className="rounded-section border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-muted">
            Giá theo cấu hình đã chọn
          </p>
          <Price value={unitPrice} size="lg" className="mt-2" />
        </div>

        <StockStatus
          stockQuantity={safeStock}
          showQuantity
        />
      </div>

      {selectedValues.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
          {requiredTypes.map((type) => {
            const option = selectedOptions[type];

            if (!option) {
              return null;
            }

            return (
              <li
                key={type}
                className="rounded-full border border-border bg-slate-50 px-2.5 py-1"
              >
                {option.value}
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            Số lượng
          </p>
          <QuantitySelector
            value={quantity}
            min={1}
            max={maxQuantity}
            disabled={outOfStock || disabled}
            onChange={onQuantityChange}
          />
        </div>

        <Button
          size="lg"
          fullWidth
          disabled={cannotAdd}
          leftIcon={<ShoppingCart aria-hidden="true" className="size-5" />}
          className="sm:flex-1"
          onClick={onAddToCart}
        >
          {outOfStock ? "Sản phẩm đã hết hàng" : "Thêm vào giỏ hàng"}
        </Button>
      </div>

      {missingTypes.length > 0 && !outOfStock && (
        <p className="mt-3 text-xs font-medium text-danger">
          Vui lòng chọn {missingTypes.map((type) => optionLabels[type]).join(", ")}.
        </p>
      )}

      <p className="mt-3 text-xs leading-5 text-muted">
        Giá có thể thay đổi theo cấu hình đã chọn.
        Tình trạng sản phẩm và tổng tiền sẽ được
        xác nhận khi đặt hàng.
      </p>
    </section>
  );
}
