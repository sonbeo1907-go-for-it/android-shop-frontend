import type { BrandSectionItem } from "@/components/common/BrandSection";

export const FEATURED_BRANDS: BrandSectionItem[] = [
  "Apple",
  "Samsung",
  "Google",
  "Xiaomi",
  "OnePlus",
  "Oppo",
  "Vivo",
  "Sony",
  "Asus",
].map((name) => ({
  name,
  href: `/phones?brand=${encodeURIComponent(name)}`,
}));
