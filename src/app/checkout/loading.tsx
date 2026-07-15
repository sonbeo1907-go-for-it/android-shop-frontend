import {
  Container,
  Skeleton,
} from "@/components/ui";

export default function CheckoutLoading() {
  return (
    <Container className="space-y-6 py-6">
      <Skeleton className="h-5 w-64" />

      <div className="space-y-3">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="space-y-5">
          <Skeleton className="h-[32rem] w-full rounded-section" />
          <Skeleton className="h-52 w-full rounded-section" />
        </div>

        <Skeleton className="h-[34rem] w-full rounded-section" />
      </div>
    </Container>
  );
}
