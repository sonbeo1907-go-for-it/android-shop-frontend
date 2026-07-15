import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/layout";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Phone Store",
    template: "%s | Phone Store",
  },
  description:
    "Cửa hàng smartphone trực tuyến.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="vi">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />

          <main className="flex-1">
            {children}
          </main>

          <SiteFooter />
        </div>

        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}