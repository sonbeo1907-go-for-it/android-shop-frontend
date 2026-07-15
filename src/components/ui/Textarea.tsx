"use client";

import {
  forwardRef,
  useId,
  type TextareaHTMLAttributes,
} from "react";

import { cn } from "@/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  textareaClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      id,
      label,
      error,
      hint,
      required,
      disabled,
      rows = 4,
      className,
      textareaClassName,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const messageId = `${textareaId}-message`;
    const describedBy = error || hint ? messageId : undefined;

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={textareaId}
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

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            "w-full resize-y rounded-button border bg-surface px-3 py-2.5 text-sm text-foreground transition",
            "placeholder:text-slate-400",
            "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10",
            "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-muted",
            error
              ? "border-danger focus:border-danger focus:ring-danger/10"
              : "border-border",
            textareaClassName,
          )}
          {...props}
        />

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
