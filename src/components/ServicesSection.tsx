"use client";
import React, { useEffect, useRef } from "react";
import { Car, Sparkles, ShieldCheck, Droplet, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { getServicesData } from "@/Data/services-data";
import { ServicesData } from "@/Types/services-types";


const lucideIcons: { [key: string]: LucideIcon } = {
  Car: Car,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Droplet: Droplet,
};

const ServicesSection = () => {
  const data: ServicesData = getServicesData();
  const { title, subtitle, services } = data;

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('revealed');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".scroll-reveal");

    // Check if section is already in view on load
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        elements?.forEach((el) => el.classList.add("revealed"));
        const cards = sectionRef.current.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('revealed');
          }, index * 200);
        });
      }
    }

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback: add revealed class after 0.5 second if observer doesn't trigger
    const timeout = setTimeout(() => {
      elements?.forEach((el) => {
        if (!el.classList.contains("revealed")) {
          el.classList.add("revealed");
        }
      });
      const cards = sectionRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card, index) => {
        if (!card.classList.contains("revealed")) {
          setTimeout(() => {
            card.classList.add('revealed');
          }, index * 200);
        }
      });
    }, 500);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearTimeout(timeout);
    };
  }, []);

  const words = title.split(' ');
  const firstWord = words[0];
  const lastWord = words.slice(1).join(' ');


  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold theme-text-primary mb-4">
          <span className="scroll-reveal stagger-1">{firstWord}</span>{" "}
          <span className="text-[var(--theme-accent)] scroll-reveal stagger-2">
            {lastWord}
          </span>
        </h2>
        <p className="mt-3 text-theme-secondary scroll-reveal stagger-3 mb-12">
          {subtitle}
        </p>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const IconComponent = lucideIcons[service.iconName];
            if (!IconComponent) return null; // Agar icon ka naam match na ho to skip karein

            return (
              <Card
                key={i}
                className="service-card theme-card hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group scroll-reveal"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-[var(--theme-accent)]/10 rounded-full group-hover:bg-[var(--theme-accent)]/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-theme-accent group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <CardTitle className="mt-4 text-lg text-theme-primary group-hover:text-[var(--theme-accent)] transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-theme-secondary group-hover:text-theme-primary transition-colors duration-300">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
