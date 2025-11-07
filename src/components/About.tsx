"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

import { getAboutData } from "@/Data/about-data";
import { AboutData } from "@/Types/about-types";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const data: AboutData = getAboutData();
  const { image, title, paragraphs } = data;

  const words = title.split(' ');
  const firstWord = words.slice(0, words.length - 2).join(' ');
  const lastTwoWords = words.slice(-2).join(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up, .scroll-reveal-scale, .scroll-reveal-rotate"
    );

    // Check if section is already in view on load
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        elements?.forEach((el) => el.classList.add("revealed"));
      }
    }

    elements?.forEach((el) => observer.observe(el));

    // Fallback: add revealed class after 0.5 second if observer doesn't trigger
    const timeout = setTimeout(() => {
      elements?.forEach((el) => {
        if (!el.classList.contains("revealed")) {
          el.classList.add("revealed");
        }
      });
    }, 500);

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
      clearTimeout(timeout);
    };
  }, []);

  // Mouse parallax effect for image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 20;
        const deltaY = (e.clientY - centerY) / 20;
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="about" className="bg-background py-12 sm:py-16 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-theme-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-theme-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
        {/* Left Image with enhanced animations */}
        <div
          ref={imageRef}
          className="relative w-full h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl scroll-reveal-left hover-lift group"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <Image
            src={image}
            alt="About Quality Auto"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-theme-primary/20 via-transparent to-theme-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-theme-accent/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Right Content with enhanced animations */}
        <div className="scroll-reveal-right">
          <h2 className="text-3xl lg:text-4xl font-bold theme-text-primary mb-8">
            <span className="scroll-reveal-up stagger-1 inline-block">{firstWord}</span>{" "}
            <span className="text-[var(--theme-accent)] scroll-reveal-scale stagger-2 inline-block gradient-text">
              {lastTwoWords}
            </span>
          </h2>

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => {
              const staggerClass = `stagger-${(index % 6) + 3}`;
              return (
                <p
                  key={index}
                  className={`theme-text-secondary leading-relaxed scroll-reveal-up ${staggerClass} transform hover:translate-x-2 transition-transform duration-300`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Call to action button with animation
          <div className="mt-8 scroll-reveal-up stagger-6">
            <button className="theme-button-accent px-8 py-3 rounded-lg font-semibold hover-lift pulse-accent">
              Learn More About Us
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
