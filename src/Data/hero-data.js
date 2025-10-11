import heroCar from "../../public/picture/hero-car.jpg";

export const getHeroData = () => {
  return {
    image: heroCar,
    title: "Quality Auto Care Detailing in US",
    subtitle: "Restore the shine and protect your ride with our expert detailing services — Interior, Exterior, Ceramic Coating & More.",
    primaryButton: {
      name: "Book Your Service",
      href: "/booking",
    },
    secondaryButton: {
      name: "View Services",
      href: "/#services",
    },
  };
};