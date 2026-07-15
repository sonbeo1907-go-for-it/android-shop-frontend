import type {
  Metadata,
} from "next";
import {
  CreditCard,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  notFound,
} from "next/navigation";

import {
  PromotionBanner,
  ServiceBenefits,
} from "@/components/common";
import {
  STORE_SERVICE_BENEFITS,
} from "@/constants/service-benefits";
import {
  PhoneDescription,
  PhoneDetailClient,
  PhoneSection,
  PhoneSpecifications,
} from "@/components/phone";
import {
  Breadcrumb,
  Container,
  ContentSection,
  ErrorState,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  getFeaturedPhones,
  getPhoneBySlug,
  getPhones,
} from "@/features/phone/phone.api";
import type {
  PhoneCardResponse,
  PhoneDetailResponse,
  PhonePageResponse,
} from "@/features/phone/phone.types";
import {
  ApiClientError,
} from "@/lib/api-client";
import {
  getApiErrorMessage,
} from "@/utils/error-message";

export const dynamic = "force-dynamic";

type PhoneDetailPageProps = {
  params:
    | Promise<{
        slug: string;
      }>
    | {
        slug: string;
      };
};

type PhoneLoadResult =
  | {
      phone: PhoneDetailResponse;
      error: null;
    }
  | {
      phone: null;
      error: unknown;
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

async function loadPhone(
  slug: string,
): Promise<PhoneLoadResult> {
  try {
    return {
      phone:
        await getPhoneBySlug(slug),
      error: null,
    };
  } catch (error) {
    if (
      error instanceof ApiClientError
      && (
        error.code ===
          "PHONE_NOT_FOUND"
        || error.code ===
          "PHONE_INACTIVE"
        || error.status === 404
      )
    ) {
      notFound();
    }

    return {
      phone: null,
      error,
    };
  }
}

function takeUniquePhones(
  phones: PhoneCardResponse[],
  usedIds: Set<number>,
  currentPhoneId: number,
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];

  for (const phone of phones) {
    if (
      phone.id === currentPhoneId
      || usedIds.has(phone.id)
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

export async function generateMetadata({
  params,
}: PhoneDetailPageProps): Promise<Metadata> {
  const { slug } =
    await Promise.resolve(params);

  try {
    const phone =
      await getPhoneBySlug(slug);

    return {
      title: phone.name,
      description:
        phone.shortDescription
        || `Thông tin chi tiết ${phone.name}.`,
    };
  } catch {
    return {
      title: "Chi tiết điện thoại",
    };
  }
}

export default async function PhoneDetailPage({
  params,
}: PhoneDetailPageProps) {
  const { slug } =
    await Promise.resolve(params);

  const {
    phone,
    error,
  } = await loadPhone(slug);

  if (!phone) {
    const featuredPhones =
      await safeRequest(
        getFeaturedPhones(8),
        [],
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
              label: "Không thể tải sản phẩm",
            },
          ]}
        />

        <ErrorState
          title="Không thể tải thông tin sản phẩm"
          message={
            getApiErrorMessage(error)
          }
        />

        {featuredPhones.length > 0 && (
          <PhoneSection
            title="Sản phẩm nổi bật"
            phones={featuredPhones}
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

  const emptyPage: PhonePageResponse = {
    content: [],
    page: 0,
    size: 8,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
  };

  const [
    sameBrandPage,
    featuredResult,
  ] = await Promise.all([
    safeRequest(
      getPhones({
        brand: phone.brand,
        page: 0,
        size: 8,
        sortBy: "soldCount",
        sortDirection: "desc",
      }),
      emptyPage,
    ),
    safeRequest(
      getFeaturedPhones(10),
      [],
    ),
  ]);

  const usedIds = new Set<number>();

  const sameBrandPhones =
    takeUniquePhones(
      sameBrandPage.content,
      usedIds,
      phone.id,
      8,
    );

  const featuredPhones =
    takeUniquePhones(
      featuredResult,
      usedIds,
      phone.id,
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
            label: "Điện thoại",
            href: "/phones",
          },
          {
            label: phone.brand,
            href: `/phones?brand=${encodeURIComponent(
              phone.brand,
            )}`,
          },
          {
            label: phone.name,
          },
        ]}
      />

      <section>
        <p className="text-sm font-semibold text-primary">
          {phone.brand}
          {phone.model
            ? ` · ${phone.model}`
            : ""}
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {phone.name}
          </h1>

          <p className="shrink-0 text-sm text-muted">
            Đã bán{" "}
            <strong className="text-foreground">
              {phone.soldCount}
            </strong>{" "}
            sản phẩm
          </p>
        </div>
      </section>

      <PhoneDetailClient
        phone={phone}
      />

      <ServiceBenefits
        items={STORE_SERVICE_BENEFITS}
        columns={4}
      />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,.8fr)]">
        {phone.description ? (
          <PhoneDescription
            description={
              phone.description
            }
          />
        ) : (
          <ContentSection>
            <p className="text-sm leading-6 text-muted">
              Chưa có mô tả chi tiết cho sản phẩm này.
            </p>
          </ContentSection>
        )}

        <PhoneSpecifications
          specifications={
            phone.specifications
          }
          collapsible
          initialVisibleCount={8}
        />
      </div>

      {sameBrandPhones.length > 0 && (
        <PhoneSection
          title={`Điện thoại ${phone.brand}`}
          subtitle="Các sản phẩm cùng thương hiệu bạn có thể quan tâm."
          phones={sameBrandPhones}
          viewAllHref={`/phones?brand=${encodeURIComponent(
            phone.brand,
          )}`}
          layout="carousel"
          currentPhoneId={phone.id}
          background="surface"
        />
      )}

      {featuredPhones.length > 0 && (
        <PhoneSection
          title="Sản phẩm nổi bật"
          subtitle="Một số lựa chọn khác tại cửa hàng."
          phones={featuredPhones}
          viewAllHref="/phones"
          layout="carousel"
          badge="featured"
          currentPhoneId={phone.id}
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
