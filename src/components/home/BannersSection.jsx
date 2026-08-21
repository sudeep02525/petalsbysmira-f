"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

export default function BannersSection() {
  const banners = [
    {
      title: "NEW\nARRIVALS",
      desc: "Explore the latest additions to our luxury collection.",
      btnText: "EXPLORE NOW",
      link: "/shop?newArrival=true",
      bgClass: "bg-[#f5f2ef]",
      img: "https://images.unsplash.com/photo-1599643477874-5c866f4b162c?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "SIGNATURE\nCOLLECTION",
      desc: "Timeless pieces that speak elegance and sophistication.",
      btnText: "DISCOVER NOW",
      link: "/shop?featured=true",
      bgClass: "bg-[#eae6df]",
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "LUXURY\nGIFT BOXES",
      desc: "Beautifully curated hampers for every special occasion.",
      btnText: "SHOP HAMPERS",
      link: "/shop?category=curated-hampers",
      bgClass: "bg-[#f1ede7]",
      img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="rounded-lg overflow-hidden shadow-2xl"
        >
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-[400px] md:h-[500px]"
          >
            {banners.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-full relative flex items-center bg-black">
                  <div className="absolute inset-0 z-0 opacity-60">
                    <img 
                      src={banner.img} 
                      alt={banner.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
                  
                  <div className="relative z-20 w-full md:w-2/3 px-8 md:px-16 lg:px-24">
                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest leading-tight whitespace-pre-line text-white mb-6">
                      {banner.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md leading-relaxed">
                      {banner.desc}
                    </p>
                    <Link href={banner.link} className="inline-block bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.2em] px-10 py-4 hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                      {banner.btnText}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
