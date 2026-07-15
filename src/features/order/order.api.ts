import { apiClient } from "@/lib/api-client";

import type {
  CreateOrderRequest,
  OrderResponse,
} from "./order.types";

export async function createOrder(
  request: CreateOrderRequest,
): Promise<OrderResponse> {
  return apiClient.post<
    OrderResponse,
    CreateOrderRequest
  >(
    "/orders",
    request,
    {
      cache: "no-store",
    },
  );
}

export async function lookupOrder(
  orderCode: string,
  phoneNumber: string,
): Promise<OrderResponse> {
  return apiClient.get<OrderResponse>(
    "/orders/lookup",
    {
      query: {
        orderCode: orderCode.trim(),
        phoneNumber: phoneNumber.trim(),
      },
      cache: "no-store",
    },
  );
}