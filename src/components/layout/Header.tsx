"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";

import { CartButton } from "@/components/layout/CartButton";
import { SearchBar } from "@/components/layout/SearchBar";
import { Container, IconButton } from "@/components/ui";
import { cn } from "@/utils/cn";

export type HeaderProps = {
  logoSrc: string;
  logoAlt: string;
  cartCount: number;
  onOpenMobileMenu: () => void;
  homeHref?: string;
  lookupHref?: string;
  cartHref?: string;
  searchDefaultValue?: string;
  className?: string;
};

export function Header({
  logoSrc,
  logoAlt,
  cartCount,
  onOpenMobileMenu,
  homeHref = "/",
  lookupHref = "/order-lookup",
  cartHref = "/cart",
  searchDefaultValue,
  className,
}: HeaderProps) {
  const router = useRouter();

  function handleSearch(keyword: string) {
    const searchParams = new URLSearchParams({
      keyword,
    });

    router.push(`/phones?${searchParams.toString()}`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-primary text-white shadow-header",
        className,
      )}
    >
      <Container>
        <div className="flex min-h-16 items-center gap-2.5 py-2 sm:gap-4">
          <IconButton
            icon={<Menu aria-hidden="true" className="size-6" />}
            label="Mở menu"
            variant="ghost"
            className="text-white hover:bg-white/10 lg:hidden"
            onClick={onOpenMobileMenu}
          />

          <Link
            href={homeHref}
            className="relative block h-10 w-28 shrink-0 sm:h-11 sm:w-36"
            aria-label={logoAlt}
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              priority
              sizes="(max-width: 640px) 112px, 144px"
              className="object-contain object-left"
            />
          </Link>

          <div className="hidden min-w-0 flex-1 md:block">
            <SearchBar
              defaultValue={searchDefaultValue}
              onSearch={handleSearch}
            />
          </div>

          <Link
            href={lookupHref}
            className="ml-auto hidden min-h-10 shrink-0 items-center gap-2 rounded-button px-2.5 text-xs font-semibold text-white transition hover:bg-white/10 sm:inline-flex"
          >
            <PackageSearch aria-hidden="true" className="size-6" />

            <span className="hidden xl:inline">
              Tra cứu đơn
            </span>
          </Link>

          <CartButton
            count={cartCount}
            href={cartHref}
          />
        </div>

        <div className="pb-2 md:hidden">
          <SearchBar
            defaultValue={searchDefaultValue}
            compact
            onSearch={handleSearch}
          />
        </div>
      </Container>
    </header>
  );
}
