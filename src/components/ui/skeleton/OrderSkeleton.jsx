import Skeleton from "./Skeleton";

export default function OrderSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 mb-4 shadow-sm flex flex-col md:flex-row gap-6">
      {/* Product Image Skeleton */}
      <div className="w-24 h-32 bg-[var(--color-cream)] relative overflow-hidden flex-shrink-0">
        <Skeleton className="absolute inset-0 rounded-none" />
      </div>

      {/* Order Details Skeleton */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="text-right">
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-6 w-24 rounded-full" /> {/* Badge */}
          </div>
        </div>
        
        {/* Action Button Skeleton */}
        <div className="mt-auto flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
