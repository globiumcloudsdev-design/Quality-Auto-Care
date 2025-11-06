
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Promo {
  isActive: boolean;
  createdAt: string;
  discountPercentage: number;
  promoCode: string;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoData, setPromoData] = useState<{
    title: string;
    description: string;
    discountText: string;
    discountCode: string;
    buttonText: string;
  } | null>(null);

  // ✅ Fetch the latest active promo directly from the API
useEffect(() => {
  const fetchPromo = async () => {
    try {
      const res = await fetch(
        "https://gc-web-app.vercel.app/api/promo-codes/agent/690b5b3d70d70cbde2a59f88",
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error(`Failed to fetch promo codes: ${res.status}`);

      const result = await res.json();
      console.log("promo code json", result);

      // ✅ Use `result.data`, not `result`
      const promos = result.data;

      if (!Array.isArray(promos) || promos.length === 0) return;

      const activePromos = promos.filter((promo: Promo) => promo.isActive);

      if (activePromos.length === 0) return;

      // ✅ Sort by createdAt (latest first)
      activePromos.sort(
        (a: Promo, b: Promo) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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


  // ✅ Show modal after user scrolls 30%
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 30) {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"; // Prevent background scroll
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Trigger stagger animations after modal opens
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => el.classList.add('revealed'));
      }, 100); // Small delay to ensure DOM is ready
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  if (!isModalOpen || !promoData) return null;

  return (
<div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
<div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl max-w-lg w-full p-8 animate-bouncePop shadow-2xl border border-blue-200">
        <div className="text-center">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                document.body.style.overflow = "auto";
                onClose();
              }}
              className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-200"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Header */}
          <div className="mb-6 stagger-1 scroll-reveal">
            <div className="theme-bg-primary text-white px-6 py-4 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold">{promoData.title}</h3>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 stagger-2 scroll-reveal">
            <p className="text-gray-800 mb-4 text-lg leading-relaxed">
              {promoData.description}
            </p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-5xl font-extrabold text-primary">
                {promoData.discountText}
              </span>
            </div>
          </div>

          {/* Discount Code */}
          <div className="bg-primary-600 from-gray-100 to-gray-200 p-5 rounded-xl mb-6 border-2 border-dashed border-blue-400 shadow-inner stagger-3 scroll-reveal">
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Use promo code:
            </p>
            <p className="text-2xl font-mono font-bold text-blue-700 bg-white py-3 px-4 rounded-lg shadow-sm border">
              {promoData.discountCode}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 stagger-4 scroll-reveal">
            <button
              onClick={async () => {
                try {
                  await fetch("/api/discount-claim", { method: "POST" });
                } catch (error) {
                  console.error("Error claiming discount:", error);
                } finally {
                  localStorage.setItem("discount_claimed", "true");
                  sessionStorage.setItem("auto_apply_promo", promoData.discountCode);
                  setHasClaimed(true);
                  setIsModalOpen(false);
                  document.body.style.overflow = "auto";
                  onClose();
                  router.push("/booking");
                }
              }}
              className="theme-button-primary font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover-lift"
            >
              {promoData.buttonText}
            </button>

            <button
              onClick={() => {
                setIsModalOpen(false);
                document.body.style.overflow = "auto";
                onClose();
              }}
              className="bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors duration-300 hover-lift"
            >
              Remind Me Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
