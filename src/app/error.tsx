"use client";

import {
  useEffect,
} from "react";

import {
  PromotionBanner,
} from "@/components/common";
import {
  Container,
  ErrorState,
} from "@/components/ui";
import {
  BANNERS,
} from "@/constants/banners";

export type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="space-y-6 py-8">
      <ErrorState
        title="Trang không thể tải hoàn chỉnh"
        message="Đã xảy ra lỗi ngoài dự kiến. Dữ liệu của giỏ hàng và biểu mẫu trên trình duyệt chưa bị tự động xóa."
        retryLabel="Thử tải lại"
        onRetry={reset}
      />

      <PromotionBanner
        {...BANNERS.promotion}
        aspectRatio="wide"
      />
    </Container>
  );
}
