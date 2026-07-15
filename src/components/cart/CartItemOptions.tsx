import type {
  CartOption,
} from "@/features/cart/cart.types";
import type {
  PhoneOptionType,
} from "@/features/phone/phone.types";
import {
  cn,
} from "@/utils/cn";

export type CartItemOptionsProps = {
  options: CartOption[];
  className?: string;
};

const optionLabels:
  Record<PhoneOptionType, string> = {
    COLOR: "Màu",
    RAM: "RAM",
    STORAGE: "Bộ nhớ",
  };

const optionOrder:
  Record<PhoneOptionType, number> = {
    COLOR: 0,
    RAM: 1,
    STORAGE: 2,
  };

export function CartItemOptions({
  options,
  className,
}: CartItemOptionsProps) {
  if (options.length === 0) {
    return null;
  }

  const sortedOptions = [
    ...options,
  ].sort(
    (first, second) =>
      optionOrder[first.type]
      - optionOrder[second.type],
  );

  return (
    <dl
      className={cn(
        "flex flex-wrap gap-2",
        className,
      )}
    >
      {sortedOptions.map(
        (option) => (
          <div
            key={option.id}
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs"
          >
            <dt className="font-semibold text-slate-600">
              {optionLabels[
                option.type
              ]}:
            </dt>

            <dd className="text-foreground">
              {option.value}
            </dd>
          </div>
        ),
      )}
    </dl>
  );
}
