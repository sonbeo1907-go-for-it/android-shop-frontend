"use client";

import {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  CreditCard,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  toast,
} from "sonner";

import {
  CheckoutForm,
} from "@/components/checkout/CheckoutForm";
import {
  OrderSummary,
} from "@/components/checkout/OrderSummary";
import {
  PromotionBanner,
  ServiceBenefits,
} from "@/components/common";
import {
  PhoneSection,
} from "@/components/phone";
import {
  Skeleton,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  selectCartDisplayedSubtotal,
  useCartStore,
} from "@/features/cart/cart.store";
import {
  CheckoutFieldErrorsError,
} from "@/features/checkout/checkout.errors";
import {
  saveTemporaryOrder,
} from "@/features/checkout/order-session";
import type {
  CheckoutFieldErrors,
  CheckoutFormValues,
} from "@/features/checkout/checkout.types";
import {
  createOrder,
} from "@/features/order/order.api";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";
import {
  ApiClientError,
} from "@/lib/api-client";

export type CheckoutPageClientProps = {
  featuredPhones:
    PhoneCardResponse[];
};

const serviceBenefits = [
  {
    icon: (
      <ShieldCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Tổng tiền rõ ràng",
    description:
      "Giá sản phẩm và phí giao hàng được xác nhận khi tạo đơn.",
  },
  {
    icon: (
      <Truck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Thông tin giao hàng",
    description:
      "Kiểm tra kỹ tên, số điện thoại và địa chỉ nhận hàng.",
  },
  {
    icon: (
      <CreditCard
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Thanh toán linh hoạt",
    description:
      "Chọn thanh toán khi nhận hàng hoặc chuyển khoản QR.",
  },
  {
    icon: (
      <PackageCheck
        aria-hidden="true"
        className="size-5"
      />
    ),
    title: "Theo dõi đơn hàng",
    description:
      "Lưu mã đơn để tra cứu trạng thái sau khi đặt hàng.",
  },
];
const checkoutFields =
  new Set<
    keyof CheckoutFormValues
  >([
    "receiverName",
    "phoneNumber",
    "email",
    "address",
    "note",
    "paymentMethod",
  ]);

function normalizeFieldErrors(
  raw: unknown,
): CheckoutFieldErrors {
  if (
    !raw
    || typeof raw !== "object"
    || Array.isArray(raw)
  ) {
    return {};
  }

  const result:
    CheckoutFieldErrors = {};

  Object.entries(
    raw as Record<
      string,
      unknown
    >,
  ).forEach(
    ([field, value]) => {
      if (
        !checkoutFields.has(
          field as keyof CheckoutFormValues,
        )
      ) {
        return;
      }

      if (typeof value === "string") {
        result[
          field as keyof CheckoutFormValues
        ] = value;
        return;
      }

      if (
        Array.isArray(value)
        && typeof value[0]
          === "string"
      ) {
        result[
          field as keyof CheckoutFormValues
        ] = value[0];
      }
    },
  );

  return result;
}

function getErrorFieldErrors(
  error: ApiClientError,
): unknown {
  return (
    error as ApiClientError & {
      fieldErrors?: unknown;
    }
  ).fieldErrors;
}

function CheckoutHydrationSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="space-y-5">
        <Skeleton className="h-[32rem] w-full rounded-section" />
        <Skeleton className="h-52 w-full rounded-section" />
      </div>

      <Skeleton className="h-[34rem] w-full rounded-section" />
    </div>
  );
}

function filterRecommendations(
  phones: PhoneCardResponse[],
  excludedIds: Set<number>,
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];

  for (const phone of phones) {
    if (
      excludedIds.has(phone.id)
    ) {
      continue;
    }

    excludedIds.add(phone.id);
    result.push(phone);

    if (result.length >= limit) {
      break;
    }
  }

  return result;
}

export function CheckoutPageClient({
  featuredPhones,
}: CheckoutPageClientProps) {
  const router = useRouter();

  const navigatingToSuccessRef =
  useRef(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const items = useCartStore(
    (state) => state.items,
  );

  const hydrated = useCartStore(
    (state) => state.hydrated,
  );

  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  const displayedSubtotal =
    useCartStore(
      selectCartDisplayedSubtotal,
    );

  const displayedShippingFee = 0;

  const displayedTotal =
    displayedSubtotal
    + displayedShippingFee;

  const recommendations =
    useMemo(() => {
      const excludedIds =
        new Set(
          items.map(
            (item) =>
              item.phoneId,
          ),
        );

      return filterRecommendations(
        featuredPhones,
        excludedIds,
        8,
      );
    }, [
      featuredPhones,
      items,
    ]);

    useEffect(() => {
      if (!hydrated) {
        return;
      }
      if (
        navigatingToSuccessRef.current
      ) {
        return;
      }

      if (items.length === 0) {
        router.replace("/cart");
      }
    }, [
      hydrated,
      items.length,
      router,
    ]);

  if (!hydrated) {
    return (
      <CheckoutHydrationSkeleton />
    );
  }

  if (items.length === 0) {
    return (
      <CheckoutHydrationSkeleton />
    );
  }

  async function handleCheckoutSubmit(
    values: CheckoutFormValues,
  ): Promise<void> {
    setSubmitting(true);

    try {
      const order =
        await createOrder({
          receiverName:
            values.receiverName.trim(),
          phoneNumber:
            values.phoneNumber.trim(),
          email:
            values.email.trim(),
          address:
            values.address.trim(),
          note:
            values.note.trim()
              || undefined,
          paymentMethod:
            values.paymentMethod,
          items: items.map(
            (item) => ({
              phoneId:
                item.phoneId,
              optionIds:
                item.selectedOptions
                  .map(
                    (option) =>
                      option.id,
                  )
                  .sort(
                    (
                      first,
                      second,
                    ) =>
                      first
                      - second,
                  ),
              quantity:
                item.quantity,
            }),
          ),
        });

      const orderCode = order.orderCode?.trim();
      if (!orderCode) {
        toast.error(
          "Đơn hàng đã được tiếp nhận nhưng không nhận được mã đơn. Vui lòng không đặt lại ngay và liên hệ cửa hàng để được hỗ trợ.",
          {
            duration: 12000,
          },
        );

        return;
      }
    
      saveTemporaryOrder(order);

      navigatingToSuccessRef.current = true;
      
      clearCart();

      toast.success(
        "Đặt hàng thành công",
        {
          description:
            `Mã đơn của bạn: ${orderCode}`,
          duration: 12000,
          action: {
            label: "Sao chép",
            onClick: () => {
              void navigator.clipboard
                .writeText(orderCode)
                .then(() => {
                  toast.success(
                    "Đã sao chép mã đơn.",
                  );
                })
                .catch(() => {
                  toast.error(
                    "Không thể sao chép tự động.",
                  );
                });
            },
          },
        },
      );

      router.replace(
        `/order-success/${encodeURIComponent(
          orderCode,
        )}`,
      );

    } catch (error) {
      if (
        error
        instanceof ApiClientError
      ) {
        switch (error.code) {
          case "INVALID_REQUEST": {
            const fieldErrors =
              normalizeFieldErrors(
                getErrorFieldErrors(
                  error,
                ),
              );

            throw new CheckoutFieldErrorsError(
              fieldErrors,
              error.message,
            );
          }

          case "OUT_OF_STOCK":
            toast.error(
              "Một sản phẩm không còn đủ tồn kho. Giỏ hàng vẫn được giữ nguyên để bạn điều chỉnh.",
            );
            return;

          case "OPTION_NOT_FOUND":
            toast.error(
              "Một tùy chọn không còn tồn tại. Vui lòng quay lại trang sản phẩm và chọn lại cấu hình.",
            );
            return;

          case "INVALID_PHONE_OPTION":
            toast.error(
              "Cấu hình trong giỏ không còn hợp lệ. Vui lòng cập nhật lại sản phẩm.",
            );
            return;

          default:
            toast.error(
              error.status >= 500
                ? "Máy chủ đang gặp sự cố. Giỏ hàng chưa bị xóa, vui lòng thử lại."
                : error.message,
            );
            return;
        }
      }

      toast.error(
        "Không thể kết nối tới máy chủ. Giỏ hàng chưa bị xóa.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <CheckoutForm
          submitting={submitting}
          displayedTotal={
            displayedTotal
          }
          disabled={
            items.length === 0
          }
          onSubmit={
            handleCheckoutSubmit
          }
        />

        <div className="lg:sticky lg:top-32">
          <OrderSummary
            items={items}
            displayedSubtotal={
              displayedSubtotal
            }
            displayedShippingFee={
              displayedShippingFee
            }
            displayedTotal={
              displayedTotal
            }
          />
        </div>
      </div>

      <ServiceBenefits
        items={serviceBenefits}
        columns={4}
      />

      {recommendations.length
        > 0 && (
        <PhoneSection
          title="Có thể bạn cũng quan tâm"
          subtitle="Một số sản phẩm nổi bật khác tại cửa hàng."
          phones={
            recommendations
          }
          viewAllHref="/phones"
          layout="carousel"
          badge="featured"
          background="surface"
        />
      )}

      <PromotionBanner
        {...BANNERS.checkout}
        aspectRatio="wide"
      />
    </div>
  );
}
