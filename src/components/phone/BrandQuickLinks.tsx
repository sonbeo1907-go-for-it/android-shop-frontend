import {
  BrandChip,
} from "@/components/common";
import {
  ContentSection,
  SectionHeader,
} from "@/components/ui";
import {
  cn,
} from "@/utils/cn";

export type BrandQuickLinksProps = {
  brands: string[];
  activeBrand?: string;
};

export function BrandQuickLinks({
  brands,
  activeBrand,
}: BrandQuickLinksProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <ContentSection padding="sm">
      <SectionHeader
        title="Chọn theo thương hiệu"
      />

      <div
        className={cn(
          "mt-4 flex gap-2 overflow-x-auto pb-1",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <BrandChip
          name="Tất cả"
          href="/phones"
          active={!activeBrand}
        />

        {brands.map((brand) => (
          <BrandChip
            key={brand}
            name={brand}
            href={`/phones?brand=${encodeURIComponent(
              brand,
            )}`}
            active={
              activeBrand?.toLowerCase()
              === brand.toLowerCase()
            }
          />
        ))}
      </div>
    </ContentSection>
  );
}
