"use client";

import Link from "next/link";
import {
  Home,
  PackageSearch,
  ShoppingCart,
  Smartphone,
} from "lucide-react";

import { Drawer } from "@/components/ui";
import type { NavigationItem } from "@/components/layout/NavigationMenu";
import { cn } from "@/utils/cn";

export type MobileMenuProps = {
  open: boolean;
  items: NavigationItem[];
  cartCount?: number;
  onClose: () => void;
};

const itemIcons = [Home, Smartphone, PackageSearch];

export function MobileMenu({
  open,
  items,
  cartCount = 0,
  onClose,
}: MobileMenuProps) {
  return (
    <Drawer
      open={open}
      title="Danh mục"
      side="left"
      onClose={onClose}
    >
      <nav aria-label="Điều hướng mobile">
        <ul className="space-y-1">
          {items.map((item, index) => {
            const Icon = itemIcons[index] ?? Smartphone;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center gap-3 rounded-button px-3 text-sm font-semibold text-foreground transition hover:bg-primary-soft hover:text-primary"
                  onClick={onClose}
                >
                  <Icon aria-hidden="true" className="size-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              href="/cart"
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-button px-3 text-sm font-semibold text-foreground transition",
                "hover:bg-primary-soft hover:text-primary",
              )}
              onClick={onClose}
            >
              <ShoppingCart aria-hidden="true" className="size-5" />
              <span>Giỏ hàng</span>

              {cartCount > 0 && (
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </Drawer>
  );
}
