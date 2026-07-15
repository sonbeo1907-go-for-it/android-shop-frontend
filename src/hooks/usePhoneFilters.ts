"use client";

import {
  useCallback,
  useMemo,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type {
  PhoneFilterValue,
} from "@/components/phone/PhoneFilters";
import {
  isSortValue,
  sortValueToApiParams,
  type SortValue,
} from "@/features/phone/phone-sort";

export type PhoneListQueryState = PhoneFilterValue & {
  sort: SortValue;
  page: number;
};

const DEFAULT_SORT: SortValue = "newest";

function parseOptionalNumber(
  value: string | null,
): number | undefined {
  if (value === null || value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : undefined;
}

function parsePage(
  value: string | null,
): number {
  const parsed = Number(value);

  if (
    !Number.isInteger(parsed)
    || parsed < 0
  ) {
    return 0;
  }

  return parsed;
}

function parseSort(
  value: string | null,
): SortValue {
  return isSortValue(value)
    ? value
    : DEFAULT_SORT;
}
export function usePhoneFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<PhoneListQueryState>(
    () => ({
      keyword:
        searchParams.get("keyword")?.trim()
        || undefined,
      brand:
        searchParams.get("brand")?.trim()
        || undefined,
      minPrice: parseOptionalNumber(
        searchParams.get("minPrice"),
      ),
      maxPrice: parseOptionalNumber(
        searchParams.get("maxPrice"),
      ),
      sort: parseSort(
        searchParams.get("sort"),
      ),
      page: parsePage(
        searchParams.get("page"),
      ),
    }),
    [searchParams],
  );

  const updateSearchParams = useCallback(
    (
      updates: Record<
        string,
        string | number | undefined | null
      >,
      options: {
        resetPage?: boolean;
        replace?: boolean;
      } = {},
    ) => {
      const nextParams = new URLSearchParams(
        searchParams.toString(),
      );

      Object.entries(updates).forEach(
        ([key, value]) => {
          if (
            value === undefined
            || value === null
            || value === ""
          ) {
            nextParams.delete(key);
          } else {
            nextParams.set(
              key,
              String(value),
            );
          }
        },
      );

      if (options.resetPage) {
        nextParams.delete("page");
      }

      const query = nextParams.toString();
      const href = query
        ? `${pathname}?${query}`
        : pathname;

      if (options.replace) {
        router.replace(href, {
          scroll: false,
        });
      } else {
        router.push(href, {
          scroll: false,
        });
      }
    },
    [
      pathname,
      router,
      searchParams,
    ],
  );

  const setFilters = useCallback(
    (value: PhoneFilterValue) => {
      updateSearchParams(
        {
          keyword:
            value.keyword?.trim()
            || undefined,
          brand:
            value.brand?.trim()
            || undefined,
          minPrice: value.minPrice,
          maxPrice: value.maxPrice,
        },
        {
          resetPage: true,
        },
      );
    },
    [updateSearchParams],
  );

  const setSort = useCallback(
    (sort: SortValue) => {
      updateSearchParams(
        {
          sort:
            sort === DEFAULT_SORT
              ? undefined
              : sort,
        },
        {
          resetPage: true,
        },
      );
    },
    [updateSearchParams],
  );

  const setPage = useCallback(
    (page: number) => {
      updateSearchParams({
        page:
          page <= 0
            ? undefined
            : page,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [updateSearchParams],
  );

  const removeFilter = useCallback(
    (key: string) => {
      const updates: Record<
        string,
        undefined
      > = {};

      switch (key) {
        case "keyword":
          updates.keyword = undefined;
          break;

        case "brand":
          updates.brand = undefined;
          break;

        case "price":
          updates.minPrice = undefined;
          updates.maxPrice = undefined;
          break;

        default:
          return;
      }

      updateSearchParams(
        updates,
        {
          resetPage: true,
        },
      );
    },
    [updateSearchParams],
  );

  const clearAll = useCallback(() => {
    router.push(pathname, {
      scroll: false,
    });
  }, [pathname, router]);

  const apiSort = useMemo(
    () => sortValueToApiParams(
      state.sort,
    ),
    [state.sort],
  );

  return {
    state,
    apiSort,
    setFilters,
    setSort,
    setPage,
    removeFilter,
    clearAll,
  };
}
