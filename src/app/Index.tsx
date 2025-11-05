"use client";

import About from '@/components/About'
import ContactSection from '@/components/ContactSection'
import DiscountModal from '@/components/DiscountModal'
import Footer from '@/components/Footer'
import GallerySection from '@/components/GallerySection'
import Hero from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import React, { useEffect, useRef, useState } from 'react'

const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;

            const heroHeight = heroRef.current.offsetHeight;
            const scrollY = window.scrollY;

            if (scrollY > heroHeight && !isModalOpen) {
                setIsModalOpen(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isModalOpen]);

    return (
        <>
            <Navbar />
            <div ref={heroRef}>
                <Hero />
            </div>
            <About />
            <ServicesSection />
            <GallerySection />
            <ContactSection />
            <Footer />
            <DiscountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={{
                    title: "🎉 Special Offer!",
                    description: "Get 15% OFF on all our services!",
                    discountText: "15% OFF",
                    discountCode: "DISCOUNT15",
                    buttonText: "Claim Discount"
                }}
            />
        </>
    )
}

export default Index
