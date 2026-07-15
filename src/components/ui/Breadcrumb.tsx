import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/utils/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
};

export function Breadcrumb({
  items,
  showHomeIcon = true,
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex min-w-0 items-center gap-1 overflow-hidden text-sm text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
              {index > 0 && (
                <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
              )}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex min-w-0 items-center gap-1 truncate hover:text-primary"
                >
                  {showHomeIcon && index === 0 && (
                    <Home aria-hidden="true" className="size-4 shrink-0" />
                  )}
                  <span className={cn(showHomeIcon && index === 0 && "sr-only sm:not-sr-only")}>
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "truncate",
                    isLast && "font-medium text-foreground",
                  )}
                >
                  {showHomeIcon && index === 0 && (
                    <Home aria-hidden="true" className="mr-1 inline size-4" />
                  )}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
