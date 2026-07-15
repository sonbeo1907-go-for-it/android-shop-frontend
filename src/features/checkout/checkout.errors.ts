import type {
  CheckoutFieldErrors,
} from "@/features/checkout/checkout.types";

export class CheckoutFieldErrorsError
  extends Error {
  readonly fieldErrors:
    CheckoutFieldErrors;

  constructor(
    fieldErrors:
      CheckoutFieldErrors,
    message =
      "Thông tin thanh toán chưa hợp lệ.",
  ) {
    super(message);
    this.name =
      "CheckoutFieldErrorsError";
    this.fieldErrors =
      fieldErrors;
  }
}
