import type {
  PhoneListParams,
} from "@/features/phone/phone.types";

export const PHONE_SORT_VALUES = [
  "newest",
  "price-asc",
  "price-desc",
  "best-seller",
  "name-asc",
  "name-desc",
] as const;

export type SortValue =
  (typeof PHONE_SORT_VALUES)[number];

export type PhoneSortParams = Pick<
  PhoneListParams,
  "sortBy" | "sortDirection"
>;

export function isSortValue(
  value: string | null | undefined,
): value is SortValue {
  if (!value) {
    return false;
  }

  return PHONE_SORT_VALUES.some(
    (sortValue) => sortValue === value,
  );
}

export function sortValueToApiParams(
  value: SortValue,
): PhoneSortParams {
  switch (value) {
    case "price-asc":
      return {
        sortBy: "price",
        sortDirection: "asc",
      };

    case "price-desc":
      return {
        sortBy: "price",
        sortDirection: "desc",
      };

    case "best-seller":
      return {
        sortBy: "soldCount",
        sortDirection: "desc",
      };

    case "name-asc":
      return {
        sortBy: "name",
        sortDirection: "asc",
      };

    case "name-desc":
      return {
        sortBy: "name",
        sortDirection: "desc",
      };

    case "newest":
    default:
      return {
        sortBy: "createdAt",
        sortDirection: "desc",
      };
  }
}