"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  data: {
    title: string;
    description: string;
    discountText: string;
    discountCode: string;
    buttonText: string;
  };
}

const DiscountModal: React.FC<DiscountModalProps> = ({
  isOpen,
  onClose,
  onClaim,
  data,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl max-w-lg w-full p-8 animate-bouncePop shadow-2xl border border-blue-200 relative">
        {/* ✖ Close button */}
        <button
          onClick={() => {
            onClose();
            document.body.style.overflow = "auto";
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 🎉 Modal content */}
        <div className="text-center mt-2">
          {/* Header */}
          <div className="mb-6">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold">{data.title}</h3>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-800 mb-4 text-lg leading-relaxed">
              {data.description}
            </p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-5xl font-extrabold text-blue-700">
                {data.discountText}
              </span>
            </div>
          </div>

          {/* Discount Code */}
          <div className="bg-white p-5 rounded-xl mb-6 border-2 border-dashed border-blue-400 shadow-inner">
            <p className="text-sm text-gray-700 mb-2 font-medium">
              Use promo code:
            </p>
            <p className="text-2xl font-mono font-bold text-blue-700 bg-gray-50 py-3 px-4 rounded-lg shadow-sm border">
              {data.discountCode}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            {/* Claim Button */}
            <button
              onClick={() => {
                localStorage.setItem("promo_claimed", "true");
                localStorage.setItem("claimed_promo_code", data.discountCode);
                onClaim();
                document.body.style.overflow = "auto";
                router.push("/booking");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {data.buttonText}
            </button>

            {/* Remind Me Later */}
            <button
              onClick={() => {
                localStorage.setItem("promo_closed", "true");
                onClose();
                document.body.style.overflow = "auto";
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
