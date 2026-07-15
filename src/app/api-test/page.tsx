import Link from "next/link";

import { getPhones } from "@/features/phone/phone.api";
import { formatCurrency } from "@/utils/currency";
import { getApiErrorMessage } from "@/utils/error-message";

export const dynamic = "force-dynamic";

export default async function ApiTestPage() {
  try {
    const result = await getPhones({
      page: 0,
      size: 4,
      sortBy: "createdAt",
      sortDirection: "desc",
    });

    return (
      <main className="app-container py-10">
        <section className="app-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            API Connection Test
          </p>

          <h1 className="mt-2 text-2xl font-bold">
            Kết nối Product API thành công
          </h1>

          <dl className="mt-6 grid gap-4 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-muted">
                Trang
              </dt>
              <dd className="font-semibold">
                {result.page + 1}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted">
                Kích thước
              </dt>
              <dd className="font-semibold">
                {result.size}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted">
                Tổng sản phẩm
              </dt>
              <dd className="font-semibold">
                {result.totalElements}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted">
                Tổng trang
              </dt>
              <dd className="font-semibold">
                {result.totalPages}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {result.content.map((phone) => (
            <article
              key={phone.id}
              className="app-surface overflow-hidden p-4"
            >
              <div className="aspect-square overflow-hidden rounded-card bg-white">
                {/* Dùng img tạm trong trang kiểm tra.
                    PhoneCard thật sẽ dùng next/image. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={phone.thumbnailUrl}
                  alt={phone.name}
                  className="size-full object-contain"
                />
              </div>

              <p className="mt-4 text-sm text-muted">
                {phone.brand}
              </p>

              <h2 className="mt-1 font-semibold">
                {phone.name}
              </h2>

              <p className="mt-3 font-bold text-primary">
                {formatCurrency(
                  phone.basePrice,
                )}
              </p>

              <Link
                href={`/phones/${phone.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Xem chi tiết
              </Link>
            </article>
          ))}
        </section>

        {result.content.length === 0 && (
          <section className="app-surface mt-6 p-8 text-center">
            <h2 className="text-xl font-bold">
              API hoạt động nhưng chưa có sản phẩm
            </h2>

            <p className="mt-2 text-muted">
              Hãy kiểm tra DataInitializer của Backend.
            </p>
          </section>
        )}
      </main>
    );
  } catch (error) {
    return (
      <main className="app-container py-10">
        <section className="rounded-section border border-danger/20 bg-red-50 p-6">
          <p className="font-semibold text-danger">
            Không thể kết nối Backend
          </p>

          <p className="mt-2 text-sm text-red-700">
            {getApiErrorMessage(error)}
          </p>

          <div className="mt-5 space-y-1 text-sm text-red-700">
            <p>
              Kiểm tra Spring Boot đang chạy ở port 8080.
            </p>
            <p>
              Kiểm tra NEXT_PUBLIC_API_URL trong .env.local.
            </p>
          </div>
        </section>
      </main>
    );
  }
}