"use client";

import { useId, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/utils/cn";

export type RadioCardProps = {
  value: string;
  checked: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  name?: string;
  className?: string;
  onChange: (value: string) => void;
};

export function RadioCard({
  value,
  checked,
  title,
  description,
  icon,
  disabled = false,
  name,
  className,
  onChange,
}: RadioCardProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "relative flex cursor-pointer gap-3 rounded-card border p-4 transition",
        "focus-within:ring-4 focus-within:ring-primary/15",
        checked
          ? "border-primary bg-primary-soft"
          : "border-border bg-surface hover:border-primary/50",
        disabled && "cursor-not-allowed opacity-55",
        className,
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="sr-only"
      />

      {icon && (
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-button",
            checked
              ? "bg-primary text-white"
              : "bg-slate-100 text-muted",
          )}
        >
          {icon}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">
          {title}
        </span>
        {description && (
          <span className="mt-1 block text-sm leading-6 text-muted">
            {description}
          </span>
        )}
      </span>

      <CheckCircle2
        aria-hidden="true"
        className={cn(
          "size-5 shrink-0 transition",
          checked ? "text-primary" : "text-slate-300",
        )}
      />
    </label>
  );
}
