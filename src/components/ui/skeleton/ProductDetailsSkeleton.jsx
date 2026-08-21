import Skeleton from "./Skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Images Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-[3/4] w-full bg-[var(--color-cream)] relative overflow-hidden">
              <Skeleton className="absolute inset-0 rounded-none" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-[var(--color-cream)] relative overflow-hidden border border-gray-100">
                  <Skeleton className="absolute inset-0 rounded-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8">
            <Skeleton className="h-4 w-24 mb-4" /> {/* Brand/Category */}
            <Skeleton className="h-10 w-3/4 mb-4" /> {/* Title */}
            <Skeleton className="h-6 w-32 mb-8" /> {/* Price */}

            <div className="space-y-3 mb-10">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Quantity Selector Skeleton */}
            <div className="mb-8">
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-12 w-32" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            
            <Skeleton className="h-px w-full bg-gray-100 mb-8" />

            {/* Delivery Details Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
