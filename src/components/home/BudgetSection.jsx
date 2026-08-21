import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";

export default function BudgetSection() {
  const budgets = [
    { title: "UNDER\n₹999", link: "/shop?maxPrice=999" },
    { title: "₹999 -\n₹1,999", link: "/shop?minPrice=999&maxPrice=1999" },
    { title: "₹1,999 -\n₹4,999", link: "/shop?minPrice=1999&maxPrice=4999" },
    { title: "₹5,000+", link: "/shop?minPrice=5000" },
  ];

  return (
    <div className="bg-[#fcfaf7] border border-gray-200 rounded-lg p-8 sm:p-10 shadow-sm h-full flex flex-col justify-between">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl tracking-widest text-[#2c2c2c] mb-2 uppercase">Gifts by Budget</h2>
        <p className="text-gray-600 text-sm">Find the perfect gift in your budget.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {budgets.map((budget, idx) => (
          <Link 
            key={idx} 
            href={budget.link}
            className="flex flex-col items-center justify-between p-4 rounded-lg bg-white border border-[#eaeaea] shadow-sm hover:shadow-md transition-shadow h-32"
          >
            <Gift className="h-6 w-6 text-[#b58c49] mb-2" />
            <h3 className="font-serif text-xs font-bold tracking-wider text-center text-gray-900 whitespace-pre-line leading-tight">
              {budget.title}
            </h3>
            <span className="text-[9px] font-bold text-gray-800 tracking-wider flex items-center gap-1 uppercase mt-auto">
              Shop Now <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
