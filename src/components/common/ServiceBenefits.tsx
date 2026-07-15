import { ServiceBenefitItem, type ServiceBenefitItemProps } from "@/components/common/ServiceBenefitItem";
import { cn } from "@/utils/cn";

export type ServiceBenefitsProps = {
  items: ServiceBenefitItemProps[];
  columns?: 2 | 3 | 4;
  className?: string;
};

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ServiceBenefits({
  items,
  columns = 4,
  className,
}: ServiceBenefitsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        columnClasses[columns],
        className,
      )}
    >
      {items.map((item, index) => (
        <ServiceBenefitItem
          key={`${item.title}-${index}`}
          {...item}
        />
      ))}
    </div>
  );
}
