import Skeleton from "./Skeleton";

export default function CategorySkeleton({ className = "" }) {
  return (
    <div className={`relative w-full group overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[var(--color-cream)]">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="bg-white/80 backdrop-blur-sm px-6 py-3 w-3/4 max-w-[200px] flex items-center justify-center">
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    </div>
  );
}
