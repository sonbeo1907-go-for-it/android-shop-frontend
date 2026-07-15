"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export type ErrorStateProps = {
  title?: string;
  message: string;
  retryLabel?: string;
  className?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Đã xảy ra lỗi",
  message,
  retryLabel = "Thử lại",
  className,
  onRetry,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-section border border-red-200 bg-red-50 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-white text-danger shadow-sm">
        <AlertTriangle aria-hidden="true" className="size-8" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-red-700">{message}</p>

      {onRetry && (
        <Button
          variant="outline"
          leftIcon={<RotateCcw aria-hidden="true" className="size-4" />}
          className="mt-6 border-red-200 text-danger hover:border-danger hover:bg-red-100 hover:text-danger"
          onClick={onRetry}
        >
          {retryLabel}
        </Button>
      )}
    </section>
  );
}
