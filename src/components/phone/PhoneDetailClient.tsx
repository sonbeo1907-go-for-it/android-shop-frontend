"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  toast,
} from "sonner";

import {
  AddToCartPanel,
} from "./AddToCartPanel";
import {
  PhoneGallery,
} from "./PhoneGallery";
import {
  PhoneInfo,
} from "./PhoneInfo";
import {
  PhoneOptionSelector,
} from "./PhoneOptionSelector";
import type {
  CartOption,
  CartItem,
} from "@/features/cart/cart.types";
import {
  useCartStore,
} from "@/features/cart/cart.store";
import type {
  PhoneDetailResponse,
  PhoneOptionType,
  SelectedPhoneOptions,
} from "@/features/phone/phone.types";
import {
  createCartItemKey,
} from "@/utils/cart-key";

export type PhoneDetailClientProps = {
  phone: PhoneDetailResponse;
};

const REQUIRED_OPTION_TYPES: PhoneOptionType[] = [
  "COLOR",
  "RAM",
  "STORAGE",
];

type OptionErrors = Partial<
  Record<PhoneOptionType, string>
>;

function calculateDisplayedUnitPrice(
  basePrice: number,
  selectedOptions: SelectedPhoneOptions,
): number {
  return Object.values(
    selectedOptions,
  ).reduce(
    (total, option) =>
      total + (option?.extraPrice ?? 0),
    basePrice,
  );
}

function validateSelectedOptions(
  selectedOptions: SelectedPhoneOptions,
): OptionErrors {
  return REQUIRED_OPTION_TYPES.reduce<OptionErrors>(
    (errors, type) => {
      if (!selectedOptions[type]) {
        errors[type] =
          "Vui lòng chọn một tùy chọn.";
      }

      return errors;
    },
    {},
  );
}

export function PhoneDetailClient({
  phone,
}: PhoneDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore(
    (state) => state.addItem,
  );

  const [
    selectedOptions,
    setSelectedOptions,
  ] = useState<SelectedPhoneOptions>({});

  const [
    optionErrors,
    setOptionErrors,
  ] = useState<OptionErrors>({});

  const [quantity, setQuantity] =
    useState(1);

  const displayedUnitPrice = useMemo(
    () =>
      calculateDisplayedUnitPrice(
        phone.basePrice,
        selectedOptions,
      ),
    [
      phone.basePrice,
      selectedOptions,
    ],
  );

  const selectedColorImage =
    selectedOptions.COLOR?.imageUrl
    ?? null;

  function handleOptionsChange(
    nextOptions: SelectedPhoneOptions,
  ) {
    setSelectedOptions(nextOptions);

    setOptionErrors(
      (currentErrors) => {
        const nextErrors = {
          ...currentErrors,
        };

        REQUIRED_OPTION_TYPES.forEach(
          (type) => {
            if (nextOptions[type]) {
              delete nextErrors[type];
            }
          },
        );

        return nextErrors;
      },
    );
  }

  function handleAddToCart() {
    if (phone.stockQuantity <= 0) {
      toast.error(
        "Sản phẩm hiện đã hết hàng.",
      );
      return;
    }

    const errors =
      validateSelectedOptions(
        selectedOptions,
      );

    if (
      Object.keys(errors).length > 0
    ) {
      setOptionErrors(errors);

      toast.error(
        "Vui lòng chọn đầy đủ màu sắc, RAM và bộ nhớ.",
      );
      return;
    }

    const selectedOptionList =
      REQUIRED_OPTION_TYPES.map(
        (type) => selectedOptions[type],
      ).filter(
        (
          option,
        ): option is NonNullable<
          typeof option
        > => Boolean(option),
      );

    const optionIds =
      selectedOptionList
        .map((option) => option.id)
        .sort(
          (first, second) =>
            first - second,
        );

    const cartOptions: CartOption[] =
      selectedOptionList.map(
        (option) => ({
          id: option.id,
          type: option.type,
          value: option.value,
          extraPrice:
            option.extraPrice,
        }),
      );

    const cartItem: CartItem = {
      key: createCartItemKey(
        phone.id,
        optionIds,
      ),
      phoneId: phone.id,
      slug: phone.slug,
      phoneName: phone.name,
      thumbnailUrl:
        selectedColorImage
        || phone.thumbnailUrl,
      basePrice: phone.basePrice,
      selectedOptions: cartOptions,
      displayedUnitPrice,
      quantity,
      stockQuantity:
        phone.stockQuantity,
    };

    addItem(cartItem);

    toast.success(
      "Đã thêm sản phẩm vào giỏ hàng.",
      {
        action: {
          label: "Xem giỏ hàng",
          onClick: () => {
            router.push("/cart");
          },
        },
      },
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,.95fr)]">
      <PhoneGallery
        images={phone.images}
        thumbnailUrl={
          phone.thumbnailUrl
        }
        alt={phone.name}
        colorImage={
          selectedColorImage
        }
      />

      <div className="space-y-5">
        <PhoneInfo phone={phone} />

        <section className="rounded-section border border-border bg-surface p-5 shadow-card sm:p-6">
          <PhoneOptionSelector
            groups={
              phone.optionGroups
            }
            value={selectedOptions}
            errors={optionErrors}
            onChange={
              handleOptionsChange
            }
          />
        </section>

        <AddToCartPanel
          basePrice={
            phone.basePrice
          }
          selectedOptions={
            selectedOptions
          }
          quantity={quantity}
          stockQuantity={
            phone.stockQuantity
          }
          disabled={
            phone.stockQuantity <= 0
          }
          onQuantityChange={
            setQuantity
          }
          onAddToCart={
            handleAddToCart
          }
        />
      </div>
    </div>
  );
}
