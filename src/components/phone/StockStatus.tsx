import { Badge } from "@/components/ui";
import { cn } from "@/utils/cn";

export type StockStatusProps = {
  stockQuantity: number;
  showQuantity?: boolean;
  className?: string;
};

export function StockStatus({
  stockQuantity,
  showQuantity = false,
  className,
}: StockStatusProps) {
  const safeStock = Number.isFinite(stockQuantity)
    ? Math.max(0, Math.floor(stockQuantity))
    : 0;

  if (safeStock <= 0) {
    return (
      <Badge variant="danger" className={className}>
        Hết hàng
      </Badge>
    );
  }

  if (safeStock <= 5) {
    return (
      <Badge variant="warning" className={className}>
        {showQuantity ? `Chỉ còn ${safeStock}` : "Sắp hết hàng"}
      </Badge>
    );
  }

  return (
    <Badge variant="success" className={cn(className)}>
      {showQuantity ? `Còn ${safeStock} sản phẩm` : "Còn hàng"}
    </Badge>
  );
}
