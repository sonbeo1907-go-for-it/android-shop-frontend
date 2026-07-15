"use client";

import {
  Building2,
  Copy,
  QrCode,
} from "lucide-react";
import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui";
import {
  formatCurrency,
} from "@/utils/currency";
import {
  cn,
} from "@/utils/cn";
import {
  useEffect,
  useState,
} from "react";

export type QrPaymentCardProps = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  transferContent: string;
  qrImageSrc?: string;
  className?: string;
};

async function copyText(
  value: string,
  successMessage: string,
): Promise<void> {
  try {
    await navigator.clipboard.writeText(
      value,
    );

    toast.success(successMessage);
  } catch {
    toast.error(
      "Không thể sao chép. Vui lòng sao chép thủ công.",
    );
  }
}

export function QrPaymentCard({
  bankName,
  accountNumber,
  accountName,
  amount,
  transferContent,
  qrImageSrc,
  className,
}: QrPaymentCardProps) {

  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [qrImageSrc]);

  return (
    <section
      className={cn(
        "rounded-section border border-primary/20 bg-primary-soft p-5 shadow-card sm:p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-sm">
          <QrCode
            aria-hidden="true"
            className="size-6"
          />
        </span>

        <div>
          <h2 className="text-xl font-bold text-foreground">
            Thanh toán bằng QR
          </h2>

          <p className="mt-1 text-sm text-muted">
            Quét mã và chuyển đúng
            số tiền, nội dung.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="flex items-center justify-center rounded-card border border-border bg-white p-3">
          {qrImageSrc
            && !imageFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrImageSrc}
              alt={`Mã QR chuyển khoản ${bankName}`}
              className="aspect-square w-full max-w-64 object-contain"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => {
                setImageFailed(true);
              }}
            />
          ) : (
            <div className="flex aspect-square w-full max-w-64 flex-col items-center justify-center rounded-card bg-red-50 p-5 text-center text-red-700">
              <QrCode
                aria-hidden="true"
                className="size-12"
              />

              <p className="mt-3 font-semibold">
                Không thể tải mã QR
              </p>

              <p className="mt-2 text-xs leading-5">
                Vui lòng chuyển khoản thủ
                công theo thông tin bên cạnh.
              </p>
            </div>
          )}
        </div>

        <dl className="space-y-3">
          <div className="rounded-card bg-white p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Ngân hàng
            </dt>

            <dd className="mt-1 flex items-center gap-2 font-bold text-foreground">
              <Building2
                aria-hidden="true"
                className="size-4 text-primary"
              />
              {bankName}
            </dd>
          </div>

          <div className="rounded-card bg-white p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Số tài khoản
            </dt>

            <dd className="mt-1 flex flex-wrap items-center justify-between gap-2">
              <strong className="break-all text-foreground">
                {accountNumber}
              </strong>

              <Button
                variant="ghost"
                size="sm"
                leftIcon={
                  <Copy
                    aria-hidden="true"
                    className="size-4"
                  />
                }
                onClick={() => {
                  void copyText(
                    accountNumber,
                    "Đã sao chép số tài khoản.",
                  );
                }}
              >
                Sao chép
              </Button>
            </dd>
          </div>

          <div className="rounded-card bg-white p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Chủ tài khoản
            </dt>

            <dd className="mt-1 font-bold uppercase text-foreground">
              {accountName}
            </dd>
          </div>

          <div className="rounded-card bg-white p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Số tiền
            </dt>

            <dd className="mt-1 text-xl font-bold text-primary">
              {formatCurrency(amount)}
            </dd>
          </div>

          <div className="rounded-card bg-white p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              Nội dung chuyển khoản
            </dt>

            <dd className="mt-1 flex flex-wrap items-center justify-between gap-2">
              <strong className="break-all uppercase text-foreground">
                {transferContent}
              </strong>

              <Button
                variant="ghost"
                size="sm"
                leftIcon={
                  <Copy
                    aria-hidden="true"
                    className="size-4"
                  />
                }
                onClick={() => {
                  void copyText(
                    transferContent,
                    "Đã sao chép nội dung chuyển khoản.",
                  );
                }}
              >
                Sao chép
              </Button>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
