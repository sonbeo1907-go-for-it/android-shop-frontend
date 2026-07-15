import type { Metadata } from "next";
import {
  BatteryCharging,
  Camera,
  CreditCard,
  Gamepad2,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
} from "lucide-react";

import {
  STORE_SERVICE_BENEFITS,
} from "@/constants/service-benefits";

import {
  BrandSection,
  PromotionBanner,
  ServiceBenefits,
} from "@/components/common";
import {
  CommerceFallbackSection,
  HeroCommerceLayout,
  ShoppingGuide,
} from "@/components/home";
import { PhoneSection } from "@/components/phone";
import { Container } from "@/components/ui";
import { BANNERS } from "@/constants/banners";
import { FEATURED_BRANDS } from "@/constants/brands";
import {
  LANDING_HERO_MAIN,
  LANDING_HERO_SIDES,
} from "@/constants/landing";
import {
  getBestSellerPhones,
  getFeaturedPhones,
  getPhones,
} from "@/features/phone/phone.api";
import type {
  PhoneCardResponse,
  PhonePageResponse,
} from "@/features/phone/phone.types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Khám phá điện thoại nổi bật, bán chạy và mới nhất tại Phone Store.",
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
  const seenIds = new Set<number>();
  const result: PhoneCardResponse[] = [];

  for (const phone of phones) {
    if (seenIds.has(phone.id)) {
      continue;
    }

    seenIds.add(phone.id);
    result.push(phone);

    if (result.length >= limit) {
      break;
    }
  }

  return result;
}

function excludePhones(
  phones: PhoneCardResponse[],
  excludedIds: Set<number>,
  limit: number,
): PhoneCardResponse[] {
  return uniquePhones(
    phones.filter((phone) => !excludedIds.has(phone.id)),
    limit,
  );
}

function toIdSet(
  ...groups: PhoneCardResponse[][]
): Set<number> {
  return new Set(
    groups.flatMap((group) =>
      group.map((phone) => phone.id)
    ),
  );
}

const heroCategories = [
  {
    label: "Tất cả điện thoại",
    href: "/phones",
    icon: <Smartphone aria-hidden="true" className="size-4" />,
  },
  {
    label: "Apple",
    href: "/phones?brand=Apple",
    icon: <Sparkles aria-hidden="true" className="size-4" />,
  },
  {
    label: "Samsung",
    href: "/phones?brand=Samsung",
    icon: <Smartphone aria-hidden="true" className="size-4" />,
  },
  {
    label: "Xiaomi",
    href: "/phones?brand=Xiaomi",
    icon: <BatteryCharging aria-hidden="true" className="size-4" />,
  },
  {
    label: "Google Pixel",
    href: "/phones?brand=Google",
    icon: <Camera aria-hidden="true" className="size-4" />,
  },
  {
    label: "Điện thoại gaming",
    href: "/phones?brand=Asus",
    icon: <Gamepad2 aria-hidden="true" className="size-4" />,
  },
  {
    label: "Bán chạy",
    href: "/phones?sortBy=soldCount&sortDirection=desc",
    icon: <PackageCheck aria-hidden="true" className="size-4" />,
  },
  {
    label: "Sản phẩm mới",
    href: "/phones?sortBy=createdAt&sortDirection=desc",
    icon: <Sparkles aria-hidden="true" className="size-4" />,
  },
];

const shoppingGuides = [
  {
    title: "Điện thoại chụp ảnh",
    description:
      "Ưu tiên camera, dung lượng lưu trữ và màn hình hiển thị tốt.",
    href: "/phones?sortBy=soldCount&sortDirection=desc",
    imageSrc: "/banners/guide-camera.svg",
  },
  {
    title: "Điện thoại pin tốt",
    description:
      "Phù hợp người thường xuyên di chuyển và sử dụng cả ngày.",
    href: "/phones",
    imageSrc: "/banners/guide-battery.svg",
  },
  {
    title: "Điện thoại hiệu năng",
    description:
      "Tham khảo các mẫu mới cho game, học tập và công việc.",
    href: "/phones?sortBy=createdAt&sortDirection=desc",
    imageSrc: "/banners/guide-performance.svg",
  },
  {
    title: "Chọn đúng cấu hình",
    description:
      "Mở trang chi tiết để chọn COLOR, RAM và STORAGE trước khi mua.",
    href: "/phones",
    imageSrc: "/banners/guide-options.svg",
  },
];

export default async function HomePage() {
  const emptyPhonePage: PhonePageResponse = {
    content: [],
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
  };

  const [
    featuredResult,
    bestSellerResult,
    newestResult,
    appleResult,
    samsungResult,
  ] = await Promise.all([
    safeRequest(getFeaturedPhones(10), []),
    safeRequest(getBestSellerPhones(18), []),
    safeRequest(
      getPhones({
        page: 0,
        size: 20,
        sortBy: "createdAt",
        sortDirection: "desc",
      }),
      emptyPhonePage,
    ),
    safeRequest(
      getPhones({
        brand: "Apple",
        page: 0,
        size: 12,
        sortBy: "soldCount",
        sortDirection: "desc",
      }),
      emptyPhonePage,
    ),
    safeRequest(
      getPhones({
        brand: "Samsung",
        page: 0,
        size: 12,
        sortBy: "soldCount",
        sortDirection: "desc",
      }),
      emptyPhonePage,
    ),
  ]);

  const featuredPhones = uniquePhones(featuredResult, 8);

  const bestSellerPhones = excludePhones(
    bestSellerResult,
    toIdSet(featuredPhones),
    8,
  );

  const newestPhones = excludePhones(
    newestResult.content,
    toIdSet(featuredPhones, bestSellerPhones),
    8,
  );

  const preferredBrandPage =
    appleResult.content.length >= 4
      ? {
          brand: "Apple",
          page: appleResult,
        }
      : {
          brand: "Samsung",
          page: samsungResult,
        };

  const brandPhones = uniquePhones(
    preferredBrandPage.page.content,
    8,
  );

  return (
    <Container className="space-y-6 py-4 sm:py-6 lg:space-y-8">
      <HeroCommerceLayout
        categories={heroCategories}
        mainBanner={LANDING_HERO_MAIN}
        sideBanners={LANDING_HERO_SIDES}
      />

      <ServiceBenefits
        items={STORE_SERVICE_BENEFITS}
        columns={4}
      />

      <BrandSection
        brands={FEATURED_BRANDS}
        title="Chọn điện thoại theo hãng"
        subtitle="Truy cập nhanh các thương hiệu đang có trong dữ liệu sản phẩm."
      />

      {featuredPhones.length > 0 ? (
        <PhoneSection
          title="Sản phẩm nổi bật"
          subtitle="Những mẫu điện thoại đang được ưu tiên giới thiệu."
          phones={featuredPhones}
          viewAllHref="/phones"
          layout="carousel"
          badge="featured"
          background="primary"
        />
      ) : (
        <CommerceFallbackSection
          title="Khám phá danh mục điện thoại"
          description="Danh sách nổi bật đang tạm thời chưa tải được. Bạn vẫn có thể xem toàn bộ sản phẩm hoặc chọn theo thương hiệu."
          actions={[
            {
              label: "Xem tất cả điện thoại",
              href: "/phones",
            },
            {
              label: "Xem điện thoại Samsung",
              href: "/phones?brand=Samsung",
            },
          ]}
        />
      )}

      <PromotionBanner
        {...BANNERS.promotion}
        aspectRatio="wide"
      />

      {bestSellerPhones.length > 0 ? (
        <PhoneSection
          title="Điện thoại bán chạy"
          subtitle="Các sản phẩm có số lượng đã bán cao."
          phones={bestSellerPhones}
          viewAllHref="/phones?sortBy=soldCount&sortDirection=desc"
          layout="carousel"
          badge="best-seller"
          background="surface"
        />
      ) : (
        <CommerceFallbackSection
          title="Tìm điện thoại được quan tâm"
          description="Dữ liệu bán chạy đang tạm thời chưa khả dụng. Hãy thử tìm theo hãng hoặc xem danh sách sản phẩm."
          actions={[
            {
              label: "Tìm theo thương hiệu",
              href: "/phones",
            },
            {
              label: "Xem Apple",
              href: "/phones?brand=Apple",
            },
          ]}
        />
      )}

      {newestPhones.length > 0 ? (
        <PhoneSection
          title="Sản phẩm mới nhất"
          subtitle="Các điện thoại được cập nhật gần đây."
          phones={newestPhones}
          viewAllHref="/phones?sortBy=createdAt&sortDirection=desc"
          layout="carousel"
          badge="new"
          background="surface"
        />
      ) : (
        <CommerceFallbackSection
          title="Cập nhật sản phẩm mới"
          description="Danh sách mới nhất đang tạm thời chưa tải được. Bạn có thể tiếp tục duyệt toàn bộ điện thoại."
          actions={[
            {
              label: "Xem danh sách sản phẩm",
              href: "/phones?sortBy=createdAt&sortDirection=desc",
            },
          ]}
        />
      )}

      {brandPhones.length > 0 ? (
        <PhoneSection
          title={`Điện thoại ${preferredBrandPage.brand}`}
          subtitle={`Khám phá các mẫu ${preferredBrandPage.brand} đang có tại cửa hàng.`}
          phones={brandPhones}
          viewAllHref={`/phones?brand=${encodeURIComponent(
            preferredBrandPage.brand,
          )}`}
          layout="carousel"
          background="surface"
        />
      ) : (
        <PromotionBanner
          {...BANNERS.shipping}
          aspectRatio="wide"
        />
      )}

      <ShoppingGuide
        items={shoppingGuides}
      />
    </Container>
  );
}
