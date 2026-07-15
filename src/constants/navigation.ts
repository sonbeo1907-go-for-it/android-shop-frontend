import type { FooterColumn } from "@/components/layout/Footer";
import type { NavigationItem } from "@/components/layout/NavigationMenu";

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Sản phẩm",
    href: "/phones",
  },
  {
    label: "Tra cứu đơn",
    href: "/order-lookup",
  },
  {
    label: "Apple",
    href: "/phones?brand=Apple",
  },
  {
    label: "Samsung",
    href: "/phones?brand=Samsung",
  },
  {
    label: "Xiaomi",
    href: "/phones?brand=Xiaomi",
  },
  {
    label: "Google",
    href: "/phones?brand=Google",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Hỗ trợ",
    links: [
      {
        label: "Tra cứu đơn hàng",
        href: "/order-lookup",
      },
      {
        label: "Giỏ hàng",
        href: "/cart",
      },
      {
        label: "Thanh toán",
        href: "/checkout",
      },
    ],
  },
  {
    title: "Sản phẩm",
    links: [
      {
        label: "Tất cả điện thoại",
        href: "/phones",
      },
      {
        label: "Apple",
        href: "/phones?brand=Apple",
      },
      {
        label: "Samsung",
        href: "/phones?brand=Samsung",
      },
      {
        label: "Xiaomi",
        href: "/phones?brand=Xiaomi",
      },
    ],
  },
  {
    title: "Thông tin",
    links: [
      {
        label: "Sản phẩm nổi bật",
        href: "/phones?sortBy=soldCount&sortDirection=desc",
      },
      {
        label: "Sản phẩm mới",
        href: "/phones?sortBy=createdAt&sortDirection=desc",
      },
      {
        label: "Chính sách demo",
        href: "/",
      },
    ],
  },
];
