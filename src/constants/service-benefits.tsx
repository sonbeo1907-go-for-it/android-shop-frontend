import {
  CreditCard,
  PackageSearch,
  ShieldCheck,
  Truck,
} from "lucide-react";

import type {
  ServiceBenefitItemProps,
} from "@/components/common/ServiceBenefitItem";

export const STORE_SERVICE_BENEFITS:
  ServiceBenefitItemProps[] = [
  {
    icon: (
      <ShieldCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Giá được xác nhận",
    description:
      "Giá và tình trạng sản phẩm được kiểm tra khi đặt hàng.",
  },
  {
    icon: (
      <Truck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Mua hàng thuận tiện",
    description:
      "Đặt hàng nhanh chóng mà không cần đăng nhập.",
  },
  {
    icon: (
      <CreditCard
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Thanh toán linh hoạt",
    description:
      "Lựa chọn thanh toán khi nhận hàng hoặc chuyển khoản QR.",
  },
  {
    icon: (
      <PackageSearch
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Tra cứu dễ dàng",
    description:
      "Theo dõi đơn hàng bằng mã đơn và số điện thoại.",
  },
];


export const CHECKOUT_SERVICE_BENEFITS:
  ServiceBenefitItemProps[] = [
  {
    icon: (
      <ShieldCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Tổng tiền rõ ràng",
    description:
      "Giá sản phẩm và phí giao hàng được xác nhận khi tạo đơn.",
  },
  {
    icon: (
      <Truck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Thông tin giao hàng",
    description:
      "Kiểm tra kỹ tên, số điện thoại và địa chỉ nhận hàng.",
  },
  {
    icon: (
      <CreditCard
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Thanh toán linh hoạt",
    description:
      "Chọn thanh toán khi nhận hàng hoặc chuyển khoản QR.",
  },
  {
    icon: (
      <PackageSearch
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Theo dõi đơn hàng",
    description:
      "Lưu mã đơn để tra cứu trạng thái sau khi đặt hàng.",
  },
];