import logo from "../../public/picture/main-logo.jpg";

export const getNavbarData = () => {
  return {
    companyInfo: {
      logo: logo,
      name: "Quality Auto Care",
      tagline: "Mobile Care",
      phone: "+1233-242-4232",
      location: "Ohio, USA",
      workingHours: "Mon-Sat: 8AM-5PM",
    },
    navigationLinks: [
      { name: "Home", href: "/" },
      {
        name: "Services",
        href: "/#services",
        hasDropdown: true,
        dropdownItems: [
          { name: "Interior Detailing", href: "/services/interior" },
          { name: "Exterior Detailing", href: "/services/exterior" },
          { name: "Paint Protection", href: "/services/paint-protection" },
          { name: "Ceramic Coating", href: "/services/ceramic-coating" },
          // { name: "Car Wash & Wax", href: "/services/wash-wax" },
          // { name: "Headlight Restoration", href: "/services/headlight" },
        ],
      },
      // { name: "About", href: "/about" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
    bookNowLink: {
      name: "Book Now",
      href: "/booking",
    },
  };
};