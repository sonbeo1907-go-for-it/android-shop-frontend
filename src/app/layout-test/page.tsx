import {
  CreditCard,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  BrandSection,
  PageSupplement,
  PromotionBanner,
  ServiceBenefits,
} from "@/components/common";
import { SiteShell } from "@/components/layout";
import {
  Button,
  Container,
  ContentSection,
  SectionHeader,
} from "@/components/ui";
import { BANNERS } from "@/constants/banners";
import { FEATURED_BRANDS } from "@/constants/brands";

const benefits = [
  {
    icon: <ShieldCheck aria-hidden="true" className="size-5" />,
    title: "Sản phẩm chính hãng",
    description: "Thông tin và giá được kiểm tra từ Backend.",
  },
  {
    icon: <Truck aria-hidden="true" className="size-5" />,
    title: "Giao hàng thuận tiện",
    description: "Đặt hàng Guest không cần đăng nhập.",
  },
  {
    icon: <CreditCard aria-hidden="true" className="size-5" />,
    title: "COD hoặc QR",
    description: "Lựa chọn phương thức phù hợp.",
  },
  {
    icon: <RotateCcw aria-hidden="true" className="size-5" />,
    title: "Tra cứu dễ dàng",
    description: "Dùng mã đơn và số điện thoại.",
  },
];

export const dynamic = "force-dynamic";

export default function LayoutTestPage() {
  return (
    <SiteShell cartCount={3}>
      <Container className="space-y-6 py-6 sm:py-8">
        <PromotionBanner
          {...BANNERS.promotion}
          priority
          aspectRatio="hero"
        >
          <Button
            variant="secondary"
            size="lg"
          >
            Khám phá ngay
          </Button>
        </PromotionBanner>

        <ServiceBenefits
          items={benefits}
          columns={4}
        />

        <BrandSection
          brands={FEATURED_BRANDS}
          subtitle="Các thương hiệu có trong dữ liệu seed hiện tại."
        />

        <ContentSection>
          <SectionHeader
            title="Kiểm tra layout component"
            subtitle="Header, search, menu mobile, footer, banner, brand và service benefit đã sẵn sàng."
          />

          <p className="mt-4 text-sm leading-6 text-muted">
            Thu nhỏ cửa sổ để kiểm tra mobile menu. Thanh tìm kiếm
            sẽ chuyển đến trang danh sách sản phẩm với query keyword.
          </p>
        </ContentSection>

        <PageSupplement
          brand="Samsung"
          showSameBrand
          showFeatured
          showBestSellers
          showBanner
          maxSections={3}
        />
      </Container>
    </SiteShell>
  );
}
