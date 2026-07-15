import type { ReactNode } from "react";
import Link from "next/link";
import { Inbox } from "lucide-react";

import { cn } from "@/utils/cn";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  action,
  children,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-section",
        "border border-dashed border-border bg-surface px-6 py-10 text-center",
        className,
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-muted">
        {icon ?? (
          <Inbox
            aria-hidden="true"
            className="size-8"
          />
        )}
      </div>

      <h2 className="mt-5 text-xl font-bold text-foreground">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          {description}
        </p>
      )}

      {(action ||
        (actionLabel && actionHref)) && (
        <div className="mt-6">
          {action ??
            (actionLabel && actionHref ? (
              <Link
                href={actionHref}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-button",
                  "bg-primary px-5 text-sm font-semibold !text-white",
                  "transition hover:bg-primary-dark hover:!text-white",
                  "visited:!text-white",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
                )}
              >
                {actionLabel}
              </Link>
            ) : null)}
        </div>
      )}

      {children && (
        <div className="mt-6 w-full">
          {children}
        </div>
      )}
    </section>
  );
}