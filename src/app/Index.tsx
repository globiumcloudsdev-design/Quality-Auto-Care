// "use client";

// import About from '@/components/About'
// import ContactSection from '@/components/ContactSection'
// import DiscountModal from '@/components/DiscountModal'
// import Footer from '@/components/Footer'
// import GallerySection from '@/components/GallerySection'
// import Hero from '@/components/HeroSection'
// import Navbar from '@/components/Navbar'
// import ServicesSection from '@/components/ServicesSection'
// import React, { useEffect, useRef, useState } from 'react'

// const Index = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const heroRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (!heroRef.current) return;

//             const heroHeight = heroRef.current.offsetHeight;
//             const scrollY = window.scrollY;

//             if (scrollY > heroHeight && !isModalOpen) {
//                 setIsModalOpen(true);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [isModalOpen]);

//     return (
//         <>
//             <Navbar />
//             <div ref={heroRef}>
//                 <Hero />
//             </div>
//             <About />
//             <ServicesSection />
//             <GallerySection />
//             <ContactSection />
//             <Footer />
//             <DiscountModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 data={promoData}
//             />
//         </>
//     )
// }

// export default Index



// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import About from "@/components/About";
// import ContactSection from "@/components/ContactSection";
// import DiscountModal from "@/components/DiscountModal";
// import Footer from "@/components/Footer";
// import GallerySection from "@/components/GallerySection";
// import Hero from "@/components/HeroSection";
// import Navbar from "@/components/Navbar";
// import ServicesSection from "@/components/ServicesSection";

// const Index = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [promoData, setPromoData] = useState<any>(null);
//   const heroRef = useRef<HTMLDivElement>(null);

//   // 🔹 Fetch promo codes from API
// useEffect(() => {
//   const fetchPromo = async () => {
//     try {
//       const res = await fetch(
//         "https://gc-web-app.vercel.app/api/promo-codes/agent/690b5b3d70d70cbde2a59f88",
//         { cache: "no-store" }
//       );

//       if (!res.ok) throw new Error(`Failed to fetch promo codes: ${res.status}`);

//       const result = await res.json();
//       console.log("promo code json", result);

//       // ✅ Use `result.data`, not `result`
//       const promos = result.data;

//       if (!Array.isArray(promos) || promos.length === 0) return;

//       // ✅ Filter only active promos (you can check validFrom if needed)
//       const activePromos = promos.filter((promo: any) => promo.isActive);

//       if (activePromos.length === 0) return;

//       // ✅ Sort by createdAt (latest first)
//       activePromos.sort(
//         (a: any, b: any) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );

//       const promo = activePromos[0];

//       if (promo) {
//         setPromoData({
//           title: "🎉 Special Offer!",
//           description: `Get ${promo.discountPercentage}% OFF on all our services!`,
//           discountText: `${promo.discountPercentage}% OFF`,
//           discountCode: promo.promoCode,
//           buttonText: "Claim Discount",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching promo:", error);
//     }
//   };

//   fetchPromo();
// }, []);


//   console.log('Promo Data', promoData);
  

//   // 🔹 Handle scroll to trigger modal
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!heroRef.current) return;

//       const heroHeight = heroRef.current.offsetHeight;
//       const scrollY = window.scrollY;

//       if (scrollY > heroHeight && !isModalOpen && promoData) {
//         setIsModalOpen(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isModalOpen, promoData]);

//   return (
//     <>
//       <Navbar />
//       <div ref={heroRef}>
//         <Hero />
//       </div>
//       <About />
//       <ServicesSection />
//       <GallerySection />
//       <ContactSection />
//       <Footer />

//       {/* 🔹 Show modal only if promoData is available */}
//       {promoData && (
//         <DiscountModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Index;



"use client";

import React, { useEffect, useRef, useState } from "react";
import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import DiscountModal from "@/components/DiscountModal";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Hero from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";

// ✅ Define proper TypeScript interfaces
interface PromoCode {
  promoCode: string;
  discountPercentage: number;
  isActive: boolean;
  createdAt: string;
}

interface PromoData {
  title: string;
  description: string;
  discountText: string;
  discountCode: string;
  buttonText: string;
}

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoData, setPromoData] = useState<PromoData | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // 🔹 Fetch promo codes from API
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const res = await fetch(
          "https://gc-web-app.vercel.app/api/promo-codes/agent/690b5b3d70d70cbde2a59f88",
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error(`Failed to fetch promo codes: ${res.status}`);

        const result = await res.json();
        console.log("Promo code JSON:", result);

        const promos: PromoCode[] = Array.isArray(result.data) ? result.data : [];

        if (promos.length === 0) return;

        // ✅ Filter only active promos
        const activePromos = promos.filter((promo) => promo.isActive);

        if (activePromos.length === 0) return;

        // ✅ Sort by date (latest first)
        activePromos.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const promo = activePromos[0];
        if (promo) {
          setPromoData({
            title: "🎉 Special Offer!",
            description: `Get ${promo.discountPercentage}% OFF on all our services!`,
            discountText: `${promo.discountPercentage}% OFF`,
            discountCode: promo.promoCode,
            buttonText: "Claim Discount",
          });
        }
      } catch (error) {
        console.error("Error fetching promo:", error);
      }
    };

    fetchPromo();
  }, []);

  // 🔹 Trigger modal after scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollY = window.scrollY;

      if (scrollY > heroHeight && !isModalOpen && promoData) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen, promoData]);

  return (
    <>
      <Navbar />
      <div ref={heroRef}>
        <Hero />
      </div>
      <About />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
      <Footer />

      {/* ✅ Modal only when promoData exists */}
      {promoData && (
        <DiscountModal
          isOpen={isModalOpen}
           onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Index;
