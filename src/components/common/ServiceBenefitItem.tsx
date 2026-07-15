import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type ServiceBenefitItemProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export function ServiceBenefitItem({
  icon,
  title,
  description,
  className,
}: ServiceBenefitItemProps) {
  return (
    <article
      className={cn(
        "flex items-start gap-3 rounded-card border border-border bg-surface p-4",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"
      >
        {icon}
      </span>

      <div className="min-w-0">
        <h3 className="font-bold text-foreground">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-sm leading-5 text-muted">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}
