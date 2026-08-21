import Skeleton from "./Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="w-full relative group">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-cream)] mb-4">
        <Skeleton className="absolute inset-0 rounded-none" />
      </div>

      {/* Text Skeletons */}
      <div className="text-center px-2 flex flex-col items-center">
        {/* Title */}
        <Skeleton className="h-5 w-3/4 mb-2" />
        
        {/* Price */}
        <Skeleton className="h-4 w-1/2 mb-3" />
      </div>
    </div>
  );
}
