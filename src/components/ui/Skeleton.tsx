import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

export type SkeletonRounded = "none" | "sm" | "md" | "lg" | "full";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  rounded?: SkeletonRounded;
};

const roundedClasses: Record<SkeletonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-card",
  full: "rounded-full",
};

export function Skeleton({
  width,
  height,
  rounded = "md",
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-slate-200",
        roundedClasses[rounded],
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export type PhoneCardSkeletonProps = {
  className?: string;
};

export function PhoneCardSkeleton({ className }: PhoneCardSkeletonProps) {
  return (
    <div className={cn("rounded-card border border-border bg-surface p-4 shadow-card", className)}>
      <Skeleton className="aspect-square w-full" rounded="lg" />
      <Skeleton className="mt-4 h-3 w-20" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <Skeleton className="mt-4 h-5 w-32" />
      <Skeleton className="mt-4 h-10 w-full" rounded="lg" />
    </div>
  );
}

export type PhoneGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function PhoneGridSkeleton({ count = 8, className }: PhoneGridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5", className)}>
      {Array.from({ length: count }, (_, index) => (
        <PhoneCardSkeleton key={index} />
      ))}
    </div>
  );
}

export type OrderDetailSkeletonProps = {
  className?: string;
};

export function OrderDetailSkeleton({ className }: OrderDetailSkeletonProps) {
  return (
    <div className={cn("space-y-5 rounded-section border border-border bg-surface p-5 shadow-card", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-7 w-24" rounded="full" />
      </div>

      <div className="space-y-3 border-y border-border py-5">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="size-20 shrink-0" rounded="lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        ))}
      </div>

      <div className="ml-auto max-w-sm space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}
