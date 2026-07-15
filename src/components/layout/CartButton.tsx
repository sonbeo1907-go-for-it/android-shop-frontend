import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/utils/cn";

export type CartButtonProps = {
  count: number;
  href?: string;
  label?: string;
  className?: string;
};

export function CartButton({
  count,
  href = "/cart",
  label = "Giỏ hàng",
  className,
}: CartButtonProps) {
  const safeCount = Number.isFinite(count)
    ? Math.max(0, Math.floor(count))
    : 0;

  const displayCount = safeCount > 99
    ? "99+"
    : String(safeCount);

  return (
    <Link
      href={href}
      aria-label={`${label}, ${safeCount} sản phẩm`}
      className={cn(
        "relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-button px-2.5 text-white transition hover:bg-white/10",
        className,
      )}
    >
      <span className="relative">
        <ShoppingCart aria-hidden="true" className="size-6" />

        {safeCount > 0 && (
          <span className="absolute -right-2.5 -top-2.5 flex min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold leading-5 text-primary shadow">
            {displayCount}
          </span>
        )}
      </span>

      <span className="hidden text-xs font-semibold sm:inline">
        {label}
      </span>
    </Link>
  );
}
