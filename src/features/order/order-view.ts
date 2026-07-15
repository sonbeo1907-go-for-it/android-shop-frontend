import type {
  OrderItemResponse,
  OrderResponse,
} from "@/features/order/order.types";
import type {
  PaymentMethod,
} from "@/features/checkout/checkout.types";

type UnknownRecord = Record<string, unknown>;

function asRecord(
  value: unknown,
): UnknownRecord {
  if (
    value
    && typeof value === "object"
    && !Array.isArray(value)
  ) {
    return value as UnknownRecord;
  }

  return {};
}

function getString(
  record: UnknownRecord,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const value = record[key];

    if (
      typeof value === "string"
      && value.trim() !== ""
    ) {
      return value;
    }
  }

  return fallback;
}

function getOptionalString(
  record: UnknownRecord,
  keys: string[],
): string | undefined {
  const value = getString(
    record,
    keys,
  );

  return value || undefined;
}

function getNumber(
  record: UnknownRecord,
  keys: string[],
  fallback = 0,
): number {
  for (const key of keys) {
    const value = record[key];

    if (
      typeof value === "number"
      && Number.isFinite(value)
    ) {
      return value;
    }

    if (
      typeof value === "string"
      && value.trim() !== ""
    ) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return fallback;
}

function getArray(
  record: UnknownRecord,
  keys: string[],
): unknown[] {
  for (const key of keys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function normalizeOptionLabel(
  option: unknown,
): string | null {
  if (typeof option === "string") {
    return option;
  }

  const record = asRecord(option);
  const type = getString(
    record,
    ["type", "optionType"],
  );
  const value = getString(
    record,
    [
      "value",
      "optionValue",
      "label",
      "name",
    ],
  );

  if (!type && !value) {
    return null;
  }

  return type
    ? `${type}: ${value}`
    : value;
}

export type NormalizedOrderItem = {
  id: string;
  phoneId?: number;
  phoneName: string;
  slug?: string;
  thumbnailUrl?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  optionLabels: string[];
};

export type NormalizedOrder = {
  orderCode: string;
  receiverName: string;
  phoneNumber: string;
  email?: string;
  address: string;
  note?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  orderStatus: string;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  createdAt?: string;
  items: NormalizedOrderItem[];
};

export function normalizeOrderItem(
  item: OrderItemResponse,
  index = 0,
): NormalizedOrderItem {
  const record = asRecord(item);

  const quantity = Math.max(
    1,
    Math.floor(
      getNumber(
        record,
        ["quantity"],
        1,
      ),
    ),
  );

  const unitPrice = getNumber(
    record,
    [
      "unitPrice",
      "price",
      "snapshotUnitPrice",
      "finalUnitPrice",
    ],
  );

  const explicitLineTotal =
    getNumber(
      record,
      [
        "lineTotal",
        "totalPrice",
        "subtotal",
        "totalAmount",
      ],
      -1,
    );

  const rawOptions = getArray(
    record,
    [
      "selectedOptions",
      "options",
      "optionValues",
      "selectedOptionValues",
    ],
  );

  const phoneIdValue = getNumber(
    record,
    ["phoneId", "productId"],
    -1,
  );

  return {
    id:
      getString(
        record,
        ["id", "orderItemId"],
      )
      || `${phoneIdValue}-${index}`,
    phoneId:
      phoneIdValue >= 0
        ? phoneIdValue
        : undefined,
    phoneName: getString(
      record,
      [
        "phoneName",
        "productName",
        "name",
      ],
      "Điện thoại",
    ),
    slug: getOptionalString(
      record,
      ["slug", "phoneSlug"],
    ),
    thumbnailUrl:
      getOptionalString(
        record,
        [
          "thumbnailUrl",
          "imageUrl",
          "phoneImageUrl",
        ],
      ),
    quantity,
    unitPrice,
    lineTotal:
      explicitLineTotal >= 0
        ? explicitLineTotal
        : unitPrice * quantity,
    optionLabels: rawOptions
      .map(normalizeOptionLabel)
      .filter(
        (
          value,
        ): value is string =>
          Boolean(value),
      ),
  };
}

export function normalizeOrder(
  order: OrderResponse,
): NormalizedOrder {
  const record = asRecord(order);

  const rawItems = getArray(
    record,
    ["items", "orderItems"],
  );

  const paymentMethod =
    getString(
      record,
      ["paymentMethod"],
      "COD",
    ) as PaymentMethod;

  return {
    orderCode: getString(
      record,
      ["orderCode", "code"],
    ),
    receiverName: getString(
      record,
      [
        "receiverName",
        "customerName",
      ],
    ),
    phoneNumber: getString(
      record,
      [
        "phoneNumber",
        "receiverPhone",
      ],
    ),
    email: getOptionalString(
      record,
      ["email"],
    ),
    address: getString(
      record,
      [
        "address",
        "shippingAddress",
      ],
    ),
    note: getOptionalString(
      record,
      ["note"],
    ),
    paymentMethod,
    paymentStatus: getString(
      record,
      ["paymentStatus"],
      "UNPAID",
    ),
    orderStatus: getString(
      record,
      ["orderStatus", "status"],
      "PENDING",
    ),
    subtotal: getNumber(
      record,
      ["subtotal"],
    ),
    shippingFee: getNumber(
      record,
      ["shippingFee"],
    ),
    totalAmount: getNumber(
      record,
      [
        "totalAmount",
        "total",
      ],
    ),
    createdAt: getOptionalString(
      record,
      ["createdAt"],
    ),
    items: rawItems.map(
      (item, index) =>
        normalizeOrderItem(
          item as OrderItemResponse,
          index,
        ),
    ),
  };
}

export function getOrderCode(
  order: OrderResponse,
): string {
  return normalizeOrder(order).orderCode;
}

export function formatOrderDate(
  value?: string,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "vi-VN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}
