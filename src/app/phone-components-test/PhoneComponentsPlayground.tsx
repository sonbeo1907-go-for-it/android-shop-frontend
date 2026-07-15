"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  ActiveFilterList,
  AddToCartPanel,
  PhoneFilters,
  PhoneGallery,
  PhoneOptionSelector,
  PhoneSpecifications,
  SortSelect,
  type ActiveFilter,
  type PhoneFilterValue,
  type SortValue,
} from "@/components/phone";
import { ContentSection, SectionHeader } from "@/components/ui";
import type {
  PhoneDetailResponse,
  SelectedPhoneOptions,
} from "@/features/phone/phone.types";
import { formatCurrency } from "@/utils/currency";

export type PhoneComponentsPlaygroundProps = {
  detail: PhoneDetailResponse;
  brands: string[];
};

export function PhoneComponentsPlayground({
  detail,
  brands,
}: PhoneComponentsPlaygroundProps) {
  const [filters, setFilters] = useState<PhoneFilterValue>({});
  const [sort, setSort] = useState<SortValue>("newest");
  const [selectedOptions, setSelectedOptions] =
    useState<SelectedPhoneOptions>({});
  const [quantity, setQuantity] = useState(1);

  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const result: ActiveFilter[] = [];

    if (filters.keyword) {
      result.push({
        key: "keyword",
        label: `Từ khóa: ${filters.keyword}`,
      });
    }

    if (filters.brand) {
      result.push({
        key: "brand",
        label: `Hãng: ${filters.brand}`,
      });
    }

    if (filters.minPrice !== undefined) {
      result.push({
        key: "minPrice",
        label: `Từ ${formatCurrency(filters.minPrice)}`,
      });
    }

    if (filters.maxPrice !== undefined) {
      result.push({
        key: "maxPrice",
        label: `Đến ${formatCurrency(filters.maxPrice)}`,
      });
    }

    return result;
  }, [filters]);

  return (
    <div className="space-y-6">
      <ContentSection>
        <SectionHeader
          title="Bộ lọc sản phẩm"
          subtitle="Trang kiểm tra chỉ cập nhật state, chưa thay đổi URL hoặc gọi lại API."
        />

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_18rem]">
          <PhoneFilters
            value={filters}
            brands={brands}
            onChange={setFilters}
            onReset={() => setFilters({})}
          />

          <SortSelect
            value={sort}
            onChange={setSort}
          />
        </div>

        <ActiveFilterList
          filters={activeFilters}
          className="mt-5"
          onRemove={(key) => {
            setFilters((current) => {
              switch (key) {
                case "keyword":
                  return { ...current, keyword: undefined };
                case "brand":
                  return { ...current, brand: undefined };
                case "minPrice":
                  return { ...current, minPrice: undefined };
                case "maxPrice":
                  return { ...current, maxPrice: undefined };
                default:
                  return current;
              }
            });
          }}
          onClearAll={() => setFilters({})}
        />
      </ContentSection>

      <ContentSection>
        <SectionHeader
          title="Gallery, option và thêm giỏ"
          subtitle={detail.name}
        />

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <PhoneGallery
            images={detail.images}
            thumbnailUrl={detail.thumbnailUrl}
            alt={detail.name}
            colorImage={selectedOptions.COLOR?.imageUrl}
          />

          <div className="space-y-6">
            <PhoneOptionSelector
              groups={detail.optionGroups}
              value={selectedOptions}
              onChange={setSelectedOptions}
            />

            <AddToCartPanel
              basePrice={detail.basePrice}
              selectedOptions={selectedOptions}
              quantity={quantity}
              stockQuantity={detail.stockQuantity}
              onQuantityChange={setQuantity}
              onAddToCart={() => {
                toast.success("Callback thêm giỏ đã được gọi.");
              }}
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeader title="Thông số kỹ thuật" />
        <PhoneSpecifications
          specifications={detail.specifications}
          className="mt-5"
        />
      </ContentSection>
    </div>
  );
}
