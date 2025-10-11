import type { StaticImageData } from 'next/image';

export interface HeroData {
  image: StaticImageData;
  title: string;
  subtitle: string;
  primaryButton: {
    name: string;
    href: string;
  };
  secondaryButton: {
    name: string;
    href: string;
  };
}