"use client";
import React from "react";
import Image from "next/image";


import { getAboutData } from "@/Data/about-data";
import { AboutData } from "@/Types/about-types";

const About = () => {
  const data: AboutData = getAboutData();
  const { image, title, paragraphs } = data;

  const words = title.split(' ');
  const firstWord = words.slice(0, words.length - 2).join(' ');
  const lastTwoWords = words.slice(-2).join(' '); 

  return (
    <section id="about" className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative w-full h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={image}
            alt="About Quality Auto"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold theme-text-primary">
            {firstWord}{" "}
            <span className="text-[var(--theme-accent)]">
              {lastTwoWords}
            </span>
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="theme-text-secondary leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;