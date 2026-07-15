"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark",
  secondary:
    "border-slate-900 bg-slate-900 text-white hover:border-slate-700 hover:bg-slate-700",
  outline:
    "border-border bg-surface text-foreground hover:border-primary hover:bg-primary-soft hover:text-primary",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-slate-100",
  danger:
    "border-danger bg-danger text-white hover:border-red-700 hover:bg-red-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 gap-1.5 rounded-button px-3 text-sm",
  md: "min-h-11 gap-2 rounded-button px-4 text-sm",
  lg: "min-h-12 gap-2.5 rounded-button px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      type = "button",
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex select-none items-center justify-center border font-semibold transition duration-200",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading ? (
          <LoaderCircle
            aria-hidden="true"
            className="size-4 animate-spin"
          />
        ) : (
          leftIcon
        )}

        <span>{children}</span>

        {!loading && rightIcon}
      </button>
    );
  },
);
