const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

if (!apiUrl) {
  throw new Error(
    "Thiếu biến môi trường NEXT_PUBLIC_API_URL. Hãy kiểm tra file .env.local.",
  );
}

export const env = {
  apiUrl,
  siteName: siteName?.trim() || "Phone Store",
} as const;