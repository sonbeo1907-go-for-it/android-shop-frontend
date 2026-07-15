import { BrandChip } from "@/components/common/BrandChip";
import { ContentSection, SectionHeader } from "@/components/ui";
import { cn } from "@/utils/cn";

export type BrandSectionItem = {
  name: string;
  logoSrc?: string;
  href: string;
};

export type BrandSectionProps = {
  brands: BrandSectionItem[];
  title?: string;
  subtitle?: string;
  activeBrand?: string;
  className?: string;
};

export function BrandSection({
  brands,
  title = "Thương hiệu nổi bật",
  subtitle,
  activeBrand,
  className,
}: BrandSectionProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <ContentSection className={className}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
      />

      <div
        className={cn(
          "mt-5 flex gap-2.5 overflow-x-auto pb-1",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {brands.map((brand) => (
          <BrandChip
            key={brand.name}
            name={brand.name}
            logoSrc={brand.logoSrc}
            href={brand.href}
            active={
              activeBrand?.toLowerCase()
              === brand.name.toLowerCase()
            }
          />
        ))}
      </div>
    </ContentSection>
  );
}
