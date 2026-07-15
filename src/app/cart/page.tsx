import type {
  Metadata,
} from "next";

import {
  CartPageClient,
} from "@/components/cart";
import {
  Breadcrumb,
  Container,
  SectionHeader,
} from "@/components/ui";
import {
  getBestSellerPhones,
  getFeaturedPhones,
} from "@/features/phone/phone.api";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description:
    "Kiểm tra điện thoại, cấu hình và số lượng trước khi thanh toán.",
};

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
  usedIds: Set<number>,
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];

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

export default async function CartPage() {
  const [
    featuredResult,
    bestSellerResult,
  ] = await Promise.all([
    safeRequest(
      getFeaturedPhones(10),
      [],
    ),
    safeRequest(
      getBestSellerPhones(16),
      [],
    ),
  ]);

  const usedIds =
    new Set<number>();

  const featuredPhones =
    uniquePhones(
      featuredResult,
      usedIds,
      8,
    );

  const bestSellerPhones =
    uniquePhones(
      bestSellerResult,
      usedIds,
      8,
    );

  return (
    <Container className="space-y-6 py-4 sm:py-6 lg:space-y-8">
      <Breadcrumb
        items={[
          {
            label: "Trang chủ",
            href: "/",
          },
          {
            label: "Giỏ hàng",
          },
        ]}
      />

      <SectionHeader
        title="Giỏ hàng của bạn"
        subtitle="Kiểm tra sản phẩm, cấu hình và số lượng trước khi chuyển sang checkout."
      />

      <CartPageClient
        featuredPhones={
          featuredPhones
        }
        bestSellerPhones={
          bestSellerPhones
        }
      />
    </Container>
  );
}
