import gallery1 from "../../public/picture/QualityAutoCareMobile/Ceramic Coating.jpg";
import gallery2 from "../../public/picture/QualityAutoCareMobile/Full Exterior Detail.jpg";
import gallery3 from "../../public/picture/QualityAutoCareMobile/Interior Cleaning.jpg";
import gallery4 from "../../public/picture/QualityAutoCareMobile/Interior Detailing.png";
import gallery5 from "../../public/picture/QualityAutoCareMobile/Leather Treatment.jpg";
import gallery6 from "../../public/picture/QualityAutoCareMobile/Showroom Shine.jpg";

export const getGalleryData = () => {
  return {
    title: "Our Gallery",
    subtitle: "A glimpse of our recent detailing & ceramic coating projects.",
    images: [
      {
        src: gallery1,
        alt: "Ceramic Coating Project",
      },
      {
        src: gallery2,
        alt: "Full Exterior Detail",
      },
      {
        src: gallery3,
        alt: "Interior Cleaning",
      },
      {
        src: gallery4,
        alt: "Interior Detailing",
      },
      {
        src: gallery5,
        alt: "Leather Treatment",
      },
      {
        src: gallery6,
        alt: "Showroom Shine",
      },
    ],
    buttonText: "View Full Gallery",
  };
};