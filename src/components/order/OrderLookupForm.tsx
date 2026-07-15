"use client";

import {
  useEffect,
} from "react";
import {
  useForm,
} from "react-hook-form";
import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  Hash,
  Phone,
  Search,
} from "lucide-react";
import {
  z,
} from "zod";

import {
  Button,
  Input,
} from "@/components/ui";
import {
  cn,
} from "@/utils/cn";

const orderLookupSchema =
  z.object({
    orderCode: z
      .string()
      .trim()
      .min(
        1,
        "Vui lòng nhập mã đơn hàng.",
      )
      .max(
        100,
        "Mã đơn hàng không hợp lệ.",
      ),

    phoneNumber: z
      .string()
      .trim()
      .min(
        1,
        "Vui lòng nhập số điện thoại nhận hàng.",
      )
      .min(
        9,
        "Số điện thoại quá ngắn.",
      )
      .max(
        20,
        "Số điện thoại quá dài.",
      )
      .regex(
        /^[0-9+\s().-]+$/,
        "Số điện thoại không hợp lệ.",
      ),
  });

export type OrderLookupValues =
  z.infer<
    typeof orderLookupSchema
  >;

export type OrderLookupFormProps = {
  initialOrderCode?: string;
  loading?: boolean;
  error?: string;
  onSubmit: (
    values: {
      orderCode: string;
      phoneNumber: string;
    },
  ) => Promise<void>;
};

export function OrderLookupForm({
  initialOrderCode = "",
  loading = false,
  error,
  onSubmit,
}: OrderLookupFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<OrderLookupValues>({
    resolver:
      zodResolver(
        orderLookupSchema,
      ),
    defaultValues: {
      orderCode:
        initialOrderCode,
      phoneNumber: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    setValue(
      "orderCode",
      initialOrderCode,
      {
        shouldDirty: false,
        shouldValidate: false,
      },
    );
  }, [
    initialOrderCode,
    setValue,
  ]);

  const submitting =
    loading || isSubmitting;

  return (
    <section className="rounded-section border border-border bg-surface p-5 shadow-card sm:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Tra cứu đơn hàng
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          Nhập đúng mã đơn và số điện
          thoại đã dùng khi đặt hàng.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-card border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700"
        >
          {error}
        </div>
      )}

      <form
        noValidate
        className="mt-5 grid gap-4 sm:grid-cols-2"
        onSubmit={handleSubmit(
          async (values) => {
            await onSubmit({
              orderCode:
                values.orderCode.trim(),
              phoneNumber:
                values.phoneNumber.trim(),
            });
          },
        )}
      >
        <Input
          label="Mã đơn hàng"
          placeholder="ORD-..."
          autoComplete="off"
          required
          disabled={submitting}
          error={
            errors.orderCode
              ?.message
          }
          leftIcon={
            <Hash
              aria-hidden="true"
              className="size-4"
            />
          }
          {...register(
            "orderCode",
          )}
        />

        <Input
          label="Số điện thoại nhận hàng"
          type="tel"
          inputMode="tel"
          placeholder="0901234567"
          autoComplete="tel"
          required
          disabled={submitting}
          error={
            errors.phoneNumber
              ?.message
          }
          leftIcon={
            <Phone
              aria-hidden="true"
              className="size-4"
            />
          }
          {...register(
            "phoneNumber",
          )}
        />

        <div className="sm:col-span-2">
          <Button
            type="submit"
            size="lg"
            loading={submitting}
            disabled={submitting}
            leftIcon={
              <Search
                aria-hidden="true"
                className="size-5"
              />
            }
            fullWidth
          >
            Tra cứu đơn hàng
          </Button>
        </div>
      </form>
    </section>
  );
}
