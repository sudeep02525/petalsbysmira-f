import React from "react";
import { cn } from "../../utils/utils";

export default function PriceDisplay({ price, discountPrice, className, size = "md" }) {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const strikeSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-2 font-sans", className)}>
      <span className={cn("font-bold text-[var(--color-primary-dark)]", sizes[size])}>
        {formatPrice(discountPrice || price)}
      </span>
      
      {discountPrice && discountPrice < price && (
        <span className={cn("line-through text-gray-400 font-medium", strikeSizes[size])}>
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
