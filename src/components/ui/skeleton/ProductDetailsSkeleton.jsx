import Skeleton from "./Skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-[var(--color-black)] min-h-screen pt-32 pb-24 font-sans text-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Gallery Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-square sm:aspect-[4/5] w-full bg-[#111] border border-white/10 relative overflow-hidden">
              <Skeleton className="absolute inset-0 rounded-none" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-[#111] border border-white/10 relative overflow-hidden">
                  <Skeleton className="absolute inset-0 rounded-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-6 space-y-6">
            <div>
              <Skeleton className="h-3 w-32 mb-3" />
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-6" />
            </div>

            <div className="p-6 bg-[#0d0d0d] border border-white/10 space-y-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-44" />
            </div>

            <div className="space-y-3 pt-4">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
            </div>

            <div className="pt-6">
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
