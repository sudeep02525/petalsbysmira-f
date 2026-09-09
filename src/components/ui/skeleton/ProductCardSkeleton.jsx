import Skeleton from "./Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-sm overflow-hidden p-2 sm:p-3 pb-5 sm:pb-6 text-center">
      
      {/* Image Skeleton */}
      <div className="relative aspect-square overflow-hidden rounded-sm mb-5 w-full">
        <Skeleton className="absolute inset-0 rounded-sm" />
      </div>

      {/* Text Skeletons */}
      <div className="flex flex-col flex-grow items-center justify-between px-1 w-full">
        <div className="mb-4 sm:mb-5 w-full flex flex-col items-center">
          {/* Title */}
          <Skeleton className="h-4 w-3/4 mb-2" />
          
          {/* Subtitle */}
          <Skeleton className="h-3 w-1/2 mb-1" />
        </div>
        
        {/* Button Skeleton */}
        <Skeleton className="mt-auto h-8 w-[130px] rounded-sm" />
      </div>
    </div>
  );
}
