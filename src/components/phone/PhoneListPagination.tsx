"use client";

import {
  Pagination,
} from "@/components/ui";
import {
  usePhoneFilters,
} from "@/hooks/usePhoneFilters";

export type PhoneListPaginationProps = {
  page: number;
  totalPages: number;
};

export function PhoneListPagination({
  page,
  totalPages,
}: PhoneListPaginationProps) {
  const {
    setPage,
  } = usePhoneFilters();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
