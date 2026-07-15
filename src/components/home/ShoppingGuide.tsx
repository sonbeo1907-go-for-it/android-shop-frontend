import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck
} from "lucide-react";
import type { ReactNode } from "react";

import {
  ContentSection,
  SectionHeader,
} from "@/components/ui";
import { cn } from "@/utils/cn";

export type ShoppingGuideItem = {
  title: string;
  description: string;
  href?: string;
  imageSrc?: string;
  icon?: ReactNode;
};

export type ShoppingGuideProps = {
  items: ShoppingGuideItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

function GuideCard({
  item,
}: {
  item: ShoppingGuideItem;
}) {
  const content = (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition",
        item.href
          && "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover",
      )}
    >
      {item.imageSrc ? (
        <div className="relative aspect-[16/8] overflow-hidden bg-slate-100">
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary-soft to-white text-primary">
          <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm">
            {item.icon ?? (
              <BookOpenCheck
                aria-hidden="true"
                className="size-7"
              />
            )}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-foreground">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          {item.description}
        </p>

        {item.href && (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
            Xem chi tiết
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition group-hover:translate-x-0.5"
            />
          </span>
        )}
      </div>
    </article>
  );

  if (!item.href) {
    return content;
  }

  return (
    <Link
      href={item.href}
      className="block h-full"
    >
      {content}
    </Link>
  );
}

export function ShoppingGuide({
  items,
  title = "Gợi ý chọn điện thoại",
  subtitle = "Một số hướng dẫn nhanh giúp bạn tìm sản phẩm phù hợp hơn.",
  className,
}: ShoppingGuideProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ContentSection className={className}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={
          <BookOpenCheck
            aria-hidden="true"
            className="size-5"
          />
        }
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <GuideCard
            key={`${item.title}-${index}`}
            item={item}
          />
        ))}
      </div>
    </ContentSection>
  );
}
