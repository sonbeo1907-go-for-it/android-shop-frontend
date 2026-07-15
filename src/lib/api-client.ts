import { env } from "@/lib/env";
import type {
  ApiErrorResponse,
  FieldErrors,
} from "@/types/api";

type QueryPrimitive =
  | string
  | number
  | boolean
  | null
  | undefined;

export type QueryValue =
  | QueryPrimitive
  | QueryPrimitive[];

export type QueryParams =
  Record<string, QueryValue>;

type ApiRequestOptions =
  Omit<RequestInit, "body" | "method"> & {
    query?: QueryParams;
    body?: unknown;
  };

type UnknownRecord = Record<string, unknown>;

const API_BASE_URL =
  env.apiUrl.replace(/\/+$/, "");

function isRecord(
  value: unknown,
): value is UnknownRecord {
  return (
    typeof value === "object"
    && value !== null
    && !Array.isArray(value)
  );
}

function getString(
  value: unknown,
): string | undefined {
  return typeof value === "string"
    ? value
    : undefined;
}

function appendQueryValue(
  searchParams: URLSearchParams,
  key: string,
  value: QueryPrimitive,
): void {
  if (
    value === null
    || value === undefined
    || value === ""
  ) {
    return;
  }

  searchParams.append(key, String(value));
}

function createUrl(
  path: string,
  query?: QueryParams,
): string {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  const url = new URL(
    `${API_BASE_URL}${normalizedPath}`,
  );

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(
    ([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          appendQueryValue(
            url.searchParams,
            key,
            item,
          );
        });

        return;
      }

      appendQueryValue(
        url.searchParams,
        key,
        value,
      );
    },
  );

  return url.toString();
}

async function parseResponseBody(
  response: Response,
): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  const contentType =
    response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return null;
    }
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function normalizeFieldErrors(
  value: unknown,
): FieldErrors {
  if (isRecord(value)) {
    return Object.entries(value).reduce<FieldErrors>(
      (result, [field, message]) => {
        if (typeof message === "string") {
          result[field] = message;
        }

        return result;
      },
      {},
    );
  }

  /*
   * Hỗ trợ thêm trường hợp Backend trả:
   *
   * [
   *   {
   *     "field": "receiverName",
   *     "message": "Không được để trống"
   *   }
   * ]
   */
  if (Array.isArray(value)) {
    return value.reduce<FieldErrors>(
      (result, item) => {
        if (!isRecord(item)) {
          return result;
        }

        const field = getString(item.field);
        const message = getString(item.message);

        if (field && message) {
          result[field] = message;
        }

        return result;
      },
      {},
    );
  }

  return {};
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly path?: string;
  readonly fieldErrors: FieldErrors;
  readonly payload?: unknown;

  constructor(
    error: ApiErrorResponse,
    payload?: unknown,
  ) {
    super(error.message);

    this.name = "ApiClientError";
    this.status = error.status;
    this.code = error.code;
    this.path = error.path;
    this.fieldErrors = error.fieldErrors;
    this.payload = payload;
  }
}

function createApiClientError(
  response: Response,
  payload: unknown,
): ApiClientError {
  const objectPayload = isRecord(payload)
    ? payload
    : {};

  const code =
    getString(objectPayload.code)
    ?? `HTTP_${response.status}`;

  const message =
    getString(objectPayload.message)
    ?? response.statusText
    ?? "Đã xảy ra lỗi khi gọi API.";

  const path =
    getString(objectPayload.path);

  const fieldErrors = normalizeFieldErrors(
    objectPayload.fieldErrors
    ?? objectPayload.errors,
  );

  return new ApiClientError(
    {
      status: response.status,
      code,
      message,
      path,
      fieldErrors,
    },
    payload,
  );
}

async function request<T>(
  method: "GET" | "POST",
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    query,
    body,
    headers: customHeaders,
    ...requestInit
  } = options;

  const headers = new Headers(customHeaders);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  let requestBody: BodyInit | undefined;

  if (body !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set(
        "Content-Type",
        "application/json",
      );
    }

    requestBody = JSON.stringify(body);
  }

  const response = await fetch(
    createUrl(path, query),
    {
      ...requestInit,
      method,
      headers,
      body: requestBody,
    },
  );

  const payload =
    await parseResponseBody(response);

  if (!response.ok) {
    throw createApiClientError(
      response,
      payload,
    );
  }

  return payload as T;
}

type GetOptions =
  Omit<ApiRequestOptions, "body">;

type PostOptions =
  Omit<ApiRequestOptions, "body">;

export const apiClient = {
  get<T>(
    path: string,
    options?: GetOptions,
  ): Promise<T> {
    return request<T>(
      "GET",
      path,
      options,
    );
  },

  post<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options?: PostOptions,
  ): Promise<TResponse> {
    return request<TResponse>(
      "POST",
      path,
      {
        ...options,
        body,
      },
    );
  },
};