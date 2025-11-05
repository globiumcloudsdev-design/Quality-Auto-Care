// /src/Data/Service_page_data/services-page-data.ts
import type { ServicesRecord } from "@/Types/Service_Page_types/service-page-type";
import inetriorImage from '../../../public/picture/inetrior-ser-hbg.png';

const services: ServicesRecord = {
  interior: {
    id: "interior",
    title: "Interior Detailing",
    shortTitle: "Interior",
    description:
      "Deep interior clean: stain removal, dashboard conditioning, upholstery & carpet shampoo, leather care and odor elimination.",
    price: "$150 - $300",
    duration: "2 - 3 hours",
    heroImage: inetriorImage,
    heroAnimationClass: "animate-fade-in-up",
    content: [
      {
        type: "paragraph",
        text:
          "Professional interior detailing using premium, pH-balanced cleaners and commercial-grade equipment. We thoroughly clean carpets, crevices and vents, condition leather surfaces, and sanitize all interior components.",
        animationClass: "animate-fade-in-up",
      },
      {
        type: "heading",
        text: "Included Services",
        animationClass: "animate-fade-in-up animation-delay-300",
      },
      {
        type: "list",
        items: [
          {
            title: "Deep Vacuum & Steam Cleaning",
            description:
              "Complete vacuum of seats, carpets, headliners & trunk; professional steam cleaning for deep stains.",
            animationClass: "animate-fade-in-up animation-delay-600",
          },
          {
            title: "Shampoo & Extraction",
            description:
              "Carpet & upholstery shampoo with hot water extraction for toughest stains.",
            animationClass: "animate-fade-in-up animation-delay-800",
          },
          {
            title: "Premium Leather Care",
            description:
              "Deep clean + premium conditioning to restore suppleness and prevent cracking.",
            animationClass: "animate-fade-in-up animation-delay-1000",
          },
          {
            title: "Complete Interior Detailing",
            description:
              "Clean, dress and protect all interior trims, plastics, and dashboard components.",
            animationClass: "animate-fade-in-up animation-delay-1200",
          },
          {
            title: "Odor Elimination",
            description:
              "Professional odor removal treatment for smoke, pets, or food smells.",
            animationClass: "animate-fade-in-up animation-delay-1400",
          },
        ],
        animationClass: "animate-fade-in-up animation-delay-400",
      },
    ],
    beforeAfter: [
      {
        before: "/picture/QualityAutoCareMobile/before-CarWash.jpg",
        after: "/picture/QualityAutoCareMobile/Full Exterior Detail.jpg",
        caption: "Interior upholstery & carpet cleaning",
      },
      {
        before:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        after:
          "https://images.unsplash.com/photo-1575844611398-2a68400b437c?auto=format&fit=crop&w=1200&q=80",
        caption: "Dashboard & leather restoration",
      },
    ],
    testimonials: [
      {
        name: "Michael R.",
        quote: "My seats look brand new — all stains completely gone. Highly recommended!",
        rating: 5,
      },
      {
        name: "Sarah T.",
        quote: "Quick, professional and extremely thorough. Love the premium finish.",
        rating: 5,
      },
    ],
  },

  exterior: {
    id: "exterior",
    title: "Exterior Detailing",
    shortTitle: "Exterior",
    description:
      "Complete exterior wash, clay bar decontamination, paint correction, wheel & tire dressing and premium gloss finish protection.",
    price: "$120 - $400",
    duration: "2 - 3 hours (depending on package)",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1661443389760-fde4402180fa?q=80&w=1170&auto=format&fit=crop",
    heroAnimationClass: "animate-fade-in-up",
    content: [
      {
        type: "paragraph",
        text:
          "Professional exterior detailing that restores and protects your vehicle's paint and trim. We use the two-bucket wash method, clay bar treatment, iron decontamination, and premium polish or sealant for maximum protection.",
      },
      {
        type: "heading",
        text: "Premium Service Steps",
      },
      {
        type: "numbered-list",
        items: [
          "Pre-wash & wheel decontamination",
          "Two-bucket hand wash with premium shampoos",
          "Clay bar treatment to remove bonded contaminants",
          "Paint correction and polishing (optional)",
          "Premium sealant or ceramic coating application",
          "Tire dressing and wheel protection",
        ],
      },
    ],
    beforeAfter: [
      {
        before:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
        after:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
        caption: "Exterior wash + polish",
      },
    ],
    testimonials: [
      {
        name: "David M.",
        quote: "Paint shine is incredible after their premium polish. Very satisfied with the results.",
        rating: 5,
      },
      {
        name: "Jennifer K.",
        quote: "Extremely careful with my custom rims and perfect finish. Worth every dollar.",
        rating: 5,
      },
    ],
  },

  "paint-protection": {
    id: "paint-protection",
    title: "Paint Protection (PPF / Ceramic)",
    shortTitle: "Paint Protection",
    description:
      "Premium paint protection options: ceramic coatings or paint protection film (PPF) to guard against chips, scratches, UV damage, and environmental contaminants.",
    price: "$600 - $2,500",
    duration: "1-3 days (depending on vehicle size)",
    heroImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQcHoc8GJTQdWZ3BUrsZwp8TBCIJyt8xEL1Q&s",
    heroAnimationClass: "animate-fade-in-up",
    content: [
      {
        type: "paragraph",
        text:
          "Protect your investment with our premium paint protection services. Choose between advanced ceramic coatings for exceptional gloss and chemical resistance, or nearly invisible paint protection film for ultimate impact protection against rock chips and scratches.",
      },
      {
        type: "heading",
        text: "Protection Options",
      },
      {
        type: "list",
        items: [
          {
            title: "Premium Ceramic Coating",
            description: "2-5 year durable hydrophobic coating with exceptional gloss enhancement.",
          },
          {
            title: "Pro Ceramic Coating + Top Coat",
            description: "5-7 year professional-grade coating with enhanced chemical resistance.",
          },
          {
            title: "Paint Protection Film (PPF)",
            description: "Self-healing urethane film providing physical protection against chips & scratches.",
          },
          {
            title: "Full Front PPF Package",
            description: "Complete front-end protection including bumper, hood, fenders, mirrors and headlights.",
          },
        ],
      },
    ],
    beforeAfter: [
      {
        before:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        after:
          "https://images.unsplash.com/photo-1520975920705-5a25b5336f87?q=80&w=1200&auto=format&fit=crop",
        caption: "Surface protection & gloss enhancement",
      },
    ],
    testimonials: [
      {
        name: "Robert A.",
        quote: "PPF saved my bumper from multiple highway stone chips. Absolutely worth the investment.",
        rating: 5,
      },
      {
        name: "Amanda R.",
        quote: "Ceramic coating has kept my car cleaner for months. Exceptional service and results.",
        rating: 5,
      },
    ],
  },

  "ceramic-coating": {
    id: "ceramic-coating",
    title: "Professional Ceramic Coating",
    shortTitle: "Ceramic Coating",
    description:
      "Advanced ceramic coating technology for long-term gloss retention, chemical resistance, and superior hydrophobic properties — applied after comprehensive paint correction.",
    price: "$800 - $3,000",
    duration: "2-4 days (includes meticulous prep & cure time)",
    heroImage:
      "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?q=80&w=1600&auto=format&fit=crop",
    heroAnimationClass: "animate-fade-in-up",
    content: [
      {
        type: "paragraph",
        text:
          "Our professional ceramic coating service involves a meticulous multi-step process that bonds nano-ceramic technology to your vehicle's paint surface, creating an incredibly durable, hydrophobic layer that provides exceptional protection and makes maintenance significantly easier.",
      },
      {
        type: "heading",
        text: "Professional Application Process",
      },
      {
        type: "numbered-list",
        items: [
          "Complete decontamination wash & iron removal",
          "Paint correction to remove swirls and imperfections",
          "Surface preparation with professional-grade panel wipe",
          "Precise ceramic coating application in controlled environment",
          "Curing process with infrared technology (if needed)",
          "Final inspection and quality assurance",
        ],
      },
    ],
    beforeAfter: [
      {
        before: "/picture/before.jpg",
        after: "/picture/After.jpg",
        caption: "Ceramic coating — exceptional depth & gloss improvement",
      },
    ],
    testimonials: [
      {
        name: "James S.",
        quote: "The coating has made maintenance incredibly easy and the shine has lasted exceptionally well.",
        rating: 5,
      },
      {
        name: "Emily I.",
        quote: "Fantastic finish and unbelievable protection. Highly professional team and outstanding results.",
        rating: 5,
      },
    ],
  },
};

export default services;