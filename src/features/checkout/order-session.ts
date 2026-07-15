import type {
  OrderResponse,
} from "@/features/order/order.types";

const LAST_ORDER_KEY =
  "phone-store-last-order";

export function saveTemporaryOrder(
  order: OrderResponse,
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      LAST_ORDER_KEY,
      JSON.stringify(order),
    );
  } catch {
    /*
     * Không chặn luồng đặt hàng nếu
     * sessionStorage bị vô hiệu hóa.
     */
  }
}

export function readTemporaryOrder():
  OrderResponse | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw =
      window.sessionStorage.getItem(
        LAST_ORDER_KEY,
      );

    if (!raw) {
      return null;
    }

    return JSON.parse(
      raw,
    ) as OrderResponse;
  } catch {
    return null;
  }
}

export function clearTemporaryOrder():
  void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(
      LAST_ORDER_KEY,
    );
  } catch {
    // Không cần xử lý thêm.
  }
}
