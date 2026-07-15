"use client";

import {
  Controller,
  useForm,
} from "react-hook-form";
import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import {
  z,
} from "zod";

import {
  CheckoutField,
} from "@/components/checkout/CheckoutField";
import {
  CheckoutSubmitBar,
} from "@/components/checkout/CheckoutSubmitBar";
import {
  PaymentMethodSelector,
} from "@/components/checkout/PaymentMethodSelector";
import {
  Input,
  Textarea,
} from "@/components/ui";
import {
  CheckoutFieldErrorsError,
} from "@/features/checkout/checkout.errors";
import type {
  CheckoutFormValues,
} from "@/features/checkout/checkout.types";

const checkoutSchema =
  z.object({
    receiverName: z
      .string()
      .trim()
      .min(
        1,
        "Vui lòng nhập tên người nhận.",
      )
      .max(
        100,
        "Tên người nhận tối đa 100 ký tự.",
      ),

    phoneNumber: z
      .string()
      .trim()
      .min(
        1,
        "Vui lòng nhập số điện thoại.",
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

    email: z
      .string()
      .trim()
      .min(
        1,
        "Vui lòng nhập email.",
      )
      .email(
        "Email không hợp lệ.",
      )
      .max(
        150,
        "Email tối đa 150 ký tự.",
      ),

    address: z
      .string()
      .trim()
      .min(
        1,
        "Vui lòng nhập địa chỉ nhận hàng.",
      )
      .max(
        300,
        "Địa chỉ tối đa 300 ký tự.",
      ),

    note: z
      .string()
      .trim()
      .max(
        500,
        "Ghi chú tối đa 500 ký tự.",
      ),

    paymentMethod:
      z.enum([
        "COD",
        "QR_TRANSFER",
      ]),
  });

export type CheckoutFormProps = {
  defaultValues?: Partial<
    CheckoutFormValues
  >;
  submitting?: boolean;
  displayedTotal?: number;
  disabled?: boolean;
  onSubmit: (
    values: CheckoutFormValues,
  ) => Promise<void>;
};

const checkoutFieldNames:
  Array<keyof CheckoutFormValues> = [
    "receiverName",
    "phoneNumber",
    "email",
    "address",
    "note",
    "paymentMethod",
  ];

function isCheckoutFieldName(
  value: string,
): value is keyof CheckoutFormValues {
  return checkoutFieldNames.includes(
    value as keyof CheckoutFormValues,
  );
}

export function CheckoutForm({
  defaultValues,
  submitting = false,
  displayedTotal = 0,
  disabled = false,
  onSubmit,
}: CheckoutFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CheckoutFormValues>({
    resolver:
      zodResolver(
        checkoutSchema,
      ),
    defaultValues: {
      receiverName:
        defaultValues
          ?.receiverName
        ?? "",
      phoneNumber:
        defaultValues
          ?.phoneNumber
        ?? "",
      email:
        defaultValues?.email
        ?? "",
      address:
        defaultValues?.address
        ?? "",
      note:
        defaultValues?.note
        ?? "",
      paymentMethod:
        defaultValues
          ?.paymentMethod
        ?? "COD",
    },
    mode: "onBlur",
  });

  const loading =
    submitting
    || isSubmitting;

  const submitForm =
    handleSubmit(
      async (values) => {
        try {
          await onSubmit(values);
        } catch (error) {
          if (
            error
            instanceof
            CheckoutFieldErrorsError
          ) {
            let mapped = false;

            Object.entries(
              error.fieldErrors,
            ).forEach(
              ([
                field,
                message,
              ]) => {
                if (
                  message
                  && isCheckoutFieldName(
                    field,
                  )
                ) {
                  setError(
                    field,
                    {
                      type: "server",
                      message,
                    },
                  );

                  mapped = true;
                }
              },
            );

            if (!mapped) {
              setError(
                "root.server",
                {
                  type: "server",
                  message:
                    error.message,
                },
              );
            }

            return;
          }

          setError(
            "root.server",
            {
              type: "server",
              message:
                "Không thể gửi đơn hàng. Vui lòng thử lại.",
            },
          );
        }
      },
    );

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={submitForm}
    >
      <section className="rounded-section border border-border bg-surface p-5 shadow-card sm:p-6">
        <h2 className="text-xl font-bold text-foreground">
          Thông tin nhận hàng
        </h2>

        <p className="mt-1 text-sm leading-6 text-muted">
          Vui lòng kiểm tra kỹ thông tin trước khi đặt hàng.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <CheckoutField
            label="Tên người nhận"
            htmlFor="receiverName"
            required
            error={
              errors
                .receiverName
                ?.message
            }
          >
            <Input
              id="receiverName"
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              disabled={loading}
              leftIcon={
                <UserRound
                  aria-hidden="true"
                  className="size-4"
                />
              }
              {...register(
                "receiverName",
              )}
            />
          </CheckoutField>

          <CheckoutField
            label="Số điện thoại"
            htmlFor="phoneNumber"
            required
            error={
              errors
                .phoneNumber
                ?.message
            }
          >
            <Input
              id="phoneNumber"
              type="tel"
              inputMode="tel"
              placeholder="0901234567"
              autoComplete="tel"
              disabled={loading}
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
          </CheckoutField>

          <CheckoutField
            label="Email"
            htmlFor="email"
            required
            error={
              errors.email
                ?.message
            }
            className="sm:col-span-2"
          >
            <Input
              id="email"
              type="email"
              required
              placeholder="email@example.com"
              autoComplete="email"
              disabled={loading}
              leftIcon={
                <Mail
                  aria-hidden="true"
                  className="size-4"
                />
              }
              {...register(
                "email",
              )}
            />
          </CheckoutField>

          <CheckoutField
            label="Địa chỉ nhận hàng"
            htmlFor="address"
            required
            error={
              errors.address
                ?.message
            }
            className="sm:col-span-2"
          >
            <Textarea
              id="address"
              rows={3}
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              autoComplete="street-address"
              disabled={loading}
              {...register(
                "address",
              )}
            />
          </CheckoutField>

          <CheckoutField
            label="Ghi chú"
            htmlFor="note"
            error={
              errors.note
                ?.message
            }
            className="sm:col-span-2"
          >
            <Textarea
              id="note"
              rows={3}
              maxLength={500}
              placeholder="Ghi chú thêm cho cửa hàng hoặc đơn vị giao hàng"
              disabled={loading}
              {...register(
                "note",
              )}
            />
          </CheckoutField>
        </div>
      </section>

      <section className="rounded-section border border-border bg-surface p-5 shadow-card sm:p-6">
        <h2 className="text-xl font-bold text-foreground">
          Phương thức thanh toán
        </h2>

        <div className="mt-5">
          <Controller
            name="paymentMethod"
            control={control}
            render={({
              field,
            }) => (
              <PaymentMethodSelector
                value={field.value}
                error={
                  errors
                    .paymentMethod
                    ?.message
                }
                onChange={
                  field.onChange
                }
              />
            )}
          />
        </div>
      </section>

      {errors.root?.server
        ?.message && (
        <div
          role="alert"
          className="rounded-card border border-danger/30 bg-red-50 p-4 text-sm leading-6 text-danger"
        >
          {
            errors.root
              .server.message
          }
        </div>
      )}

      <CheckoutSubmitBar
        displayedTotal={
          displayedTotal
        }
        loading={loading}
        disabled={
          disabled
          || loading
        }
        onSubmit={() => {
          /*
           * Button có type=submit.
           * Callback được giữ đúng
           * interface nhưng không
           * submit lần thứ hai.
           */
        }}
      />
    </form>
  );
}
