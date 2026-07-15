"use client";

import {
  useState,
} from "react";
import {
  ClipboardCheck,
  PackageSearch,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

import {
  PromotionBanner,
  ServiceBenefits,
} from "@/components/common";
import {
  OrderLookupForm,
} from "@/components/order/OrderLookupForm";
import {
  OrderLookupResult,
} from "@/components/order/OrderLookupResult";
import {
  PhoneSection,
} from "@/components/phone";
import {
  Button,
  ContentSection,
  ErrorState,
  SectionHeader,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  lookupOrder,
} from "@/features/order/order.api";
import type {
  OrderResponse,
} from "@/features/order/order.types";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";
import {
  ApiClientError,
} from "@/lib/api-client";

export type OrderLookupPageClientProps = {
  initialOrderCode?: string;
  featuredPhones:
    PhoneCardResponse[];
  bestSellerPhones:
    PhoneCardResponse[];
};

type LookupStatus =
  | "idle"
  | "success"
  | "error";

const ORDER_NOT_FOUND_MESSAGE =
  "Không tìm thấy đơn hàng phù hợp với thông tin đã cung cấp. Vui lòng kiểm tra lại mã đơn và số điện thoại.";

const lookupGuideItems = [
  {
    icon: (
      <ClipboardCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Chuẩn bị mã đơn",
    description:
      "Mã đơn được hiển thị sau khi đặt hàng thành công.",
  },
  {
    icon: (
      <PhoneCall
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Dùng số điện thoại nhận hàng",
    description:
      "Nhập đúng số điện thoại đã gửi trong bước checkout.",
  },
  {
    icon: (
      <PackageSearch
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Xem trạng thái đơn",
    description:
      "Kết quả hiển thị trạng thái đơn và trạng thái thanh toán.",
  },
  {
    icon: (
      <ShieldCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Bảo vệ thông tin",
    description:
      "Hệ thống không tiết lộ mã đơn đúng hay số điện thoại sai.",
  },
];

function takeUniquePhones(
  source: PhoneCardResponse[],
  usedIds: Set<number>,
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];

  for (const phone of source) {
    if (usedIds.has(phone.id)) {
      continue;
    }

    usedIds.add(phone.id);
    result.push(phone);

    if (result.length >= limit) {
      break;
    }
  }

  return result;
}

export function OrderLookupPageClient({
  initialOrderCode,
  featuredPhones,
  bestSellerPhones,
}: OrderLookupPageClientProps) {
  const [status, setStatus] =
    useState<LookupStatus>("idle");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string>();

  const [order, setOrder] =
    useState<OrderResponse | null>(
      null,
    );

  const usedIds =
    new Set<number>();

  const visibleFeatured =
    takeUniquePhones(
      featuredPhones,
      usedIds,
      8,
    );

  const visibleBestSellers =
    takeUniquePhones(
      bestSellerPhones,
      usedIds,
      8,
    );

  async function handleLookup(
    values: {
      orderCode: string;
      phoneNumber: string;
    },
  ): Promise<void> {
    setLoading(true);
    setError(undefined);

    try {
      const result =
        await lookupOrder(
          values.orderCode,
          values.phoneNumber,
        );

      setOrder(result);
      setStatus("success");
    } catch (lookupError) {
      setOrder(null);
      setStatus("error");

      if (
        lookupError
          instanceof ApiClientError
        && (
          lookupError.code
            === "ORDER_NOT_FOUND"
          || lookupError.status === 404
        )
      ) {
        setError(
          ORDER_NOT_FOUND_MESSAGE,
        );
        return;
      }

      setError(
        "Không thể tra cứu đơn hàng lúc này. Vui lòng thử lại sau.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (
    status === "success"
    && order
  ) {
    return (
      <div className="space-y-6 lg:space-y-8">
        <OrderLookupResult
          order={order}
        />

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              setOrder(null);
              setError(undefined);
              setStatus("idle");
            }}
          >
            Tra cứu đơn khác
          </Button>
        </div>

        {visibleFeatured.length
          > 0 && (
          <PhoneSection
            title="Sản phẩm nổi bật"
            subtitle="Một số điện thoại khác tại cửa hàng."
            phones={
              visibleFeatured
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

  return (
    <div className="space-y-6 lg:space-y-8">
      {status === "idle" && (
        <PromotionBanner
          {...BANNERS.lookup}
          priority
          aspectRatio="wide"
        />
      )}

      {status === "error" && error && (
        <ErrorState
          title="Không thể tìm thấy đơn hàng"
          message={error}
          retryLabel="Nhập lại thông tin"
          onRetry={() => {
            setError(undefined);
            setStatus("idle");
          }}
        />
      )}

      <OrderLookupForm
        initialOrderCode={
          initialOrderCode
        }
        loading={loading}
        error={error}
        onSubmit={handleLookup}
      />

      {status === "idle" && (
        <ContentSection>
          <SectionHeader
            title="Hướng dẫn tra cứu"
            subtitle="Hai thông tin phải khớp với dữ liệu đã dùng khi đặt hàng."
          />

          <div className="mt-5">
            <ServiceBenefits
              items={
                lookupGuideItems
              }
              columns={4}
            />
          </div>
        </ContentSection>
      )}

      {visibleFeatured.length > 0 && (
        <PhoneSection
          title="Sản phẩm nổi bật"
          subtitle="Một số sản phẩm bạn có thể tham khảo."
          phones={
            visibleFeatured
          }
          viewAllHref="/phones"
          layout="carousel"
          badge="featured"
          background="surface"
        />
      )}

      {visibleBestSellers.length
        > 0 && (
        <PhoneSection
          title="Điện thoại bán chạy"
          subtitle="Các sản phẩm được nhiều khách hàng quan tâm."
          phones={
            visibleBestSellers
          }
          viewAllHref="/phones?sort=best-seller"
          layout="carousel"
          badge="best-seller"
          background="surface"
        />
      )}
    </div>
  );
}
