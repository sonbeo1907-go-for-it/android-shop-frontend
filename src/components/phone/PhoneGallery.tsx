"use client";

import { useEffect, useMemo, useState } from "react";

import { PhoneImage } from "@/components/phone/PhoneImage";
import { cn } from "@/utils/cn";

export type PhoneGalleryProps = {
  images: string[];
  thumbnailUrl: string;
  alt: string;
  colorImage?: string | null;
  className?: string;
};

function normalizeImages(
  images: string[],
  thumbnailUrl: string,
  colorImage?: string | null,
): string[] {
  return Array.from(
    new Set(
      [colorImage, thumbnailUrl, ...images]
        .map((image) => image?.trim())
        .filter((image): image is string => Boolean(image)),
    ),
  );
}

export function PhoneGallery({
  images,
  thumbnailUrl,
  alt,
  colorImage,
  className,
}: PhoneGalleryProps) {
  const normalizedImages = useMemo(
    () => normalizeImages(images, thumbnailUrl, colorImage),
    [images, thumbnailUrl, colorImage],
  );

  const firstImage =
    normalizedImages[0] ?? "/images/phone-placeholder.svg";

  const [selectedImage, setSelectedImage] = useState(firstImage);

  useEffect(() => {
    setSelectedImage(firstImage);
  }, [firstImage]);

  return (
    <section className={cn("min-w-0", className)}>
      <div className="relative aspect-square overflow-hidden rounded-section border border-border bg-white shadow-card">
        <PhoneImage
          src={selectedImage}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 sm:p-10"
        />
      </div>

      {normalizedImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {normalizedImages.map((image, index) => {
            const selected = image === selectedImage;

            return (
              <button
                key={image}
                type="button"
                aria-label={`Xem ảnh ${index + 1} của ${alt}`}
                aria-pressed={selected}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden rounded-button border bg-white transition sm:size-20",
                  selected
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/60",
                )}
                onClick={() => setSelectedImage(image)}
              >
                <PhoneImage
                  src={image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
