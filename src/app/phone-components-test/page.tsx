import { PhoneComponentsPlayground } from "@/app/phone-components-test/PhoneComponentsPlayground";
import { PhoneSection } from "@/components/phone";
import { Container } from "@/components/ui";
import {
  getPhoneBySlug,
  getPhones,
} from "@/features/phone/phone.api";

export const dynamic = "force-dynamic";

export default async function PhoneComponentsTestPage() {
  const phonePage = await getPhones({
    page: 0,
    size: 8,
    sortBy: "soldCount",
    sortDirection: "desc",
  });

  const firstPhone = phonePage.content[0];

  if (!firstPhone) {
    return (
      <Container className="py-10">
        Backend chưa có sản phẩm để kiểm tra component.
      </Container>
    );
  }

  const detail = await getPhoneBySlug(firstPhone.slug);
  const brands = Array.from(
    new Set(phonePage.content.map((phone) => phone.brand)),
  );

  return (
    <Container className="space-y-6 py-6 sm:py-8">
      <PhoneSection
        title="PhoneCard, Grid và Carousel"
        subtitle="Các card sử dụng dữ liệu thật từ Backend."
        phones={phonePage.content}
        viewAllHref="/phones"
        layout="carousel"
        badge="best-seller"
      />

      <PhoneComponentsPlayground
        detail={detail}
        brands={brands}
      />
    </Container>
  );
}
