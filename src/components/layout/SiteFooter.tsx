import { Footer } from "@/components/layout/Footer";
import { FOOTER_COLUMNS } from "@/constants/navigation";
import {
  SITE_CONTACT,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/constants/site";

export function SiteFooter() {
  return (
    <Footer
      columns={FOOTER_COLUMNS}
      contactInfo={SITE_CONTACT}
      siteName={SITE_NAME}
      description={SITE_DESCRIPTION}
    />
  );
}
