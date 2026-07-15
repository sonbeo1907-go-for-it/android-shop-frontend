import type { PhoneOptionType } from "@/features/phone/phone.types";

export type PaymentMethod =
  | "COD"
  | "QR_TRANSFER";

export type PaymentStatus =
  | "UNPAID"
  | "PENDING_CONFIRMATION"
  | "PAID";

export type OrderStatus =
  | "PENDING"
  | "CANCELLED";

export type CreateOrderItemRequest = {
  phoneId: number;
  optionIds: number[];
  quantity: number;
};

export type CreateOrderRequest = {
  receiverName: string;
  phoneNumber: string;
  email?: string;
  address: string;
  note?: string;
  paymentMethod: PaymentMethod;
  items: CreateOrderItemRequest[];
};

export type OrderItemOptionResponse = {
  optionId: number;
  type: PhoneOptionType;
  value: string;
  extraPrice: number;
};

export type OrderItemResponse = {
  phoneId: number;
  phoneName: string;
  imageUrl: string;
  basePrice: number;
  selectedOptions: OrderItemOptionResponse[];
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};

export type OrderResponse = {
  orderCode: string;
  receiverName: string;
  phoneNumber: string;
  email: string | null;
  address: string;
  note: string | null;
  items: OrderItemResponse[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
};