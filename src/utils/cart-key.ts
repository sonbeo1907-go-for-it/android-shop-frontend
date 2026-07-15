export function createCartItemKey(
  phoneId: number,
  optionIds: number[],
): string {
  if (
    !Number.isInteger(phoneId)
    || phoneId <= 0
  ) {
    throw new Error(
      "phoneId không hợp lệ.",
    );
  }

  const normalizedOptionIds = [
    ...optionIds,
  ]
    .filter(
      (optionId) =>
        Number.isInteger(optionId)
        && optionId > 0,
    )
    .sort((first, second) =>
      first - second
    );

  if (
    normalizedOptionIds.length
    !== optionIds.length
  ) {
    throw new Error(
      "Danh sách optionId không hợp lệ.",
    );
  }

  return [
    phoneId,
    ...normalizedOptionIds,
  ].join("-");
}