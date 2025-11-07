






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

// ✅ Define TypeScript interfaces
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

  // ✅ On mount, check if user already closed or claimed the modal
  useEffect(() => {
    const claimed = localStorage.getItem("promo_claimed") === "true";
    const closed = localStorage.getItem("promo_closed") === "true";
    if (!claimed && !closed) {
      setIsModalOpen(false); // Start hidden until scroll
    }
  }, []);

  // ✅ Fetch promo codes from API
  useEffect(() => {
    const fetchPromo = async () => {
      // ✅ Check if user has already claimed a discount
      const hasClaimed = localStorage.getItem("promo_claimed") === "true";
      if (hasClaimed) return; // Skip fetching if already claimed

      try {
        const res = await fetch(
          // "https://gc-web-app.vercel.app/api/promo-codes/agent/690b5b3d70d70cbde2a59f88",
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/promo-codes/agent/${process.env.NEXT_PUBLIC_AGENT_ID}`,
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

  // ✅ Handle scroll to trigger modal once
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollY = window.scrollY;

      const claimed = localStorage.getItem("promo_claimed") === "true";
      const closed = localStorage.getItem("promo_closed") === "true";

      // ✅ Only show modal if not claimed or closed
      if (scrollY > heroHeight && !isModalOpen && promoData && !claimed && !closed) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen, promoData]);

  // ✅ When user closes modal manually
  const handleCloseModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("promo_closed", "true");
  };

  // ✅ When user claims discount
  const handleClaimDiscount = () => {
    setIsModalOpen(false);
    localStorage.setItem("promo_claimed", "true");
  };

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
          onClose={handleCloseModal}
          onClaim={handleClaimDiscount}
          data={promoData}
        />
      )}
    </>
  );
};

export default Index;
