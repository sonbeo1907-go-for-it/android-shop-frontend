"use client";

import { BrandChip } from "@/components/common";
import { cn } from "@/utils/cn";

export type BrandFilterProps = {
  brands: string[];
  value?: string;
  onChange: (brand?: string) => void;
  className?: string;
};

export function BrandFilter({
  brands,
  value,
  onChange,
  className,
}: BrandFilterProps) {
  const normalizedBrands = Array.from(
    new Set(
      brands
        .map((brand) => brand.trim())
        .filter(Boolean),
    ),
  );

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      aria-label="Lọc theo thương hiệu"
    >
      <BrandChip
        name="Tất cả"
        active={!value}
        onClick={() => onChange(undefined)}
      />

      {normalizedBrands.map((brand) => (
        <BrandChip
          key={brand}
          name={brand}
          active={value?.toLowerCase() === brand.toLowerCase()}
          onClick={() => onChange(brand)}
        />
      ))}
    </div>
  );
}
