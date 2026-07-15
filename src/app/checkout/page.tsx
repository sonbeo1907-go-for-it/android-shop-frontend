import type {
  Metadata,
} from "next";

import {
  CheckoutPageClient,
} from "@/components/checkout";
import {
  Breadcrumb,
  Container,
  SectionHeader,
} from "@/components/ui";
import {
  getFeaturedPhones,
} from "@/features/phone/phone.api";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title: "Thanh toán",
  description:
    "Nhập thông tin nhận hàng và tạo đơn từ các sản phẩm trong giỏ.",
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

export default async function CheckoutPage() {
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
            label: "Giỏ hàng",
            href: "/cart",
          },
          {
            label: "Thanh toán",
          },
        ]}
      />

      <SectionHeader
        title="Thông tin thanh toán"
        subtitle="Kiểm tra thông tin nhận hàng và sản phẩm trước khi tạo đơn."
      />

      <CheckoutPageClient
        featuredPhones={
          featuredPhones
        }
      />
    </Container>
  );
}
