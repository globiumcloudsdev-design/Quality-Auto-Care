"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    description: string;
    discountText: string;
    discountCode: string;
    buttonText: string;
  } | null;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose, data }) => {
  const router = useRouter();
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 30) {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isModalOpen || !data) return null;

  return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fadeIn">
     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl max-w-lg w-full p-8 animate-scaleIn shadow-2xl border border-blue-200">
        <div className="text-center">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                document.body.style.overflow = 'auto'; // Restore scroll
                onClose();
              }}
              className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-200"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Header */}
          <div className="mb-6">
            <div className="theme-bg-primary text-white px-6 py-4 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold">{data.title}</h3>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-800 mb-4 text-lg leading-relaxed">
              {data.description}
            </p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-5xl font-extrabold text-primary">
                {data.discountText}
              </span>
            </div>
          </div>

          {/* Discount Code */}
          <div className="bg-primary-600 from-gray-100 to-gray-200 p-5 rounded-xl mb-6 border-2 border-dashed border-blue-400 shadow-inner">
            <p className="text-sm text-gray-700 mb-2 font-medium">Use promo code:</p>
            <p className="text-2xl font-mono font-bold text-blue-700 bg-white py-3 px-4 rounded-lg shadow-sm border">
              {data.discountCode}
            </p>
          </div>

          {/* Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={async () => {
                try {
                  await fetch('/api/discount-claim', { method: 'POST' });
                  localStorage.setItem("discount_claimed", "true");
                  sessionStorage.setItem("auto_apply_promo", data.discountCode);
                  setHasClaimed(true);
                  setIsModalOpen(false);
                  document.body.style.overflow = 'auto'; // Restore scroll
                  onClose();
                  router.push('/booking');
                } catch (error) {
                  console.error('Error claiming discount:', error);
                  // Fallback to localStorage only
                  localStorage.setItem("discount_claimed", "true");
                  sessionStorage.setItem("auto_apply_promo", data.discountCode);
                  setHasClaimed(true);
                  setIsModalOpen(false);
                  document.body.style.overflow = 'auto'; // Restore scroll
                  onClose();
                  router.push('/booking');
                }
              }}
              className="theme-button-primary font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {data.buttonText}
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                document.body.style.overflow = 'auto'; // Restore scroll
                onClose();
              }}
              className="bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors duration-300"
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
