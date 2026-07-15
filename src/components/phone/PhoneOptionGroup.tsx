"use client";

import { PhoneOptionItem } from "@/components/phone/PhoneOptionItem";
import type {
  PhoneOptionResponse,
  PhoneOptionType,
} from "@/features/phone/phone.types";

export type PhoneOptionGroupProps = {
  label: string;
  type: PhoneOptionType;
  options: PhoneOptionResponse[];
  selectedOptionId?: number;
  error?: string;
  onSelect: (option: PhoneOptionResponse) => void;
};

export function PhoneOptionGroup({
  label,
  type,
  options,
  selectedOptionId,
  error,
  onSelect,
}: PhoneOptionGroupProps) {
  const sortedOptions = [...options].sort(
    (first, second) =>
      first.displayOrder - second.displayOrder
      || first.id - second.id,
  );

  if (sortedOptions.length === 0) {
    return null;
  }

  return (
    <fieldset
      aria-describedby={error ? `${type}-error` : undefined}
      className="min-w-0"
    >
      <legend className="text-sm font-bold text-foreground">
        {label}
      </legend>

      <div className="mt-2.5 flex flex-wrap gap-2.5">
        {sortedOptions.map((option) => (
          <PhoneOptionItem
            key={option.id}
            option={option}
            selected={selectedOptionId === option.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      {error && (
        <p
          id={`${type}-error`}
          className="mt-2 text-xs font-medium text-danger"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
