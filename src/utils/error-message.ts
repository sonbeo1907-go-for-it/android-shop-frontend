import { ApiClientError } from "@/lib/api-client";

const DEFAULT_ERROR_MESSAGE =
  "Đã xảy ra lỗi. Vui lòng thử lại.";

export function getApiErrorMessage(
  error: unknown,
): string {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (
    error instanceof Error
    && error.message.trim()
  ) {
    return error.message;
  }

  if (typeof error === "string") {
    return error.trim()
      || DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
}