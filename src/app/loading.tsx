import {
  PhoneGridSkeleton,
  Skeleton,
} from "@/components/ui";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Skeleton className="h-11 w-36" />

          <Skeleton className="hidden h-12 min-w-0 flex-1 rounded-button md:block" />

          <Skeleton
            rounded="full"
            className="ml-auto size-10"
          />

          <Skeleton
            rounded="full"
            className="size-10"
          />
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)_19rem]">
          <Skeleton className="hidden h-96 rounded-section lg:block" />

          <Skeleton className="aspect-[16/7] w-full rounded-section lg:h-96 lg:aspect-auto" />

          <div className="hidden gap-4 lg:grid lg:grid-rows-2">
            <Skeleton className="h-full rounded-section" />
            <Skeleton className="h-full rounded-section" />
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <PhoneGridSkeleton count={8} />
      </main>
    </div>
  );
}
