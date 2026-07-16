"use client";

import {
  useState,
} from "react";
import {
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  Header,
} from "@/components/layout/Header";
import {
  MobileMenu,
} from "@/components/layout/MobileMenu";
import {
  NavigationMenu,
} from "@/components/layout/NavigationMenu";
import {
  TopUtilityBar,
} from "@/components/layout/TopUtilityBar";
import {
  MAIN_NAVIGATION,
} from "@/constants/navigation";
import {
  selectCartDistinctPhoneCount,
  useCartStore,
} from "@/features/cart/cart.store";

export type SiteHeaderProps = {
  cartCount?: number;
  logoSrc?: string;
  logoAlt?: string;
};

const utilityItems = [
  {
    icon: (
      <ShieldCheck
        aria-hidden="true"
        className="size-4"
      />
    ),
    label:
      "Thông tin sản phẩm rõ ràng",
  },
  {
    icon: (
      <Truck
        aria-hidden="true"
        className="size-4"
      />
    ),
    label:
      "Giao hàng thuận tiện",
  },
  {
    icon: (
      <RotateCcw
        aria-hidden="true"
        className="size-4"
      />
    ),
    label:
      "Đổi trả dễ dàng",
  },
];

export function SiteHeader({
  cartCount = 0,
  logoSrc =
    "/logos/phone-store.svg",
  logoAlt = "Phone Store",
}: SiteHeaderProps) {
  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const hydrated = useCartStore(
    (state) => state.hydrated,
  );
  
  const persistedCartCount =
    useCartStore(
      selectCartDistinctPhoneCount,
    );

  /*
   * Trước hydration dùng giá trị
   * server truyền vào để tránh
   * mismatch. Sau hydration,
   * persisted store là nguồn thật.
   */
  const effectiveCartCount =
    hydrated
      ? persistedCartCount
      : cartCount;

  return (
    <>
      <TopUtilityBar
        items={utilityItems}
      />

      <Header
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        cartCount={
          effectiveCartCount
        }
        onOpenMobileMenu={() => {
          setMobileMenuOpen(true);
        }}
      />

      <NavigationMenu
        items={MAIN_NAVIGATION}
      />

      <MobileMenu
        open={mobileMenuOpen}
        items={MAIN_NAVIGATION}
        cartCount={
          effectiveCartCount
        }
        onClose={() => {
          setMobileMenuOpen(false);
        }}
      />
    </>
  );
}
