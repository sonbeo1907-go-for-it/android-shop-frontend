import {
  PackageX,
} from "lucide-react";

import {
  PromotionBanner,
} from "@/components/common";
import {
  PhoneSection,
} from "@/components/phone";
import {
  Breadcrumb,
  Container,
  EmptyState,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  getBestSellerPhones,
} from "@/features/phone/phone.api";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";

async function safeRequest<T>(
  request: Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await request;
  } catch {
    return fallback;
  }
}

function uniquePhones(
  phones: PhoneCardResponse[],
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];
  const usedIds =
    new Set<number>();

  for (const phone of phones) {
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

export default async function PhoneNotFound() {
  const bestSellerResult =
    await safeRequest(
      getBestSellerPhones(10),
      [],
    );

  const bestSellerPhones =
    uniquePhones(
      bestSellerResult,
      8,
    );

  return (
    <Container className="space-y-6 py-6">
      <Breadcrumb
        items={[
          {
            label: "Trang chủ",
            href: "/",
          },
          {
            label: "Điện thoại",
            href: "/phones",
          },
          {
            label: "Không tìm thấy",
          },
        ]}
      />

      <EmptyState
        icon={
          <PackageX
            aria-hidden="true"
            className="size-12"
          />
        }
        title="Không tìm thấy sản phẩm"
        description="Điện thoại có thể không tồn tại, đã ngừng hiển thị hoặc đường dẫn không chính xác."
        actionLabel="Xem tất cả điện thoại"
        actionHref="/phones"
      />

      {bestSellerPhones.length > 0 && (
        <PhoneSection
          title="Điện thoại bán chạy"
          subtitle="Một số lựa chọn khác được nhiều khách hàng quan tâm."
          phones={
            bestSellerPhones
          }
          viewAllHref="/phones?sort=best-seller"
          layout="carousel"
          badge="best-seller"
          background="surface"
        />
      )}

      <PromotionBanner
        {...BANNERS.shipping}
        aspectRatio="wide"
      />
    </Container>
  );
}
