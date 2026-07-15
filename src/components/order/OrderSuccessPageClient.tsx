"use client";

import {
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import {
  ClipboardCheck,
  Clock3,
  MailCheck,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";
import {
  toast,
} from "sonner";
import {
  PromotionBanner,
  ServiceBenefits,
} from "@/components/common";
import {
  buildVietQrUrl,
} from "@/features/payment/vietqr";
import {
  OrderDetail,
} from "@/components/order/OrderDetail";
import {
  OrderRecoveryCard,
} from "@/components/order/OrderRecoveryCard";
import {
  OrderSuccessCard,
} from "@/components/order/OrderSuccessCard";
import {
  QrPaymentCard,
} from "@/components/order/QrPaymentCard";
import {
  PhoneSection,
} from "@/components/phone";
import {
  ContentSection,
  SectionHeader,
  Skeleton,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  readTemporaryOrder,
} from "@/features/checkout/order-session";
import type {
  OrderResponse,
} from "@/features/order/order.types";
import {
  getOrderCode,
  normalizeOrder,
} from "@/features/order/order-view";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";

export type OrderSuccessPageClientProps = {
  orderCode: string;
  featuredPhones:
    PhoneCardResponse[];
};

const guideItems = [
  {
    icon: (
      <ClipboardCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Lưu mã đơn hàng",
    description:
      "Mã đơn dùng để tra cứu cùng số điện thoại nhận hàng.",
  },
  {
    icon: (
      <Clock3
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Chờ cửa hàng xử lý",
    description:
      "Đơn mới được tạo có thể ở trạng thái PENDING.",
  },
  {
    icon: (
      <PackageSearch
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Tra cứu khi cần",
    description:
      "Mở trang tra cứu để xem lại trạng thái đơn.",
  },
  {
    icon: (
      <ShieldCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Không chia sẻ mã đơn",
    description:
      "Chỉ cung cấp mã đơn cho người nhận và cửa hàng.",
  },
];

function SuccessLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-72 w-full rounded-section" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[36rem] w-full rounded-section" />
        <Skeleton className="h-[36rem] w-full rounded-section" />
      </div>
    </div>
  );
}

export function OrderSuccessPageClient({
  orderCode,
  featuredPhones,
}: OrderSuccessPageClientProps) {
  const [
    order,
    setOrder,
  ] = useState<
    OrderResponse | null | undefined
  >(undefined);

  useEffect(() => {
    const temporaryOrder =
      readTemporaryOrder();

    if (
      temporaryOrder
      && getOrderCode(
        temporaryOrder,
      ) === orderCode
    ) {
      setOrder(
        temporaryOrder,
      );
    } else {
      setOrder(null);
    }
  }, [orderCode]);

  if (order === undefined) {
    return <SuccessLoading />;
  }

  if (order === null) {
    return (
      <div className="space-y-6 lg:space-y-8">
        <OrderRecoveryCard
          orderCode={orderCode}
        />

        {featuredPhones.length > 0 && (
          <PhoneSection
            title="Sản phẩm nổi bật"
            subtitle="Một số điện thoại bạn có thể tham khảo thêm."
            phones={
              featuredPhones
            }
            viewAllHref="/phones"
            layout="carousel"
            badge="featured"
            background="surface"
          />
        )}

        <PromotionBanner
          {...BANNERS.lookup}
          aspectRatio="wide"
        />
      </div>
    );
  }

  const normalized =
    normalizeOrder(order);

  const isQr =
    normalized.paymentMethod
    === "QR_TRANSFER";

  const bankId =
    process.env
      .NEXT_PUBLIC_BANK_ID
    || "VCB";

  const bankName =
    process.env
      .NEXT_PUBLIC_BANK_NAME
    || "Vietcombank";

  const accountNumber =
    process.env
      .NEXT_PUBLIC_BANK_ACCOUNT
    || "1043325793";

  const accountName =
    process.env
      .NEXT_PUBLIC_BANK_ACCOUNT_NAME
    || "NGUYEN MINH SON";

  const qrImageSrc =
    buildVietQrUrl({
      bankId,
      accountNumber,
      accountName,
      amount:
        normalized.totalAmount,
      transferContent:
        normalized.orderCode,
    });

  async function copyOrderCode() {
    try {
      await navigator.clipboard.writeText(
        normalized.orderCode,
      );

      toast.success(
        "Đã sao chép mã đơn hàng.",
      );
    } catch {
      toast.error(
        "Không thể sao chép mã đơn.",
      );
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <OrderSuccessCard
        orderCode={
          normalized.orderCode
        }
        paymentMethod={
          normalized.paymentMethod
        }
        totalAmount={
          normalized.totalAmount
        }
        onCopyOrderCode={() => {
          void copyOrderCode();
        }}
      />
      {normalized.email && (
          <div className="flex items-start gap-3 rounded-card border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            <MailCheck
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-blue-600"
            />

            <div>
              <p className="font-semibold">
                Thông tin xác nhận đang được gửi qua email
              </p>

              <p className="mt-1">
                Mã đơn và thông tin đặt hàng sẽ được gửi tới{" "}
                <strong className="break-all">
                  {normalized.email}
                </strong>
                . Vui lòng kiểm tra cả thư mục thư rác.
              </p>
            </div>
          </div>
        )}

      <div
        className={
          isQr
            ? "grid items-start gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,.92fr)]"
            : ""
        }
      >
        <OrderDetail
          order={order}
        />

        {isQr && (
          <div className="lg:sticky lg:top-32">
            <QrPaymentCard
              bankName={bankName}
              accountNumber={
                accountNumber
              }
              accountName={
                accountName
              }
              amount={
                normalized.totalAmount
              }
              transferContent={
                normalized.orderCode
              }
              qrImageSrc={
                qrImageSrc
              }
            />
          </div>
        )}
      </div>

      <ContentSection>
        <SectionHeader
          title="Các bước tiếp theo"
          subtitle={
            isQr
              ? "Hoàn tất chuyển khoản QR và lưu mã đơn để tra cứu."
              : "Lưu mã đơn và chuẩn bị thanh toán khi nhận hàng."
          }
        />

        <div className="mt-5">
          <ServiceBenefits
            items={guideItems}
            columns={4}
          />
        </div>
      </ContentSection>

      {featuredPhones.length > 0 && (
        <PhoneSection
          title="Sản phẩm nổi bật"
          subtitle="Một số lựa chọn khác tại cửa hàng."
          phones={
            featuredPhones
          }
          viewAllHref="/phones"
          layout="carousel"
          badge="featured"
          background="surface"
        />
      )}

      <PromotionBanner
        {...BANNERS.lookup}
        aspectRatio="wide"
      />
    </div>
  );
}
