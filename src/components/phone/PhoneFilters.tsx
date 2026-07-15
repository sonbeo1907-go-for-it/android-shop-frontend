"use client";

import { useEffect, useState, type FormEvent } from "react";
import { RotateCcw, Search } from "lucide-react";

import { BrandFilter } from "@/components/phone/BrandFilter";
import { PriceFilter } from "@/components/phone/PriceFilter";
import { Button, Input } from "@/components/ui";
import { cn } from "@/utils/cn";

export type PhoneFilterValue = {
  keyword?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type PhoneFiltersProps = {
  value: PhoneFilterValue;
  brands: string[];
  mobile?: boolean;
  onChange: (value: PhoneFilterValue) => void;
  onReset: () => void;
  className?: string;
};

export function PhoneFilters({
  value,
  brands,
  mobile = false,
  onChange,
  onReset,
  className,
}: PhoneFiltersProps) {
  const [keyword, setKeyword] = useState(value.keyword ?? "");

  useEffect(() => {
    setKeyword(value.keyword ?? "");
  }, [value.keyword]);

  function handleKeywordSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    onChange({
      ...value,
      keyword: keyword.trim() || undefined,
    });
  }

  return (
    <div
      className={cn(
        "space-y-5 rounded-section border border-border bg-surface p-4 shadow-card",
        !mobile && "sm:p-5",
        className,
      )}
    >
      <form
        className="flex items-end gap-2"
        onSubmit={handleKeywordSubmit}
      >
        <Input
          label="Tìm sản phẩm"
          value={keyword}
          placeholder="Tên, hãng hoặc model"
          leftIcon={<Search aria-hidden="true" className="size-4" />}
          onChange={(event) => setKeyword(event.target.value)}
        />

        <Button type="submit" className="shrink-0">
          Tìm
        </Button>
      </form>

      <div>
        <p className="mb-2 text-sm font-semibold text-foreground">
          Thương hiệu
        </p>

        <BrandFilter
          brands={brands}
          value={value.brand}
          onChange={(brand) => {
            onChange({
              ...value,
              brand,
            });
          }}
        />
      </div>

      <PriceFilter
        minPrice={value.minPrice}
        maxPrice={value.maxPrice}
        onChange={(price) => {
          onChange({
            ...value,
            ...price,
          });
        }}
      />

      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw aria-hidden="true" className="size-4" />}
          onClick={() => {
            setKeyword("");
            onReset();
          }}
        >
          Đặt lại bộ lọc
        </Button>
      </div>
    </div>
  );
}
