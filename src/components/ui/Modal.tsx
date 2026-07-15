"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/utils/cn";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
  open: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
  size?: ModalSize;
  className?: string;
  onClose: () => void;
};

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  open,
  title,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeLabel = "Đóng hộp thoại",
  size = "md",
  className,
  onClose,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOnEscape, onClose, open]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          "max-h-[calc(100vh-2rem)] w-full overflow-hidden rounded-section border border-border bg-surface shadow-2xl",
          sizeClasses[size],
          className,
        )}
      >
        {(title || showCloseButton) && (
          <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
            {title ? (
              <h2 id={titleId} className="text-lg font-bold text-foreground">
                {title}
              </h2>
            ) : (
              <span />
            )}

            {showCloseButton && (
              <IconButton
                icon={<X aria-hidden="true" className="size-5" />}
                label={closeLabel}
                variant="ghost"
                size="sm"
                onClick={onClose}
              />
            )}
          </header>
        )}

        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-5 py-5">
          {children}
        </div>

        {footer && (
          <footer className="border-t border-border bg-slate-50 px-5 py-4">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  );
}
