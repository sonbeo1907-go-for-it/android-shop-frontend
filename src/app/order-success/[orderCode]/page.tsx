import type {
  Metadata,
} from "next";

import {
  OrderSuccessPageClient,
} from "@/components/order";
import {
  Breadcrumb,
  Container,
} from "@/components/ui";
import {
  getFeaturedPhones,
} from "@/features/phone/phone.api";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";

export const dynamic =
  "force-dynamic";

type OrderSuccessPageProps = {
  params:
    | Promise<{
        orderCode: string;
      }>
    | {
        orderCode: string;
      };
};

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  description:
    "Xem mã đơn, chi tiết đơn và hướng dẫn thanh toán.",
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
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];
  const usedIds =
    new Set<number>();

  for (const phone of phones) {
    if (
      usedIds.has(phone.id)
    ) {
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

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const {
    orderCode: rawOrderCode,
  } = await Promise.resolve(params);

  const orderCode =
    decodeURIComponent(
      rawOrderCode,
    );

  const featuredResult =
    await safeRequest(
      getFeaturedPhones(10),
      [],
    );

  const featuredPhones =
    uniquePhones(
      featuredResult,
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
            label: "Tra cứu đơn",
            href: "/order-lookup",
          },
          {
            label: orderCode,
          },
        ]}
      />

      <OrderSuccessPageClient
        orderCode={orderCode}
        featuredPhones={
          featuredPhones
        }
      />
    </Container>
  );
}
