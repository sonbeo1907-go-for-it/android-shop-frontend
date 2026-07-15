"use client";

import {
  Filter,
  RotateCcw,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  ActiveFilterList,
  PhoneFilters,
  SortSelect,
  type ActiveFilter,
} from "@/components/phone";
import {
  Button,
  Drawer,
} from "@/components/ui";
import {
  formatCurrency,
} from "@/utils/currency";
import {
  usePhoneFilters,
} from "@/hooks/usePhoneFilters";

export type PhoneListControlsProps = {
  brands: string[];
  totalElements: number;
};

function createActiveFilters(
  keyword: string | undefined,
  brand: string | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined,
): ActiveFilter[] {
  const result: ActiveFilter[] = [];

  if (keyword) {
    result.push({
      key: "keyword",
      label: `Từ khóa: ${keyword}`,
    });
  }

  if (brand) {
    result.push({
      key: "brand",
      label: `Hãng: ${brand}`,
    });
  }

  if (
    minPrice !== undefined
    || maxPrice !== undefined
  ) {
    const minLabel =
      minPrice !== undefined
        ? formatCurrency(minPrice)
        : "0 ₫";

    const maxLabel =
      maxPrice !== undefined
        ? formatCurrency(maxPrice)
        : "Không giới hạn";

    result.push({
      key: "price",
      label: `Giá: ${minLabel} – ${maxLabel}`,
    });
  }

  return result;
}

export function PhoneListControls({
  brands,
  totalElements,
}: PhoneListControlsProps) {
  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  const {
    state,
    setFilters,
    setSort,
    removeFilter,
    clearAll,
  } = usePhoneFilters();

  const activeFilters = useMemo(
    () =>
      createActiveFilters(
        state.keyword,
        state.brand,
        state.minPrice,
        state.maxPrice,
      ),
    [
      state.brand,
      state.keyword,
      state.maxPrice,
      state.minPrice,
    ],
  );

  const filterValue = {
    keyword: state.keyword,
    brand: state.brand,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
  };

  return (
    <div className="space-y-4">
      <div className="hidden lg:block">
        <PhoneFilters
          value={filterValue}
          brands={brands}
          onChange={setFilters}
          onReset={clearAll}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            leftIcon={
              <Filter
                aria-hidden="true"
                className="size-4"
              />
            }
            className="lg:hidden"
            onClick={() => {
              setMobileFilterOpen(true);
            }}
          >
            Bộ lọc
          </Button>

          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={
                <RotateCcw
                  aria-hidden="true"
                  className="size-4"
                />
              }
              className="hidden sm:inline-flex"
              onClick={clearAll}
            >
              Xóa lọc
            </Button>
          )}

          <p className="text-sm text-muted">
            Tìm thấy{" "}
            <strong className="text-foreground">
              {totalElements}
            </strong>{" "}
            sản phẩm
          </p>
        </div>

        <SortSelect
          value={state.sort}
          onChange={setSort}
        />
      </div>

      <ActiveFilterList
        filters={activeFilters}
        onRemove={removeFilter}
        onClearAll={clearAll}
      />

      <Drawer
        open={mobileFilterOpen}
        title="Bộ lọc sản phẩm"
        side="bottom"
        onClose={() => {
          setMobileFilterOpen(false);
        }}
      >
        <PhoneFilters
          value={filterValue}
          brands={brands}
          mobile
          onChange={(value) => {
            setFilters(value);
            setMobileFilterOpen(false);
          }}
          onReset={() => {
            clearAll();
            setMobileFilterOpen(false);
          }}
        />
      </Drawer>
    </div>
  );
}
