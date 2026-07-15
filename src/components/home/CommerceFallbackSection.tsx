import Link from "next/link";
import {
  ArrowRight,
  CircleHelp
} from "lucide-react";
import type { ReactNode } from "react";

import {
  ContentSection,
  SectionHeader,
} from "@/components/ui";

export type CommerceFallbackAction = {
  label: string;
  href: string;
};

export type CommerceFallbackSectionProps = {
  title: string;
  description: string;
  actions: CommerceFallbackAction[];
  icon?: ReactNode;
};

export function CommerceFallbackSection({
  title,
  description,
  actions,
  icon,
}: CommerceFallbackSectionProps) {
  return (
    <ContentSection tone="primary-soft">
      <SectionHeader
        title={title}
        subtitle={description}
        icon={
          icon ?? (
            <CircleHelp
              aria-hidden="true"
              className="size-5"
            />
          )
        }
      />

      <div className="mt-5 flex flex-wrap gap-2.5">
        {actions.map((action) => (
          <Link
            key={`${action.label}-${action.href}`}
            href={action.href}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-button border border-primary/20 bg-white px-4 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
          >
            {action.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4"
            />
          </Link>
        ))}
      </div>
    </ContentSection>
  );
}
