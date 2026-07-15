"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/utils/cn";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  inputClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      id,
      label,
      error,
      hint,
      required,
      disabled,
      leftIcon,
      rightElement,
      className,
      inputClassName,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    const describedBy = error || hint ? messageId : undefined;

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            {label}
            {required && (
              <span className="ml-1 text-danger" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              "min-h-11 w-full rounded-button border bg-surface px-3 text-sm text-foreground transition",
              "placeholder:text-slate-400",
              "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10",
              "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-muted",
              error
                ? "border-danger focus:border-danger focus:ring-danger/10"
                : "border-border",
              leftIcon && "pl-10",
              rightElement && "pr-11",
              inputClassName,
            )}
            {...props}
          />

          {rightElement && (
            <span className="absolute inset-y-0 right-3 flex items-center">
              {rightElement}
            </span>
          )}
        </div>

        {(error || hint) && (
          <p
            id={messageId}
            className={cn(
              "mt-1.5 text-xs leading-5",
              error ? "text-danger" : "text-muted",
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
