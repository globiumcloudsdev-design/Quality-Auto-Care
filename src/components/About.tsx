"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";


import { getAboutData } from "@/Data/about-data";
import { AboutData } from "@/Types/about-types";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right");

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

  return (
    <section id="about" className="bg-background py-12 sm:py-16" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left Image */}
        <div className="relative w-full h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg scroll-reveal-left hover-lift">
          <Image
            src={image}
            alt="About Quality Auto"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="scroll-reveal-right">
          <h2 className="text-3xl font-bold theme-text-primary mb-6">
            <span className="scroll-reveal stagger-1">{firstWord}</span>{" "}
            <span className="text-[var(--theme-accent)] scroll-reveal stagger-2">
              {lastTwoWords}
            </span>
          </h2>
          {paragraphs.map((paragraph, index) => {
            const staggerClass = `stagger-${(index % 6) + 3}`;
            return (
              <p key={index} className={`theme-text-secondary leading-relaxed mb-6 scroll-reveal ${staggerClass}`}>
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;