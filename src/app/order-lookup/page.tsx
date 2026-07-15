import type {
  Metadata,
} from "next";

import {
  OrderLookupPageClient,
} from "@/components/order";
import {
  Breadcrumb,
  Container,
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
  title: "Tra cứu đơn hàng",
  description:
    "Tra cứu đơn bằng mã đơn hàng và số điện thoại nhận hàng.",
};

type OrderLookupSearchParams = {
  orderCode?: string;
  phoneNumber?: string;
};

type OrderLookupPageProps = {
  searchParams:
    | Promise<
        OrderLookupSearchParams
      >
    | OrderLookupSearchParams;
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

export default async function OrderLookupPage({
  searchParams,
}: OrderLookupPageProps) {
  const resolvedSearchParams =
    await Promise.resolve(
      searchParams,
    );

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
            label: "Tra cứu đơn hàng",
          },
        ]}
      />

      <OrderLookupPageClient
        initialOrderCode={
          resolvedSearchParams
            .orderCode
            ?.trim()
        }
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
