import {
  MapPinOff,
} from "lucide-react";

import {
  PromotionBanner,
} from "@/components/common";
import {
  PhoneSection,
} from "@/components/phone";
import {
  Container,
  EmptyState,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  getFeaturedPhones,
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

export default async function GlobalNotFound() {
  const featuredResult =
    await safeRequest(
      getFeaturedPhones(8),
      [],
    );

  const featuredPhones =
    uniquePhones(
      featuredResult,
      8,
    );

  return (
    <Container className="space-y-6 py-8">
      <EmptyState
        icon={
          <MapPinOff
            aria-hidden="true"
            className="size-11"
          />
        }
        title="Không tìm thấy trang"
        description="Đường dẫn có thể không tồn tại, đã được thay đổi hoặc không còn khả dụng."
        actionLabel="Về trang chủ"
        actionHref="/"
      />

      {featuredPhones.length > 0 && (
        <PhoneSection
          title="Sản phẩm nổi bật"
          subtitle="Tiếp tục khám phá một số điện thoại tại cửa hàng."
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
        {...BANNERS.promotion}
        aspectRatio="wide"
      />
    </Container>
  );
}
