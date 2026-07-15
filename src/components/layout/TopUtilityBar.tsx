import type { ReactNode } from "react";

import { Container } from "@/components/ui";
import { cn } from "@/utils/cn";

export type UtilityItem = {
  icon?: ReactNode;
  label: string;
};

export type TopUtilityBarProps = {
  items: UtilityItem[];
  className?: string;
};

export function TopUtilityBar({
  items,
  className,
}: TopUtilityBarProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "border-b border-white/10 bg-primary-dark text-white",
        className,
      )}
    >
      <Container>
        <ul
          aria-label="Tiện ích cửa hàng"
          className="flex min-h-9 items-center gap-5 overflow-x-auto text-xs font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center sm:gap-10"
        >
          {items.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-white/90"
            >
              {item.icon && (
                <span
                  aria-hidden="true"
                  className="flex size-4 items-center justify-center"
                >
                  {item.icon}
                </span>
              )}

              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
