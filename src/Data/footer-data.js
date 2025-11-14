
import logo from "../../public/picture/main-logo.jpg";

export const getFooterData = () => {
  const currentYear = new Date().getFullYear();

  return {
    logo: logo,
    companyName: "Quality Auto Care",
    companyTagline: "Premium car detailing, interior & exterior cleaning, and ceramic coating services — bringing shine & protection to your ride.",
    quickLinks: [
      { name: "Home", href: "/" },
      { name: "Services", href: "#services" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "Interior Detailing", href: "/services/interior" },
      { name: "Exterior Detailing", href: "/services/exterior" },
      { name: "Ceramic Coating", href: "/services/ceramic-coating" },
      { name: "Paint Protection", href: "/services/paint-protection" },
    ],
    contactInfo: {
      address: "Ohio USA",
      phone: "+1 (623) 320-4623",
      email: "qualityautocaremobile@gmail.com",
    },
    socialLinks: [
      { icon: "Facebook", href: "https://www.facebook.com/qualityautocaremobile/" },
      { icon: "Instagram", href: "https://www.instagram.com/qualityautocaremobile/#" },
      { icon: "Phone", href: "https://wa.me/16233204623" },
    ],
    copyrightText: `© ${currentYear} Quality Auto Care. All rights reserved.`,
  };
};