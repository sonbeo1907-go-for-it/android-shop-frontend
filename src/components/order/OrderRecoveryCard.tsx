"use client";

import {
  useState,
  type FormEvent,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  Search,
} from "lucide-react";

import {
  Button,
  Input,
} from "@/components/ui";

export type OrderRecoveryCardProps = {
  orderCode: string;
};

export function OrderRecoveryCard({
  orderCode,
}: OrderRecoveryCardProps) {
  const router = useRouter();
  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState("");
  const [error, setError] =
    useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedPhone =
      phoneNumber.trim();

    if (!normalizedPhone) {
      setError(
        "Vui lòng nhập số điện thoại nhận hàng.",
      );
      return;
    }

    const query =
      new URLSearchParams({
        orderCode,
        phoneNumber:
          normalizedPhone,
      });

    router.push(
      `/order-lookup?${query.toString()}`,
    );
  }

  return (
    <section className="rounded-section border border-border bg-surface p-6 text-center shadow-card sm:p-8">
      <h1 className="text-2xl font-bold text-foreground">
        Không còn dữ liệu đơn hàng tạm
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
        Hãy dùng mã đơn và số điện thoại
        nhận hàng để tra cứu thông tin.
      </p>

      <form
        className="mx-auto mt-6 grid max-w-xl gap-3 text-left sm:grid-cols-[minmax(0,1fr)_auto]"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            label="Số điện thoại nhận hàng"
            type="tel"
            value={phoneNumber}
            placeholder="0901234567"
            error={error}
            onChange={(event) => {
              setPhoneNumber(
                event.target.value,
              );
              setError("");
            }}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          leftIcon={
            <Search
              aria-hidden="true"
              className="size-4"
            />
          }
          className="sm:mt-7"
        >
          Tra cứu đơn
        </Button>
      </form>

      <p className="mt-4 text-sm text-muted">
        Mã đơn:{" "}
        <strong className="text-primary">
          {orderCode}
        </strong>
      </p>
    </section>
  );
}
