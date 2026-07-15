export type PaymentMethod =
  | "COD"
  | "QR_TRANSFER";

export type CheckoutFormValues = {
  receiverName: string;
  phoneNumber: string;
  email: string;
  address: string;
  note: string;
  paymentMethod: PaymentMethod;
};

export type CheckoutFieldErrors =
  Partial<
    Record<
      keyof CheckoutFormValues,
      string
    >
  >;
