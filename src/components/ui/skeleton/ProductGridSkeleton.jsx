import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton({ count = 4, className = "" }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ${className}`}>
      {skeletons.map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
