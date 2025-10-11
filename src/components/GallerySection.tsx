"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { getGalleryData } from "@/Data/gallery-data";
import { GalleryData } from "@/Types/gallery-types";

const GallerySection = () => {
  const data: GalleryData = getGalleryData();
  const { title, subtitle, images, buttonText } = data;

  const words = title.split(' ');
  const firstWord = words[0];
  const lastWord = words.slice(1).join(' '); 

  return (
    <section id="gallery" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold theme-text-primary">
          {firstWord}{" "}
          <span className="text-[var(--theme-accent)]">
            {lastWord}
          </span>
        </h2>
        <p className="mt-3 text-theme-secondary">
          {subtitle}
        </p>

        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-video rounded-2xl overflow-hidden theme-border border"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition"
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button className="theme-button-accent px-6 py-2 rounded-full">
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;