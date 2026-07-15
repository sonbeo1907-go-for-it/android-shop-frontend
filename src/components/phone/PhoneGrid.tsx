import type { ReactNode } from "react";
import { PackageSearch } from "lucide-react";

import {
  PhoneCard,
  type PhoneCardProps,
} from "@/components/phone/PhoneCard";
import { EmptyState } from "@/components/ui";
import type { PhoneCardResponse } from "@/features/phone/phone.types";
import { cn } from "@/utils/cn";

export type PhoneGridColumns = {
  mobile?: 1 | 2;
  tablet?: 2 | 3;
  desktop?: 3 | 4 | 5;
};

export type PhoneGridProps = {
  phones: PhoneCardResponse[];
  columns?: PhoneGridColumns;
  badgeResolver?: (
    phone: PhoneCardResponse,
  ) => PhoneCardProps["badge"];
  emptyState?: ReactNode;
  className?: string;
};

const mobileColumnClasses: Record<1 | 2, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const tabletColumnClasses: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

const desktopColumnClasses: Record<3 | 4 | 5, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

export function PhoneGrid({
  phones,
  columns = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  },
  badgeResolver,
  emptyState,
  className,
}: PhoneGridProps) {
  if (phones.length === 0) {
    return (
      <>
        {emptyState ?? (
          <EmptyState
            title="Không có sản phẩm"
            description="Không tìm thấy điện thoại phù hợp với điều kiện hiện tại."
            icon={<PackageSearch aria-hidden="true" className="size-8" />}
          />
        )}
      </>
    );
  }

  const mobile = columns.mobile ?? 2;
  const tablet = columns.tablet ?? 3;
  const desktop = columns.desktop ?? 4;

  return (
    <div
      className={cn(
        "grid items-stretch gap-3 sm:gap-4 lg:gap-5",
        mobileColumnClasses[mobile],
        tabletColumnClasses[tablet],
        desktopColumnClasses[desktop],
        className,
      )}
    >
      {phones.map((phone, index) => (
        <PhoneCard
          key={phone.id}
          phone={phone}
          badge={badgeResolver?.(phone) ?? null}
          priorityImage={index < desktop}
        />
      ))}
    </div>
  );
}
