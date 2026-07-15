export type BuildVietQrUrlParams = {
  bankId: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  transferContent: string;
};

function normalizeTransferContent(
  value: string,
): string {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(
      /[^a-zA-Z0-9\s-]/g,
      "",
    )
    .trim()
    .slice(0, 25);
}

function normalizeAccountName(
  value: string,
): string {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(
      /[^a-zA-Z0-9\s]/g,
      "",
    )
    .trim()
    .toUpperCase()
    .slice(0, 50);
}

export function buildVietQrUrl({
  bankId,
  accountNumber,
  accountName,
  amount,
  transferContent,
}: BuildVietQrUrlParams): string {
  const normalizedBankId =
    bankId.trim();

  const normalizedAccount =
    accountNumber.replace(
      /\s+/g,
      "",
    );

  const normalizedAmount =
    Math.max(
      0,
      Math.round(amount),
    );

  const query =
    new URLSearchParams({
      amount:
        String(normalizedAmount),

      addInfo:
        normalizeTransferContent(
          transferContent,
        ),

      accountName:
        normalizeAccountName(
          accountName,
        ),
    });

  return (
    "https://img.vietqr.io/image/"
    + `${encodeURIComponent(
      normalizedBankId,
    )}-`
    + `${encodeURIComponent(
      normalizedAccount,
    )}-compact2.png`
    + `?${query.toString()}`
  );
}