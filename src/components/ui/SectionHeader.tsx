import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/utils/cn";

export type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  actionHref,
  icon,
  action,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-button bg-primary-soft text-primary">
              {icon}
            </span>
          )}

          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h2>
        </div>

        {subtitle && (
          <p className="mt-1.5 max-w-3xl text-sm leading-6 text-muted">
            {subtitle}
          </p>
        )}
      </div>

      {action ??
        (actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline"
          >
            {actionLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        ) : null)}
    </div>
  );
}
