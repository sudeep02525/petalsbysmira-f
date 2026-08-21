import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="group flex flex-col items-center flex-shrink-0 w-32 sm:w-40 md:w-48">
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[var(--color-gold)] transition-colors duration-300 p-1 mb-3 bg-white shadow-sm">
        <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-cream)]">
          {category.image ? (
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-[var(--color-primary-dark)] text-center px-2">
              {category.name}
            </div>
          )}
        </div>
      </div>
      <h3 className="font-serif text-sm sm:text-base font-semibold text-[var(--color-primary-dark)] group-hover:text-[var(--color-gold)] transition-colors text-center">
        {category.name}
      </h3>
    </Link>
  );
}
