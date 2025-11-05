"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";


import { getFooterData } from "@/Data/footer-data";
import { FooterData } from "@/Types/footer-types";

const socialIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Phone: Phone,
  Mail: Mail,
  MapPin: MapPin,
};

const Footer = () => {
  const data: FooterData = getFooterData();
  const {
    logo,
    companyName,
    companyTagline,
    quickLinks,
    services,
    contactInfo,
    socialLinks,
    copyrightText,
  } = data;

  return (
    <footer className="bg-[#1a202c] text-white border-t border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-10">
        {/* Logo + About */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={logo}
              alt={companyName}
              width={50}
              height={50}
              className="rounded-md"
            />
            <span className="font-bold text-lg">{companyName}</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            {companyTagline}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:text-blue-400 text-gray-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((service, index) => (
              <li key={index} className="text-gray-400 hover:text-blue-400">
                {service.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> {contactInfo.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> {contactInfo.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> {contactInfo.email}
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((social, index) => {
              const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
              if (!IconComponent) return null; // Icon nahi mila to skip karein
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="theme-button-accent w-9 h-9 flex items-center justify-center rounded-full"
                >
                  <IconComponent size={18} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        {copyrightText}
      </div>
    </footer>
  );
};

export default Footer;