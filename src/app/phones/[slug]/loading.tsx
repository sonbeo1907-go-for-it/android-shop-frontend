import {
  Container,
  OrderDetailSkeleton,
  PhoneGridSkeleton,
  Skeleton,
} from "@/components/ui";

export default function PhoneDetailLoading() {
  return (
    <Container className="space-y-6 py-6">
      <Skeleton className="h-5 w-72" />

      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-full max-w-2xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-section" />

        <OrderDetailSkeleton />
      </div>

      <PhoneGridSkeleton count={4} />
    </Container>
  );
}
