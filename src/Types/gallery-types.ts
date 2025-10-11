import type { StaticImageData } from 'next/image';

export interface GalleryItem {
  src: StaticImageData;
  alt: string;
}

export interface GalleryData {
  title: string;
  subtitle: string;
  images: GalleryItem[];
  buttonText: string;
}