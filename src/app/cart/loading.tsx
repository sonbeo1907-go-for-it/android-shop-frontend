import {
  Container,
  Skeleton,
} from "@/components/ui";

export default function CartLoading() {
  return (
    <Container className="space-y-6 py-6">
      <Skeleton className="h-5 w-48" />

      <div className="space-y-3">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          <Skeleton className="h-52 w-full rounded-section" />
          <Skeleton className="h-52 w-full rounded-section" />
        </div>

        <Skeleton className="h-96 w-full rounded-section" />
      </div>
    </Container>
  );
}
