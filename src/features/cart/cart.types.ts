import type {
  PhoneOptionType,
} from "@/features/phone/phone.types";

export type CartOption = {
  id: number;
  type: PhoneOptionType;
  value: string;
  extraPrice: number;
};

export type CartItem = {
  key: string;
  phoneId: number;
  slug: string;
  phoneName: string;
  thumbnailUrl: string;
  basePrice: number;
  selectedOptions: CartOption[];
  displayedUnitPrice: number;
  quantity: number;
  stockQuantity: number;
};
