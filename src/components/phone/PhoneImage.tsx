"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

export type PhoneImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

export function PhoneImage({
  src,
  alt,
  fallbackSrc = "/images/phone-placeholder.svg",
  onError,
  ...props
}: PhoneImageProps) {
  const normalizedSrc = src?.trim() || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);

  useEffect(() => {
    setCurrentSrc(normalizedSrc);
  }, [normalizedSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
