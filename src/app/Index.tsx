import About from '@/components/About'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import GallerySection from '@/components/GallerySection'
import Hero from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import React from 'react'

const Index = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <ServicesSection />
            <GallerySection />
            <ContactSection />

            <Footer />
        </>
    )
}

export default Index