const vndFormatter = new Intl.NumberFormat(
  "vi-VN",
  {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  },
);

export function formatCurrency(
  value: number,
): string {
  if (!Number.isFinite(value)) {
    return "0 ₫";
  }

  return vndFormatter.format(value);
}