// galleryData.js

import serviceimage1 from '../../../public/picture/service-1.jpg';
import serviceimage2 from '../../../public/picture/service-2.jpg';
import leatherImage from '../../../public/picture/QualityAutoCareMobile/Leather Treatment.jpg';
import ceramicImage from '../../../public/picture/QualityAutoCareMobile/Ceramic Coating.jpg';
import interiorImage from '../../../public/picture/QualityAutoCareMobile/Interior Cleaning.jpg';
import paintCorrectionImage from '../../../public/picture/QualityAutoCareMobile/Paint Correction.png';
import showroomShineImage from '../../../public/picture/QualityAutoCareMobile/Showroom Shine.jpg';
import windowTint from '../../../public/picture/QualityAutoCareMobile/Window Treatment.png';
import exteriorWash from '../../../public/picture/QualityAutoCareMobile/Full Exterior Detail.jpg';

export const galleryImages = [
  {
    id: 1,
    src: serviceimage2,
    category: 'exterior',
    title: 'Full Exterior Detail',
    size: 'medium'
  },
  {
    id: 2,
    src: paintCorrectionImage,
    category: 'exterior',
    title: 'Paint Correction',
    size: 'large'
  },
  {
    id: 3,
    src: interiorImage,
    category: 'interior',
    title: 'Interior Detailing',
    size: 'small'
  },
  {
    id: 4,
    src: showroomShineImage,
    category: 'exterior',
    title: 'Showroom Shine',
    size: 'small'
  },
  {
    id: 5,
    src: windowTint,
    category: 'window-tint',
    title: 'Window Tinting',
    size: 'medium'
  },
  {
    id: 6,
    src: ceramicImage,
    category: 'ceramic',
    title: 'Ceramic Coating',
    size: 'large'
  },
  {
    id: 7,
    src: exteriorWash,
    category: 'exterior',
    title: 'Exterior Wash',
    size: 'small'
  },
  {
    id: 8,
    src: leatherImage,
    category: 'interior',
    title: 'Leather Treatment',
    size: 'medium'
  },
  {
    id: 9,
    src: serviceimage1,
    category: 'ceramic',
    title: 'Paint Protection',
    size: 'large'
  },
];