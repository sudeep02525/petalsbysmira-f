"use client";

import { Gift, ShieldCheck, Truck, Award, Headset } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TrustSection() {
  const features = [
    { icon: <Gift className="h-7 w-7 text-[#b58c49]" />, title: "PREMIUM QUALITY", desc: "Only the finest, always." },
    { icon: <ShieldCheck className="h-7 w-7 text-[#b58c49]" />, title: "LUXURY PACKAGING", desc: "Exquisite wrapping for every gift." },
    { icon: <Truck className="h-7 w-7 text-[#b58c49]" />, title: "PAN INDIA DELIVERY", desc: "Fast, reliable & safe delivery." },
    { icon: <Award className="h-7 w-7 text-[#b58c49]" />, title: "TRUSTED BY 1000+", desc: "Happy customers across India." },
    { icon: <Headset className="h-7 w-7 text-[#b58c49]" />, title: "PERSONAL ASSISTANCE", desc: "We're here to help you gift better." },
  ];

  return (
    <section className="bg-black py-10 border-y border-[#333]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-white text-xs font-semibold tracking-wider mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
