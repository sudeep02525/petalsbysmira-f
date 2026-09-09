import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton({ count = 5, className = "" }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pb-8 md:pb-0 scrollbar-hide ${className}`}>
      {skeletons.map((i) => (
        <div key={i} className="w-[85vw] md:w-auto min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center shrink-0">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
