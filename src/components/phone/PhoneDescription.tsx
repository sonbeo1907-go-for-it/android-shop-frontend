import {
  FileText,
} from "lucide-react";

import {
  ContentSection,
  SectionHeader,
} from "@/components/ui";
import {
  cn,
} from "@/utils/cn";

export type PhoneDescriptionProps = {
  description?: string | null;
  title?: string;
  className?: string;
};

export function PhoneDescription({
  description,
  title = "Mô tả sản phẩm",
  className,
}: PhoneDescriptionProps) {
  if (!description?.trim()) {
    return null;
  }

  return (
    <ContentSection
      className={className}
    >
      <SectionHeader
        title={title}
        icon={
          <FileText
            aria-hidden="true"
            className="size-5"
          />
        }
      />

      <div
        className={cn(
          "mt-5 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base",
        )}
      >
        {description}
      </div>
    </ContentSection>
  );
}
