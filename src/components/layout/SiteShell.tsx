import type {
  ReactNode,
} from "react";

import {
  SiteFooter,
} from "@/components/layout/SiteFooter";
import {
  SiteHeader,
} from "@/components/layout/SiteHeader";

export type SiteShellProps = {
  children: ReactNode;
  cartCount?: number;
};

export function SiteShell({
  children,
  cartCount,
}: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        cartCount={
          cartCount
        }
      />

      <main className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
