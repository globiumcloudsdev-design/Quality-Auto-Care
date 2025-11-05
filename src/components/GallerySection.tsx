"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { getGalleryData } from "@/Data/gallery-data";
import { GalleryData } from "@/Types/gallery-types";

const GallerySection = () => {
  const data: GalleryData = getGalleryData();
  const { title, subtitle, images, buttonText } = data;

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const galleryItems = entry.target.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('revealed');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const words = title.split(' ');
  const firstWord = words[0];
  const lastWord = words.slice(1).join(' ');

  return (
    <section ref={sectionRef} id="gallery" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold theme-text-primary scroll-reveal mb-4">
          {firstWord}{" "}
          <span className="text-[var(--theme-accent)]">
            {lastWord}
          </span>
        </h2>
        <p className="mt-3 text-theme-secondary scroll-reveal stagger-1 mb-12 max-w-3xl mx-auto">
          {subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item relative aspect-video rounded-2xl overflow-hidden theme-border border group cursor-pointer scroll-reveal hover-lift"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </div>
          ))}
        </div>

        <div className="mt-10 scroll-reveal stagger-2">
          <Button className="theme-button-accent px-6 py-2 rounded-full hover-lift">
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
