"use client";

import { PhoneOptionGroup } from "@/components/phone/PhoneOptionGroup";
import type {
  PhoneOptionGroupResponse,
  PhoneOptionResponse,
  PhoneOptionType,
  SelectedPhoneOptions,
} from "@/features/phone/phone.types";

export type PhoneOptionSelectorProps = {
  groups: PhoneOptionGroupResponse[];
  value: SelectedPhoneOptions;
  errors?: Partial<Record<PhoneOptionType, string>>;
  onChange: (value: SelectedPhoneOptions) => void;
};

const groupLabels: Record<PhoneOptionType, string> = {
  COLOR: "Màu sắc",
  RAM: "Dung lượng RAM",
  STORAGE: "Bộ nhớ trong",
};

const groupOrder: Record<PhoneOptionType, number> = {
  COLOR: 0,
  RAM: 1,
  STORAGE: 2,
};

export function PhoneOptionSelector({
  groups,
  value,
  errors,
  onChange,
}: PhoneOptionSelectorProps) {
  const sortedGroups = [...groups].sort(
    (first, second) =>
      groupOrder[first.type] - groupOrder[second.type],
  );

  function selectOption(
    type: PhoneOptionType,
    option: PhoneOptionResponse,
  ) {
    onChange({
      ...value,
      [type]: option,
    });
  }

  return (
    <div className="space-y-5">
      {sortedGroups.map((group) => (
        <PhoneOptionGroup
          key={group.type}
          label={groupLabels[group.type]}
          type={group.type}
          options={group.values}
          selectedOptionId={value[group.type]?.id}
          error={errors?.[group.type]}
          onSelect={(option) => {
            selectOption(group.type, option);
          }}
        />
      ))}
    </div>
  );
}
