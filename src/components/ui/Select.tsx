"use client";

import {
  forwardRef,
  useId,
  type ChangeEvent,
  type SelectHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/utils/cn";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  selectClassName?: string;
  onValueChange?: (value: string) => void;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      id,
      label,
      options,
      placeholder,
      error,
      hint,
      required,
      disabled,
      className,
      selectClassName,
      onChange,
      onValueChange,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const messageId = `${selectId}-message`;
    const describedBy = error || hint ? messageId : undefined;

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
      onChange?.(event);
      onValueChange?.(event.target.value);
    }

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={selectId}
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
          <select
            ref={ref}
            id={selectId}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            onChange={handleChange}
            className={cn(
              "min-h-11 w-full appearance-none rounded-button border bg-surface px-3 pr-10 text-sm text-foreground transition",
              "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10",
              "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-muted",
              error
                ? "border-danger focus:border-danger focus:ring-danger/10"
                : "border-border",
              selectClassName,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
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
