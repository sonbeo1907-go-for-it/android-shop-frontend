export type BannerVariant =
  | "promotion"
  | "shipping"
  | "checkout"
  | "lookup";

export type BannerConfig = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  href?: string;
  title: string;
  description: string;
};

export const BANNERS: Record<BannerVariant, BannerConfig> = {
  promotion: {
    desktopSrc: "/banners/promotion-wide.svg",
    mobileSrc: "/banners/promotion-mobile.svg",
    alt: "Khám phá smartphone nổi bật",
    href: "/phones",
    title: "Smartphone nổi bật, cấu hình linh hoạt",
    description:
      "Chọn màu sắc, RAM và bộ nhớ phù hợp rồi đặt hàng trực tuyến.",
  },
  shipping: {
    desktopSrc: "/banners/shipping-wide.svg",
    mobileSrc: "/banners/shipping-mobile.svg",
    alt: "Giao hàng và bảo hành",
    href: "/phones",
    title: "Giao hàng thuận tiện",
    description:
      "Đặt hàng nhanh, kiểm tra tồn kho và tra cứu bằng mã đơn.",
  },
  checkout: {
    desktopSrc: "/banners/checkout-wide.svg",
    mobileSrc: "/banners/checkout-mobile.svg",
    alt: "Thanh toán COD hoặc QR",
    href: "/checkout",
    title: "Thanh toán linh hoạt",
    description:
      "Hỗ trợ COD và QR chuyển khoản trong phạm vi demo.",
  },
  lookup: {
    desktopSrc: "/banners/lookup-wide.svg",
    mobileSrc: "/banners/lookup-mobile.svg",
    alt: "Tra cứu đơn hàng",
    href: "/order-lookup",
    title: "Tra cứu đơn nhanh chóng",
    description:
      "Sử dụng mã đơn hàng và số điện thoại để xem thông tin.",
  },
};
