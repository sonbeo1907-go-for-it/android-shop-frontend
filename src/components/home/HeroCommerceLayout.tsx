import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import type { ReactNode } from "react";

import { PromotionBanner } from "@/components/common";
import { cn } from "@/utils/cn";

export type BannerData = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  href?: string;
  title?: string;
  description?: string;
  priority?: boolean;
};

export type HeroCategory = {
  label: string;
  href: string;
  icon?: ReactNode;
};

export type HeroCommerceLayoutProps = {
  categories: HeroCategory[];
  mainBanner: BannerData;
  sideBanners: BannerData[];
  className?: string;
};

function CategorySidebar({
  categories,
}: {
  categories: HeroCategory[];
}) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <aside className="order-2 rounded-section border border-border bg-surface p-3 shadow-card lg:order-1">
      <div className="hidden items-center gap-2 border-b border-border px-2 pb-3 font-bold text-foreground lg:flex">
        <LayoutGrid
          aria-hidden="true"
          className="size-5 text-primary"
        />

        Danh mục nhanh
      </div>

      <nav aria-label="Danh mục điện thoại">
        <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-2 lg:block lg:space-y-0.5 lg:overflow-visible lg:pb-0">
          {categories.map((category) => (
            <li
              key={`${category.label}-${category.href}`}
              className="shrink-0"
            >
              <Link
                href={category.href}
                className={cn(
                  "group flex min-h-10 items-center gap-2 rounded-button border border-border bg-white px-3 text-sm font-semibold text-foreground transition",
                  "hover:border-primary hover:bg-primary-soft hover:text-primary",
                  "lg:min-h-9 lg:border-transparent lg:bg-transparent lg:px-2.5",
                )}
              >
                {category.icon && (
                  <span
                    aria-hidden="true"
                    className="flex size-5 shrink-0 items-center justify-center text-primary"
                  >
                    {category.icon}
                  </span>
                )}

                <span>{category.label}</span>

                <ChevronRight
                  aria-hidden="true"
                  className="ml-auto hidden size-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary lg:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function SideBanner({
  banner,
}: {
  banner: BannerData;
}) {
  return (
    <PromotionBanner
      {...banner}
      aspectRatio="wide"
      className="
        w-full min-w-0
        min-h-40
        aspect-[16/8]
        sm:aspect-[16/6]
        lg:h-full
        lg:min-h-0
        lg:aspect-auto
      "
    />
  );
}

export function HeroCommerceLayout({
  categories,
  mainBanner,
  sideBanners,
  className,
}: HeroCommerceLayoutProps) {
  const visibleSideBanners =
    sideBanners.slice(0, 2);

  return (
    <section
      aria-label="Khuyến mãi và danh mục nổi bật"
      className={cn(
        "grid items-stretch gap-4 lg:grid-cols-[14rem_minmax(0,1fr)_19rem]",
        className,
      )}
    >
      <CategorySidebar categories={categories} />

      <div className="order-1 min-w-0 overflow-hidden rounded-section lg:order-2 lg:h-full">
        <PromotionBanner
          {...mainBanner}
          priority={mainBanner.priority ?? true}
          aspectRatio="hero"
          className="w-full min-w-0 lg:h-full lg:min-h-[23rem] lg:aspect-auto" 
        >
          {mainBanner.href && (
            <span className="inline-flex min-h-10 items-center gap-2 rounded-button bg-white px-4 text-sm font-bold text-primary shadow-sm">
              Xem sản phẩm

              <ArrowRight
                aria-hidden="true"
                className="size-4"
              />
            </span>
          )}
        </PromotionBanner>
      </div>

      {visibleSideBanners.length > 0 && (
        <div className="    order-3
                            grid
                            min-w-0
                            gap-4
                            sm:grid-cols-2
                            lg:h-full
                            lg:min-h-[23rem]
                            lg:grid-cols-1
                            lg:grid-rows-2">
          {visibleSideBanners.map(
            (banner, index) => (
              <SideBanner
                key={`${banner.alt}-${index}`}
                banner={banner}
              />
            ),
          )}
        </div>
      )}
    </section>
  );
}