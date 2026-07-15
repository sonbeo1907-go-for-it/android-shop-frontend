import { apiClient } from "@/lib/api-client";

import type {
  PhoneCardResponse,
  PhoneDetailResponse,
  PhoneListParams,
  PhonePageResponse,
} from "./phone.types";

export async function getPhones(
  params: PhoneListParams = {},
): Promise<PhonePageResponse> {
  return apiClient.get<PhonePageResponse>(
    "/phones",
    {
      query: params,
      cache: "no-store",
    },
  );
}

export async function getPhoneBySlug(
  slug: string,
): Promise<PhoneDetailResponse> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    throw new Error(
      "Slug điện thoại không được để trống.",
    );
  }

  return apiClient.get<PhoneDetailResponse>(
    `/phones/slug/${encodeURIComponent(
      normalizedSlug,
    )}`,
    {
      cache: "no-store",
    },
  );
}

export async function getFeaturedPhones(
  limit = 8,
): Promise<PhoneCardResponse[]> {
  return apiClient.get<PhoneCardResponse[]>(
    "/phones/featured",
    {
      query: {
        limit,
      },
      cache: "no-store",
    },
  );
}

export async function getBestSellerPhones(
  limit = 8,
): Promise<PhoneCardResponse[]> {
  return apiClient.get<PhoneCardResponse[]>(
    "/phones/best-sellers",
    {
      query: {
        limit,
      },
      cache: "no-store",
    },
  );
}