import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type PromotionBannerProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  href?: string;
  title?: string;
  description?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: "wide" | "hero" | "square";
  children?: ReactNode;
};

const aspectClasses = {
  wide: "aspect-[16/5] sm:aspect-[16/4]",
  hero: "aspect-[16/8] sm:aspect-[16/6] lg:aspect-[16/5]",
  square: "aspect-square",
} as const;

export function PromotionBanner({
  desktopSrc,
  mobileSrc,
  alt,
  href,
  title,
  description,
  priority = false,
  className,
  aspectRatio = "wide",
  children,
}: PromotionBannerProps) {
  const content = (
    <article
      className={cn(
        "group relative overflow-hidden rounded-section bg-slate-200 shadow-card",
        aspectClasses[aspectRatio],
        href && "transition hover:-translate-y-0.5 hover:shadow-card-hover",
        className,
      )}
    >
      {mobileSrc ? (
        <>
          <Image
            src={mobileSrc}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 767px) 100vw, 1px"
            className="object-cover md:hidden"
          />

          <Image
            src={desktopSrc}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="hidden object-cover md:block"
          />
        </>
      ) : (
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
      )}

      {(title || description || children) && (
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-slate-950/75 via-slate-950/35 to-transparent p-5 text-white sm:p-8 lg:p-10">
          <div className="max-w-xl">
            {title && (
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/85 sm:text-base">
                {description}
              </p>
            )}

            {children && (
              <div className="mt-4">{children}</div>
            )}
          </div>
        </div>
      )}
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} aria-label={title || alt}>
      {content}
    </Link>
  );
}
