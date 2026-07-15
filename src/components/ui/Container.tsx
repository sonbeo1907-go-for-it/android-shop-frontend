import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

export type ContainerSize = "default" | "wide" | "narrow";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: ContainerSize;
};

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  narrow: "max-w-4xl",
};

export function Container({
  children,
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-5 lg:px-6",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
