"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { getHeroData } from "@/Data/hero-data";
import { HeroData } from "@/Types/hero-types";

const Hero = () => {
  // Data ko import kiya aur type-cast kiya
  const data: HeroData = getHeroData();
  const { image, title, subtitle, primaryButton, secondaryButton } = data;

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trustIndicatorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      // Reveal animations on scroll
      const elements = heroRef.current.querySelectorAll('.scroll-reveal');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative bg-background overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background Image - Fixed position */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Hero Car Detailing"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 theme-bg-accent opacity-20 rounded-full blur-3xl animate-pulse float"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 theme-bg-secondary opacity-20 rounded-full blur-2xl animate-pulse delay-1000 float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 theme-bg-primary opacity-10 rounded-full blur-3xl animate-pulse delay-500 float"></div>
      </div>

      {/* Enhanced Content */}
      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center text-white">
        {/* Professional Badge */}
        <div className="inline-flex items-center px-6 py-2 theme-bg-surface text-white theme-border border rounded-full text-sm font-medium theme-text-primary mb-8 backdrop-blur-sm bg-white/10 scroll-reveal">
          <svg className="w-4 h-4 mr-2 theme-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Professional Car Detailing Service
        </div>

        {/* Main Heading with Animation */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold drop-shadow-2xl leading-tight mb-6 scroll-reveal">
          <span className="block mb-2">{title.split(' ').slice(0, 2).join(' ')}</span>
          <span className="block theme-accent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent gradient-text">
            {title.split(' ').slice(2).join(' ')}
          </span>
        </h1>

        {/* Enhanced Subtitle */}
        <p className="mt-8 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 leading-relaxed font-light drop-shadow-lg scroll-reveal stagger-1">
          {subtitle}
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center scroll-reveal stagger-2">
          <Link
            href={primaryButton.href}
            className="group theme-button-accent px-10 py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl flex items-center justify-center gap-3 hover-lift"
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
            </svg>
            {primaryButton.name}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <Link
            href={secondaryButton.href}
            className="group theme-button-secondary px-10 py-4 rounded-xl font-bold text-lg backdrop-blur-sm bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 hover-lift"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {secondaryButton.name}
          </Link>
        </div>

        {/* Trust Indicators */}
        <div ref={trustIndicatorsRef} className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-80 scroll-reveal stagger-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors smooth-transition">
            <svg className="w-5 h-5 theme-accent pulse-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Licensed & Insured
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors smooth-transition">
            <svg className="w-5 h-5 theme-accent pulse-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Satisfaction Guaranteed
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors smooth-transition">
            <svg className="w-5 h-5 theme-accent pulse-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Eco-Friendly Products
          </div>
        </div>

        {/* Scroll Down Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce scroll-reveal stagger-4">
          <svg className="w-6 h-6 text-white opacity-60 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div> */}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
          opacity: 0;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
          opacity: 0;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Hero;
