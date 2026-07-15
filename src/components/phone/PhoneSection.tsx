import { PhoneCarousel } from "@/components/phone/PhoneCarousel";
import { PhoneGrid } from "@/components/phone/PhoneGrid";
import type { PhoneCardProps } from "@/components/phone/PhoneCard";
import { SectionHeader } from "@/components/ui";
import type { PhoneCardResponse } from "@/features/phone/phone.types";
import { cn } from "@/utils/cn";

export type PhoneSectionProps = {
  title: string;
  subtitle?: string;
  phones: PhoneCardResponse[];
  viewAllHref?: string;
  layout?: "grid" | "carousel";
  badge?: PhoneCardProps["badge"];
  background?: "default" | "surface" | "primary";
  currentPhoneId?: number;
  className?: string;
};

const backgroundClasses = {
  default: "bg-transparent",
  surface:
    "border border-border bg-surface shadow-card",
  primary:
    "bg-primary shadow-card",
} as const;

export function PhoneSection({
  title,
  subtitle,
  phones,
  viewAllHref,
  layout = "carousel",
  badge = null,
  background = "surface",
  currentPhoneId,
  className,
}: PhoneSectionProps) {
  const filteredPhones =
    currentPhoneId === undefined
      ? phones
      : phones.filter(
          (phone) =>
            phone.id !== currentPhoneId,
        );

  if (filteredPhones.length === 0) {
    return null;
  }

  const primaryBackground =
    background === "primary";

  return (
    <section
      className={cn(
        "rounded-section p-4 sm:p-6",
        backgroundClasses[background],
        className,
      )}
    >
      <SectionHeader
        title={title}
        subtitle={subtitle}
        actionLabel={
          viewAllHref
            ? "Xem tất cả"
            : undefined
        }
        actionHref={viewAllHref}
        className={
          primaryBackground
            ? [
                "[&_h2]:!text-white",
                "[&_p]:!text-white/85",
                "[&_a]:!text-white",
                "[&_a:hover]:!text-white",
              ].join(" ")
            : undefined
        }
      />

      {/* Đảm bảo khu vực card trở lại màu chữ thông thường */}
      <div className="mt-5 text-foreground">
        {layout === "grid" ? (
          <PhoneGrid
            phones={filteredPhones}
            badgeResolver={() => badge}
          />
        ) : (
          <PhoneCarousel
            phones={filteredPhones}
            badge={badge}
          />
        )}
      </div>
    </section>
  );
}