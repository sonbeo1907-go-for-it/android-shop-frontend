import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/ui";
import { cn } from "@/utils/cn";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterContactInfo = {
  phone?: string;
  email?: string;
  address?: string;
};

export type FooterProps = {
  columns: FooterColumn[];
  contactInfo?: FooterContactInfo;
  siteName?: string;
  description?: string;
  className?: string;
};

export function Footer({
  columns,
  contactInfo,
  siteName = "Phone Store",
  description = "Cửa hàng smartphone demo với trải nghiệm mua sắm trực tuyến đơn giản và rõ ràng.",
  className,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-10 border-t border-slate-800 bg-slate-950 text-slate-300",
        className,
      )}
    >
      <Container>
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <section>
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck aria-hidden="true" className="size-7 text-primary" />
              <h2 className="text-xl font-bold">{siteName}</h2>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              {description}
            </p>

            {contactInfo && (
              <ul className="mt-5 space-y-3 text-sm">
                {contactInfo.phone && (
                  <li className="flex items-start gap-2.5">
                    <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-white">
                      {contactInfo.phone}
                    </a>
                  </li>
                )}

                {contactInfo.email && (
                  <li className="flex items-start gap-2.5">
                    <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                    <a href={`mailto:${contactInfo.email}`} className="break-all hover:text-white">
                      {contactInfo.email}
                    </a>
                  </li>
                )}

                {contactInfo.address && (
                  <li className="flex items-start gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{contactInfo.address}</span>
                  </li>
                )}
              </ul>
            )}
          </section>

          {columns.map((column) => (
            <section key={column.title}>
              <h2 className="font-bold text-white">
                {column.title}
              </h2>

              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteName}. Project học tập.
          </p>

          <div className="flex flex-wrap gap-2">
            {["COD", "QR Transfer", "Bảo hành 12 tháng"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-700 px-2.5 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
