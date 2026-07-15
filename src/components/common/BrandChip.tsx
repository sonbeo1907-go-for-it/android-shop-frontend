"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/cn";

export type BrandChipProps = {
  name: string;
  logoSrc?: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function BrandChip({
  name,
  logoSrc,
  active = false,
  href,
  onClick,
  className,
}: BrandChipProps) {
  const content = (
    <>
      {logoSrc ? (
        <span className="relative h-6 w-14">
          <Image
            src={logoSrc}
            alt=""
            fill
            sizes="56px"
            className="object-contain"
          />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-7 items-center justify-center rounded-full text-xs font-bold",
            active
              ? "bg-white/20 text-current"
              : "bg-slate-100 text-slate-600",
          )}
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}

      <span>{name}</span>
    </>
  );

  const styles = cn(
    "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-button border px-3 text-sm font-semibold transition",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
    active
      ? "border-primary bg-primary text-white"
      : "border-border bg-surface text-foreground hover:border-primary hover:bg-primary-soft hover:text-primary",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={styles}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      className={styles}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
