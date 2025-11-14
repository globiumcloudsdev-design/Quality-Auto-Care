"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // 👈 yeh import add kiya
import { getNavbarData } from "@/Data/navbar-data";
import { NavbarData } from "@/Types/navbar-types";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // ✅ current route path
  const pathname = usePathname();

  const data: NavbarData = getNavbarData();
  const { companyInfo, navigationLinks, bookNowLink } = data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div
        className={`theme-bg-primary text-white py-2 px-4 transition-all duration-300 ${
          isScrolled
            ? "transform -translate-y-full opacity-0 h-0 overflow-hidden"
            : "transform translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <a href={`tel:${companyInfo.phone}`} className="hover:text-blue-400">{companyInfo.phone}</a>
            </div>
            <div className="flex items-center space-x-2">
              {/* <MapPin className="w-4 h-4" /> */}
              <span>{companyInfo.location}</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            {/* <Clock className="w-4 h-4" /> */}
            <span>{companyInfo.workingHours}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`bg-background shadow-lg sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? "h-14" : "h-16"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={companyInfo.logo}
                alt={companyInfo.name || "Company Logo"}
                width={isScrolled ? 40 : 45}
                height={isScrolled ? 40 : 45}
                className="rounded-lg transition-all duration-300"
                // priority
              />
              <div>
                <h1
                  className={`font-bold theme-text-primary transition-all duration-300 ${
                    isScrolled ? "text-base" : "text-lg"
                  }`}
                >
                  {companyInfo.name}
                </h1>
                <p
                  className={`text-xs theme-text-secondary transition-all duration-300 ${
                    isScrolled ? "opacity-75" : "opacity-100"
                  }`}
                >
                  {/* {companyInfo.tagline} */}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationLinks.map((item) => {
                  const isActive = pathname === item.href; // ✅ check active route
                  return (
                    <div key={item.name} className="relative">
                      {item.hasDropdown ? (
                        <div
                          className="relative"
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          <button
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200 ${
                              isActive
                                ? "theme-accent"
                                : "theme-text-primary hover:theme-accent"
                            }`}
                          >
                            {item.name}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                servicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Dropdown Menu */}
                          <div
                            className={`absolute top-full left-0 mt-1 w-64 theme-bg-surface rounded-lg shadow-xl border theme-border transition-all duration-300 ${
                              servicesOpen
                                ? "opacity-100 visible translate-y-0"
                                : "opacity-0 invisible -translate-y-2"
                            }`}
                          >
                            <div className="py-2">
                              {item.dropdownItems?.map((dropItem) => {
                                const isDropActive =
                                  pathname === dropItem.href;
                                return (
                                  <Link
                                    key={dropItem.name}
                                    href={dropItem.href}
                                    className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                                      isDropActive
                                        ? "theme-accent"
                                        : "theme-text-primary hover:theme-bg-accent hover:text-black"
                                    }`}
                                  >
                                    {dropItem.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "theme-accent"
                              : "theme-text-primary hover:theme-accent"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href={bookNowLink.href}
                className={`theme-button-accent px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScrolled ? "px-4 py-1.5 text-sm" : "px-6 py-2"
                }`}
              >
                {bookNowLink.name}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="theme-text-primary hover:theme-accent p-2 rounded-md transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 theme-bg-surface border-t theme-border">
            {navigationLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between transition-colors duration-200 ${
                          isActive
                            ? "theme-accent"
                            : "theme-text-primary hover:theme-accent"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`ml-4 mt-1 space-y-1 transition-all duration-300 ${
                          servicesOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        {item.dropdownItems?.map((dropItem) => {
                          const isDropActive = pathname === dropItem.href;
                          return (
                            <Link
                              key={dropItem.name}
                              href={dropItem.href}
                              className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                                isDropActive
                                  ? "theme-accent"
                                  : "theme-text-primary hover:theme-bg-accent-hover"
                              }`}
                              onClick={() => {
                                setIsOpen(false);
                                setServicesOpen(false);
                              }}
                            >
                              {dropItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? "theme-accent"
                          : "theme-text-primary hover:theme-accent"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
            <div className="pt-4 pb-2">
              <Link
                href={bookNowLink.href}
                className="theme-button-accent w-full py-2 rounded-lg font-medium text-center block"
                onClick={() => setIsOpen(false)}
              >
                {bookNowLink.name}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
