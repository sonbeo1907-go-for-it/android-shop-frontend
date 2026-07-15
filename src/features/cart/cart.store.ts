"use client";

import {
  create,
} from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

import type {
  CartItem,
} from "@/features/cart/cart.types";

export const MAX_CART_ITEM_QUANTITY = 10;

function normalizeStockQuantity(
  stockQuantity: number,
): number {
  if (!Number.isFinite(stockQuantity)) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(stockQuantity),
  );
}

function clampQuantity(
  quantity: number,
  stockQuantity: number,
): number {
  const safeStock =
    normalizeStockQuantity(
      stockQuantity,
    );

  if (safeStock === 0) {
    return 0;
  }

  const safeQuantity =
    Number.isFinite(quantity)
      ? Math.floor(quantity)
      : 1;

  return Math.min(
    Math.max(1, safeQuantity),
    MAX_CART_ITEM_QUANTITY,
    safeStock,
  );
}

export type CartState = {
  items: CartItem[];
  hydrated: boolean;

  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (
    key: string,
    quantity: number,
  ) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  clearCart: () => void;
  setHydrated: (
    hydrated: boolean,
  ) => void;
};

export const useCartStore =
  create<CartState>()(
    persist(
      (set) => ({
        items: [],
        hydrated: false,

        addItem: (item) => {
          set((state) => {
            const safeStock =
              normalizeStockQuantity(
                item.stockQuantity,
              );

            const requestedQuantity =
              clampQuantity(
                item.quantity,
                safeStock,
              );

            if (
              safeStock === 0
              || requestedQuantity === 0
            ) {
              return state;
            }

            const existingItem =
              state.items.find(
                (currentItem) =>
                  currentItem.key
                  === item.key,
              );

            if (!existingItem) {
              return {
                items: [
                  ...state.items,
                  {
                    ...item,
                    quantity:
                      requestedQuantity,
                    stockQuantity:
                      safeStock,
                  },
                ],
              };
            }

            return {
              items: state.items.map(
                (currentItem) => {
                  if (
                    currentItem.key
                    !== item.key
                  ) {
                    return currentItem;
                  }

                  const mergedStock =
                    Math.min(
                      normalizeStockQuantity(
                        currentItem
                          .stockQuantity,
                      ),
                      safeStock,
                    );

                  return {
                    ...currentItem,
                    ...item,
                    stockQuantity:
                      mergedStock,
                    quantity:
                      clampQuantity(
                        currentItem.quantity
                        + requestedQuantity,
                        mergedStock,
                      ),
                  };
                },
              ),
            };
          });
        },

        removeItem: (key) => {
          set((state) => ({
            items:
              state.items.filter(
                (item) =>
                  item.key !== key,
              ),
          }));
        },

        updateQuantity: (
          key,
          quantity,
        ) => {
          set((state) => ({
            items:
              state.items.map(
                (item) => {
                  if (
                    item.key !== key
                  ) {
                    return item;
                  }

                  return {
                    ...item,
                    quantity:
                      clampQuantity(
                        quantity,
                        item.stockQuantity,
                      ),
                  };
                },
              ),
          }));
        },

        increment: (key) => {
          set((state) => ({
            items:
              state.items.map(
                (item) =>
                  item.key === key
                    ? {
                        ...item,
                        quantity:
                          clampQuantity(
                            item.quantity
                            + 1,
                            item
                              .stockQuantity,
                          ),
                      }
                    : item,
              ),
          }));
        },

        decrement: (key) => {
          set((state) => ({
            items:
              state.items
                .map((item) =>
                  item.key === key
                    ? {
                        ...item,
                        quantity:
                          item.quantity
                          - 1,
                      }
                    : item,
                )
                .filter(
                  (item) =>
                    item.quantity > 0,
                ),
          }));
        },

        clearCart: () => {
          set({
            items: [],
          });
        },

        setHydrated: (
          hydrated,
        ) => {
          set({
            hydrated,
          });
        },
      }),
      {
        name: "phone-store-cart",
        version: 1,
        storage:
          createJSONStorage(
            () => localStorage,
          ),
        partialize: (state) => ({
          items: state.items,
        }),
        onRehydrateStorage:
          () => (state) => {
            state?.setHydrated(true);
          },
      },
    ),
  );

export function selectCartTotalQuantity(
  state: CartState,
): number {
  return state.items.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );
}

export function selectCartDisplayedSubtotal(
  state: CartState,
): number {
  return state.items.reduce(
    (total, item) =>
      total
      + item.displayedUnitPrice
      * item.quantity,
    0,
  );
}

export function selectCartItemCount(
  state: CartState,
): number {
  return state.items.length;
}

export function selectCartIsEmpty(
  state: CartState,
): boolean {
  return state.items.length === 0;
}
