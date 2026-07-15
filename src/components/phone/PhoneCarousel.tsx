"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  PhoneCard,
  type PhoneCardProps,
} from "@/components/phone/PhoneCard";
import { IconButton, SectionHeader } from "@/components/ui";
import type { PhoneCardResponse } from "@/features/phone/phone.types";
import { cn } from "@/utils/cn";

export type PhoneCarouselProps = {
  phones: PhoneCardResponse[];
  title?: string;
  subtitle?: string;
  badge?: PhoneCardProps["badge"];
  viewAllHref?: string;
  itemClassName?: string;
  className?: string;
};

export function PhoneCarousel({
  phones,
  title,
  subtitle,
  badge = null,
  viewAllHref,
  itemClassName,
  className,
}: PhoneCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  if (phones.length === 0) {
    return null;
  }

  return (
    <div className={cn("min-w-0", className)}>
      {(title || viewAllHref) && (
        <SectionHeader
          title={title ?? "Sản phẩm"}
          subtitle={subtitle}
          actionLabel={viewAllHref ? "Xem tất cả" : undefined}
          actionHref={viewAllHref}
          action={
            <div className="flex items-center gap-2">
              {viewAllHref && (
                <Link
                  href={viewAllHref}
                  className="mr-1 text-sm font-semibold text-primary hover:text-primary-dark hover:underline"
                >
                  Xem tất cả
                </Link>
              )}

              <IconButton
                icon={<ChevronLeft aria-hidden="true" className="size-5" />}
                label="Xem sản phẩm trước"
                size="sm"
                disabled={!canScrollPrev}
                onClick={() => emblaApi?.scrollPrev()}
              />
              <IconButton
                icon={<ChevronRight aria-hidden="true" className="size-5" />}
                label="Xem sản phẩm tiếp theo"
                size="sm"
                disabled={!canScrollNext}
                onClick={() => emblaApi?.scrollNext()}
              />
            </div>
          }
        />
      )}

      <div className={cn((title || viewAllHref) && "mt-5")}>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-3 flex touch-pan-y sm:-ml-4">
            {phones.map((phone, index) => (
              <div
                key={phone.id}
                className={cn(
                  "min-w-0 flex-[0_0_78%] pl-3 sm:flex-[0_0_45%] sm:pl-4 md:flex-[0_0_32%] lg:flex-[0_0_25%] xl:flex-[0_0_20%]",
                  itemClassName,
                )}
              >
                <PhoneCard
                  phone={phone}
                  badge={badge}
                  priorityImage={index < 4}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {!title && !viewAllHref && phones.length > 1 && (
          <div className="mt-4 flex justify-end gap-2">
            <IconButton
              icon={<ChevronLeft aria-hidden="true" className="size-5" />}
              label="Xem sản phẩm trước"
              size="sm"
              disabled={!canScrollPrev}
              onClick={() => emblaApi?.scrollPrev()}
            />
            <IconButton
              icon={<ChevronRight aria-hidden="true" className="size-5" />}
              label="Xem sản phẩm tiếp theo"
              size="sm"
              disabled={!canScrollNext}
              onClick={() => emblaApi?.scrollNext()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
