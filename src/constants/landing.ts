import type { BannerData } from "@/components/home";

export const LANDING_HERO_MAIN: BannerData = {
  desktopSrc: "/banners/hero-main-wide.svg",
  mobileSrc: "/banners/hero-main-mobile.svg",
  alt: "Khám phá smartphone nổi bật",
  href: "/phones",
  title: "Chọn smartphone phù hợp với bạn",
  description:
    "Khám phá điện thoại nổi bật, chọn màu sắc, RAM và bộ nhớ trước khi thêm vào giỏ hàng.",
  priority: true,
};

export const LANDING_HERO_SIDES: BannerData[] = [
  {
    desktopSrc: "/banners/hero-camera.svg",
    alt: "Điện thoại chụp ảnh đẹp",
    href: "/phones?sortBy=soldCount&sortDirection=desc",
    title: "Camera nổi bật",
    description: "Khám phá các mẫu máy được quan tâm.",
  },
  {
    desktopSrc: "/banners/hero-performance.svg",
    alt: "Điện thoại hiệu năng mạnh",
    href: "/phones?sortBy=createdAt&sortDirection=desc",
    title: "Hiệu năng mạnh",
    description: "Lựa chọn mới cho học tập và giải trí.",
  },
];
