import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

export type ContentSectionTone =
  | "default"
  | "surface"
  | "primary-soft"
  | "dark";

export type ContentSectionPadding = "sm" | "md" | "lg";

export type ContentSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: ContentSectionTone;
  padding?: ContentSectionPadding;
};

const toneClasses: Record<ContentSectionTone, string> = {
  default: "bg-transparent",
  surface: "border border-border bg-surface shadow-card",
  "primary-soft": "border border-primary/10 bg-primary-soft",
  dark: "bg-slate-900 text-white",
};

const paddingClasses: Record<ContentSectionPadding, string> = {
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8 lg:p-10",
};

export function ContentSection({
  children,
  tone = "surface",
  padding = "md",
  className,
  ...props
}: ContentSectionProps) {
  return (
    <section
      className={cn(
        "rounded-section",
        toneClasses[tone],
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
