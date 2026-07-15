export function calculateDiscountPercent(
  basePrice: number,
  originalPrice: number | null | undefined,
): number | null {
  if (
    !originalPrice
    || originalPrice <= 0
    || basePrice < 0
    || basePrice >= originalPrice
  ) {
    return null;
  }

  const discount =
    ((originalPrice - basePrice)
      / originalPrice)
    * 100;

  return Math.round(discount);
}