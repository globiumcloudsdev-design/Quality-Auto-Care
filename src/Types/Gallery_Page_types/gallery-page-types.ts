
import { StaticImageData } from 'next/image';

export interface GalleryImage {
  id: number;
  src: StaticImageData;
  category: 'exterior' | 'interior' | 'ceramic' | 'window-tint';
  title: string;
  size: 'small' | 'medium' | 'large';
}