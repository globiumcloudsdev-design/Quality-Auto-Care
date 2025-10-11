"use client";
import React from "react";
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

  const words = title.split(' ');
  const firstWord = words[0];
  const lastWord = words.slice(1).join(' ');


  return (
    <section id="services" className="py-16 bg-background">
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

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const IconComponent = lucideIcons[service.iconName];
            if (!IconComponent) return null; // Agar icon ka naam match na ho to skip karein

            return (
              <Card
                key={i}
                className="theme-card hover:shadow-lg hover:-translate-y-1 transition"
              >
                <CardHeader>
                  <div className="flex justify-center">
                    <IconComponent className="w-8 h-8 text-theme-accent" />
                  </div>
                  <CardTitle className="mt-4 text-lg text-theme-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-theme-secondary">
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