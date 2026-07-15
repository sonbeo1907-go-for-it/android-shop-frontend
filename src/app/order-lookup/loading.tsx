import {
  Container,
  OrderDetailSkeleton,
  PhoneGridSkeleton,
  Skeleton,
} from "@/components/ui";

export default function OrderLookupLoading() {
  return (
    <Container className="space-y-6 py-6">
      <Skeleton className="h-5 w-56" />

      <Skeleton className="aspect-[16/4] w-full rounded-section" />

      <div className="rounded-section border border-border bg-surface p-6">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-20 w-full rounded-card" />
          <Skeleton className="h-20 w-full rounded-card" />
          <Skeleton className="h-12 w-full rounded-card sm:col-span-2" />
        </div>
      </div>

      <PhoneGridSkeleton count={4} />
    </Container>
  );
}
