import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";

import {
  cn,
} from "@/utils/cn";

export type CheckoutFieldProps = {
  label: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export function CheckoutField({
  label,
  error,
  required = false,
  htmlFor,
  children,
  className,
}: CheckoutFieldProps) {
  const generatedId = useId();
  const errorId =
    `${generatedId}-error`;

  const enhancedChild =
    isValidElement(children)
      ? cloneElement(
          children as ReactElement<
            Record<string, unknown>
          >,
          {
            "aria-invalid":
              Boolean(error),
            "aria-describedby":
              error
                ? errorId
                : undefined,
          },
        )
      : children;

  return (
    <div
      className={cn(
        "w-full",
        className,
      )}
    >
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-foreground"
      >
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-danger"
          >
            *
          </span>
        )}
      </label>

      {enhancedChild}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs leading-5 text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}
