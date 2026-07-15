"use client";

import {
  useMemo,
  useState,
} from "react";
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
  STORE_SERVICE_BENEFITS,
} from "@/constants/service-benefits";

import {
  CartList,
} from "@/components/cart/CartList";
import {
  CartSummary,
} from "@/components/cart/CartSummary";
import {
  EmptyCart,
} from "@/components/cart/EmptyCart";
import {
  PromotionBanner,
  ServiceBenefits,
} from "@/components/common";
import {
  PhoneSection,
} from "@/components/phone";
import {
  Button,
  Modal,
  Skeleton,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";
import {
  selectCartDisplayedSubtotal,
  useCartStore,
} from "@/features/cart/cart.store";
import type {
  PhoneCardResponse,
} from "@/features/phone/phone.types";

export type CartPageClientProps = {
  featuredPhones: PhoneCardResponse[];
  bestSellerPhones: PhoneCardResponse[];
};

function CartPageLoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          {Array.from({
            length: 2,
          }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-52 w-full rounded-section"
            />
          ))}
        </div>

        <Skeleton className="h-96 w-full rounded-section" />
      </div>

      <Skeleton className="h-36 w-full rounded-section" />
    </div>
  );
}

function takeRecommendations(
  source: PhoneCardResponse[],
  excludedIds: Set<number>,
  limit: number,
): PhoneCardResponse[] {
  const result: PhoneCardResponse[] = [];

  for (const phone of source) {
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

export function CartPageClient({
  featuredPhones,
  bestSellerPhones,
}: CartPageClientProps) {
  const [
    clearModalOpen,
    setClearModalOpen,
  ] = useState(false);

  const items = useCartStore(
    (state) => state.items,
  );

  const hydrated = useCartStore(
    (state) => state.hydrated,
  );

  const updateQuantity =
    useCartStore(
      (state) =>
        state.updateQuantity,
    );

  const removeItem = useCartStore(
    (state) => state.removeItem,
  );

  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  const subtotal = useCartStore(
    selectCartDisplayedSubtotal,
  );

  const recommendations =
    useMemo(() => {
      const excludedIds = new Set(
        items.map(
          (item) =>
            item.phoneId,
        ),
      );

      const featured =
        takeRecommendations(
          featuredPhones,
          excludedIds,
          8,
        );

      const bestSellers =
        takeRecommendations(
          bestSellerPhones,
          excludedIds,
          8,
        );

      return {
        featured,
        bestSellers,
      };
    }, [
      bestSellerPhones,
      featuredPhones,
      items,
    ]);

  if (!hydrated) {
    return (
      <CartPageLoadingState />
    );
  }

  function handleRemove(
    key: string,
  ) {
    removeItem(key);

    toast.success(
      "Đã xóa sản phẩm khỏi giỏ hàng.",
    );
  }

  function handleClearCart() {
    clearCart();
    setClearModalOpen(false);

    toast.success(
      "Đã xóa toàn bộ giỏ hàng.",
    );
  }

  const empty =
    items.length === 0;

  return (
    <div className="space-y-6 lg:space-y-8">
      {empty ? (
        <EmptyCart />
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <CartList
            items={items}
            onQuantityChange={(
              key,
              quantity,
            ) => {
              updateQuantity(
                key,
                quantity,
              );
            }}
            onRemove={
              handleRemove
            }
          />

          <div className="lg:sticky lg:top-32">
            <CartSummary
              subtotal={subtotal}
              shippingFee={0}
              disabled={empty}
              onClearCart={() => {
                setClearModalOpen(
                  true,
                );
              }}
            />
          </div>
        </div>
      )}

      <ServiceBenefits
        items={STORE_SERVICE_BENEFITS}
        columns={4}
      />

      {recommendations.featured
        .length > 0 && (
        <PhoneSection
          title={
            empty
              ? "Sản phẩm nổi bật"
              : "Có thể bạn cũng thích"
          }
          subtitle="Một số điện thoại bạn có thể tiếp tục tham khảo."
          phones={
            recommendations
              .featured
          }
          viewAllHref="/phones"
          layout="carousel"
          badge="featured"
          background="surface"
        />
      )}

      {recommendations.bestSellers
        .length > 0 && (
        <PhoneSection
          title="Điện thoại bán chạy"
          subtitle="Các sản phẩm được nhiều người quan tâm."
          phones={
            recommendations
              .bestSellers
          }
          viewAllHref="/phones?sort=best-seller"
          layout="carousel"
          badge="best-seller"
          background="surface"
        />
      )}

      <PromotionBanner
        {...BANNERS.shipping}
        aspectRatio="wide"
      />

      <Modal
        open={clearModalOpen}
        title="Xóa toàn bộ giỏ hàng?"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setClearModalOpen(
                  false,
                );
              }}
            >
              Hủy
            </Button>

            <Button
              variant="danger"
              onClick={
                handleClearCart
              }
            >
              Xóa giỏ hàng
            </Button>
          </div>
        }
        onClose={() => {
          setClearModalOpen(
            false,
          );
        }}
      >
        <p className="text-sm leading-6 text-muted">
          Tất cả sản phẩm và cấu
          hình đã chọn sẽ bị xóa
          khỏi trình duyệt hiện tại.
        </p>
      </Modal>
    </div>
  );
}
