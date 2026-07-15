"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type PaginationItem = number | "ellipsis";

export type PaginationProps = {
  page: number;
  totalPages: number;
  siblingCount?: number;
  disabled?: boolean;
  className?: string;
  onPageChange: (page: number) => void;
};

function createPaginationItems(
  page: number,
  totalPages: number,
  siblingCount: number,
): PaginationItem[] {
  if (totalPages <= 1) {
    return [0];
  }

  const pages = new Set<number>();
  pages.add(0);
  pages.add(totalPages - 1);

  const start = Math.max(0, page - siblingCount);
  const end = Math.min(totalPages - 1, page + siblingCount);

  for (let current = start; current <= end; current += 1) {
    pages.add(current);
  }

  const sortedPages = [...pages].sort((first, second) => first - second);
  const items: PaginationItem[] = [];

  sortedPages.forEach((current, index) => {
    const previous = sortedPages[index - 1];

    if (index > 0 && current - previous > 1) {
      items.push("ellipsis");
    }

    items.push(current);
  });

  return items;
}

export function Pagination({
  page,
  totalPages,
  siblingCount = 1,
  disabled = false,
  className,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const safePage = Math.min(Math.max(page, 0), totalPages - 1);
  const items = createPaginationItems(safePage, totalPages, siblingCount);

  function changePage(nextPage: number) {
    if (disabled || nextPage < 0 || nextPage >= totalPages || nextPage === safePage) {
      return;
    }

    onPageChange(nextPage);
  }

  let ellipsisIndex = 0;

  return (
    <nav aria-label="Phân trang" className={cn("flex justify-center", className)}>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || safePage === 0}
          aria-label="Trang trước"
          onClick={() => changePage(safePage - 1)}
          className="px-2.5"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Trước</span>
        </Button>

        {items.map((item) => {
          if (item === "ellipsis") {
            ellipsisIndex += 1;
            return (
              <span
                key={`ellipsis-${ellipsisIndex}`}
                aria-hidden="true"
                className="flex size-9 items-center justify-center text-muted"
              >
                …
              </span>
            );
          }

          const isCurrent = item === safePage;

          return (
            <button
              key={item}
              type="button"
              disabled={disabled}
              aria-label={`Trang ${item + 1}`}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => changePage(item)}
              className={cn(
                "flex size-9 items-center justify-center rounded-button border text-sm font-semibold transition",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
                isCurrent
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-foreground hover:border-primary hover:text-primary",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {item + 1}
            </button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          disabled={disabled || safePage === totalPages - 1}
          aria-label="Trang sau"
          onClick={() => changePage(safePage + 1)}
          className="px-2.5"
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </nav>
  );
}
