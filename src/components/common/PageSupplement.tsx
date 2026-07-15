import {
  CreditCard,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { PromotionBanner } from "@/components/common/PromotionBanner";
import { ServiceBenefits } from "@/components/common/ServiceBenefits";
import { PhoneSection } from "@/components/phone";
import { BANNERS, type BannerVariant } from "@/constants/banners";
import {
  getBestSellerPhones,
  getFeaturedPhones,
  getPhones,
} from "@/features/phone/phone.api";
import type { PhoneCardResponse } from "@/features/phone/phone.types";
import { cn } from "@/utils/cn";

export type PageSupplementProps = {
  currentPhoneId?: number;
  brand?: string;
  showSameBrand?: boolean;
  showFeatured?: boolean;
  showBestSellers?: boolean;
  showBanner?: boolean;
  bannerVariant?: BannerVariant;
  maxSections?: number;
  className?: string;
};

type PhoneSectionData = {
  key: string;
  title: string;
  subtitle?: string;
  href: string;
  phones: PhoneCardResponse[];
  badge: "featured" | "best-seller" | null;
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

function takeUniquePhones(
  phones: PhoneCardResponse[],
  usedIds: Set<number>,
  currentPhoneId?: number,
  limit = 8,
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

const fallbackBenefits = [
  {
    icon: <ShieldCheck aria-hidden="true" className="size-5" />,
    title: "Thông tin minh bạch",
    description: "Giá được Backend kiểm tra lại khi đặt hàng.",
  },
  {
    icon: <Truck aria-hidden="true" className="size-5" />,
    title: "Đặt hàng thuận tiện",
    description: "Checkout không yêu cầu đăng nhập.",
  },
  {
    icon: <CreditCard aria-hidden="true" className="size-5" />,
    title: "COD hoặc QR",
    description: "Hai phương thức thanh toán cho bản demo.",
  },
  {
    icon: <PackageCheck aria-hidden="true" className="size-5" />,
    title: "Tra cứu đơn",
    description: "Dùng mã đơn và số điện thoại.",
  },
];

export async function PageSupplement({
  currentPhoneId,
  brand,
  showSameBrand = Boolean(brand),
  showFeatured = true,
  showBestSellers = true,
  showBanner = true,
  bannerVariant = "promotion",
  maxSections = 3,
  className,
}: PageSupplementProps) {
  const safeMaxSections = Math.min(
    Math.max(Math.floor(maxSections), 1),
    4,
  );

  const [sameBrandPage, featuredPhones, bestSellerPhones] =
    await Promise.all([
      showSameBrand && brand
        ? safeRequest(
            getPhones({
              brand,
              page: 0,
              size: 10,
              sortBy: "soldCount",
              sortDirection: "desc",
            }),
            null,
          )
        : Promise.resolve(null),
      showFeatured
        ? safeRequest(getFeaturedPhones(10), [])
        : Promise.resolve([]),
      showBestSellers
        ? safeRequest(getBestSellerPhones(10), [])
        : Promise.resolve([]),
    ]);

  const usedIds = new Set<number>();
  const sections: PhoneSectionData[] = [];

  if (showSameBrand && brand && sameBrandPage) {
    const phones = takeUniquePhones(
      sameBrandPage.content,
      usedIds,
      currentPhoneId,
    );

    if (phones.length > 0) {
      sections.push({
        key: "same-brand",
        title: `Điện thoại ${brand}`,
        subtitle: "Gợi ý cùng thương hiệu bạn đang quan tâm.",
        href: `/phones?brand=${encodeURIComponent(brand)}`,
        phones,
        badge: null,
      });
    }
  }

  if (showFeatured) {
    const phones = takeUniquePhones(
      featuredPhones,
      usedIds,
      currentPhoneId,
    );

    if (phones.length > 0) {
      sections.push({
        key: "featured",
        title: "Sản phẩm nổi bật",
        subtitle: "Các mẫu điện thoại được ưu tiên giới thiệu.",
        href: "/phones",
        phones,
        badge: "featured",
      });
    }
  }

  if (showBestSellers) {
    const phones = takeUniquePhones(
      bestSellerPhones,
      usedIds,
      currentPhoneId,
    );

    if (phones.length > 0) {
      sections.push({
        key: "best-sellers",
        title: "Điện thoại bán chạy",
        subtitle: "Sắp xếp theo số lượng đã bán.",
        href: "/phones?sortBy=soldCount&sortDirection=desc",
        phones,
        badge: "best-seller",
      });
    }
  }

  const blocks = sections
    .slice(0, safeMaxSections)
    .map((section) => (
      <PhoneSection
        key={section.key}
        title={section.title}
        subtitle={section.subtitle}
        phones={section.phones}
        viewAllHref={section.href}
        badge={section.badge}
        layout="carousel"
        currentPhoneId={currentPhoneId}
      />
    ));

  if (showBanner && blocks.length < safeMaxSections) {
    const banner = BANNERS[bannerVariant];

    blocks.push(
      <PromotionBanner
        key={`banner-${bannerVariant}`}
        {...banner}
      />,
    );
  }

  if (blocks.length === 0) {
    blocks.push(
      <ServiceBenefits
        key="fallback-benefits"
        items={fallbackBenefits}
      />,
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {blocks}
    </div>
  );
}
