import type {
  Metadata,
} from "next";
import {
  SearchX,
} from "lucide-react";
import {
  isSortValue,
  sortValueToApiParams,
  type SortValue,
} from "@/features/phone/phone-sort";
import {
  BrandQuickLinks,
  PhoneGrid,
  PhoneListControls,
  PhoneListPagination,
  PhoneSection,
} from "@/components/phone";
import {
  PromotionBanner,
} from "@/components/common";
import {
  Breadcrumb,
  Container,
  EmptyState,
  SectionHeader,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  FEATURED_BRANDS,
} from "@/constants/brands";
import {
  getBestSellerPhones,
  getFeaturedPhones,
  getPhones,
} from "@/features/phone/phone.api";
import type {
  PhoneCardResponse,
  PhoneListParams,
  PhonePageResponse,
} from "@/features/phone/phone.types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Danh sách điện thoại",
  description:
    "Tìm kiếm, lọc và sắp xếp điện thoại theo hãng và khoảng giá.",
};

type PhonesPageSearchParams = {
  keyword?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
};

type PhonesPageProps = {
  searchParams:
    | Promise<PhonesPageSearchParams>
    | PhonesPageSearchParams;
};

const DEFAULT_PAGE_SIZE = 12;

function parseOptionalNumber(
  value: string | undefined,
): number | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : undefined;
}

function parsePage(
  value: string | undefined,
): number {
  const parsed = Number(value);

  if (
    !Number.isInteger(parsed)
    || parsed < 0
  ) {
    return 0;
  }

  return parsed;
}

function parseSort(
  value: string | undefined,
): SortValue {
  return isSortValue(value)
    ? value
    : "newest";
}

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

function excludeIds(
  phones: PhoneCardResponse[],
  excluded: Set<number>,
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];

  for (const phone of phones) {
    if (excluded.has(phone.id)) {
      continue;
    }

    excluded.add(phone.id);
    result.push(phone);

    if (result.length >= limit) {
      break;
    }
  }

  return result;
}

export default async function PhonesPage({
  searchParams,
}: PhonesPageProps) {
  const resolvedSearchParams =
    await Promise.resolve(searchParams);

  const keyword =
    resolvedSearchParams.keyword?.trim()
    || undefined;

  const brand =
    resolvedSearchParams.brand?.trim()
    || undefined;

  const minPrice = parseOptionalNumber(
    resolvedSearchParams.minPrice,
  );

  const maxPrice = parseOptionalNumber(
    resolvedSearchParams.maxPrice,
  );

  const page = parsePage(
    resolvedSearchParams.page,
  );

  const sort = parseSort(
    resolvedSearchParams.sort,
  );

  const sortParams =
    sortValueToApiParams(sort);

  const requestParams: PhoneListParams = {
    keyword,
    brand,
    minPrice,
    maxPrice,
    page,
    size: DEFAULT_PAGE_SIZE,
    ...sortParams,
  };

  const emptyPage: PhonePageResponse = {
    content: [],
    page,
    size: DEFAULT_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
    first: page === 0,
    last: true,
  };

  const [
    phonePage,
    featuredPhones,
    bestSellerPhones,
  ] = await Promise.all([
    safeRequest(
      getPhones(requestParams),
      emptyPage,
    ),
    safeRequest(
      getFeaturedPhones(8),
      [],
    ),
    safeRequest(
      getBestSellerPhones(12),
      [],
    ),
  ]);

  const displayedIds = new Set(
    phonePage.content.map(
      (phone) => phone.id,
    ),
  );

  const supplementalFeatured = excludeIds(
    featuredPhones,
    displayedIds,
    8,
  );

  const supplementalBestSellers = excludeIds(
    bestSellerPhones,
    displayedIds,
    8,
  );

  const brandNames =
    FEATURED_BRANDS.map(
      (item) => item.name,
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
          },
        ]}
      />

      <PromotionBanner
        desktopSrc="/banners/phones-category-wide.svg"
        mobileSrc="/banners/phones-category-mobile.svg"
        alt="Danh mục điện thoại"
        title="Khám phá thế giới smartphone"
        description="Tìm kiếm, lọc theo thương hiệu, khoảng giá và sắp xếp theo nhu cầu."
        href="/phones"
        priority
        aspectRatio="wide"
      />
      
      <br/>

      <BrandQuickLinks
        brands={brandNames}
        activeBrand={brand}
      />

      <PhoneListControls
        brands={brandNames}
        totalElements={
          phonePage.totalElements
        }
      />

      {phonePage.content.length > 0 ? (
        <>
          <PhoneGrid
            phones={phonePage.content}
            columns={{
              mobile: 2,
              tablet: 3,
              desktop: 4,
            }}
            badgeResolver={(phone) =>
              phone.featured
                ? "featured"
                : null
            }
          />

          <PhoneListPagination
            page={phonePage.page}
            totalPages={
              phonePage.totalPages
            }
          />
        </>
      ) : (
        <EmptyState
          icon={
            <SearchX
              aria-hidden="true"
              className="size-12"
            />
          }
          title="Không tìm thấy sản phẩm phù hợp"
          description="Hãy thử xóa bớt bộ lọc, đổi khoảng giá hoặc tìm bằng từ khóa khác."
          actionLabel="Xem tất cả điện thoại"
          actionHref="/phones"
        />
      )}

      {supplementalFeatured.length > 0 && (
        <PhoneSection
          title="Sản phẩm nổi bật"
          subtitle="Một số gợi ý khác bạn có thể quan tâm."
          phones={supplementalFeatured}
          viewAllHref="/phones"
          layout="carousel"
          badge="featured"
          background="surface"
        />
      )}

      {phonePage.content.length === 0
        && supplementalBestSellers.length > 0 && (
          <PhoneSection
            title="Điện thoại bán chạy"
            subtitle="Các sản phẩm được nhiều người quan tâm."
            phones={supplementalBestSellers}
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
