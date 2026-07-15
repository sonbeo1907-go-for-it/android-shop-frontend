import Link from "next/link";

import { Container } from "@/components/ui";
import { cn } from "@/utils/cn";

export type NavigationItem = {
  label: string;
  href: string;
};

export type NavigationMenuProps = {
  items: NavigationItem[];
  activeHref?: string;
  className?: string;
};

export function NavigationMenu({
  items,
  activeHref,
  className,
}: NavigationMenuProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Điều hướng chính"
      className={cn(
        "hidden border-b border-border bg-surface shadow-sm lg:block",
        className,
      )}
    >
      <Container>
        <ul className="flex min-h-11 items-center gap-1 overflow-x-auto">
          {items.map((item) => {
            const active = activeHref === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-9 items-center rounded-button px-3 text-sm font-semibold transition",
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-foreground hover:bg-slate-100 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
