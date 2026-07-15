import type { PageResponse } from "@/types/common";

export type PhoneOptionType =
  | "COLOR"
  | "RAM"
  | "STORAGE";

export type PhoneCardResponse = {
  id: number;
  name: string;
  slug: string;
  model: string | null;
  brand: string;
  basePrice: number;
  originalPrice: number | null;
  thumbnailUrl: string;
  stockQuantity: number;
  soldCount: number;
  featured: boolean;
};

export type PhoneOptionResponse = {
  id: number;
  type: PhoneOptionType;
  value: string;
  extraPrice: number;
  imageUrl: string | null;
  displayOrder: number;
};

export type PhoneOptionGroupResponse = {
  type: PhoneOptionType;
  values: PhoneOptionResponse[];
};

export type PhoneDetailResponse = {
  id: number;
  name: string;
  slug: string;
  model: string | null;
  brand: string;
  basePrice: number;
  originalPrice: number | null;
  shortDescription: string | null;
  description: string | null;
  thumbnailUrl: string;
  images: string[];
  specifications: Record<string, string>;
  stockQuantity: number;
  soldCount: number;
  featured: boolean;
  optionGroups: PhoneOptionGroupResponse[];
  createdAt: string;
  updatedAt: string;
};

export type PhoneListParams = {
  keyword?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "soldCount" | "createdAt" | "name";
  sortDirection?: "asc" | "desc";
  page?: number;
  size?: number;
};

export type PhonePageResponse =
  PageResponse<PhoneCardResponse>;

export type SelectedPhoneOptions = Partial<
  Record<PhoneOptionType, PhoneOptionResponse>
>;