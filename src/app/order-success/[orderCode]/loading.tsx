import {
  Container,
  Skeleton,
} from "@/components/ui";

export default function OrderSuccessLoading() {
  return (
    <Container className="space-y-6 py-6">
      <Skeleton className="h-5 w-64" />
      <Skeleton className="h-72 w-full rounded-section" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[36rem] w-full rounded-section" />
        <Skeleton className="h-[36rem] w-full rounded-section" />
      </div>
    </Container>
  );
}
