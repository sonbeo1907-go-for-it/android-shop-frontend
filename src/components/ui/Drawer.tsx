"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/utils/cn";

export type DrawerSide = "left" | "right" | "bottom";

export type DrawerProps = {
  open: boolean;
  title?: string;
  side?: DrawerSide;
  children: ReactNode;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  closeLabel?: string;
  className?: string;
  onClose: () => void;
};

const sideClasses: Record<DrawerSide, string> = {
  left: "inset-y-0 left-0 h-full w-[min(88vw,24rem)]",
  right: "inset-y-0 right-0 h-full w-[min(88vw,24rem)]",
  bottom: "inset-x-0 bottom-0 max-h-[88vh] w-full rounded-t-section",
};

export function Drawer({
  open,
  title,
  side = "right",
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  closeLabel = "Đóng bảng điều khiển",
  className,
  onClose,
}: DrawerProps) {
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
      className="fixed inset-0 z-[100] bg-slate-950/55 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          "fixed flex flex-col border-border bg-surface shadow-2xl",
          side === "left" && "border-r",
          side === "right" && "border-l",
          side === "bottom" && "border-t",
          sideClasses[side],
          className,
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-4">
          {title ? (
            <h2 id={titleId} className="text-lg font-bold text-foreground">
              {title}
            </h2>
          ) : (
            <span />
          )}

          <IconButton
            icon={<X aria-hidden="true" className="size-5" />}
            label={closeLabel}
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>

        {footer && (
          <footer className="border-t border-border bg-slate-50 p-4">
            {footer}
          </footer>
        )}
      </aside>
    </div>,
    document.body,
  );
}
