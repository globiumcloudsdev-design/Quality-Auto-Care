import type { StaticImageData } from 'next/image';

export interface LinkItem {
  name: string;
  href: string;
}

export interface SocialLink {
  icon: string; // Icon ka naam ya component, jaise "Facebook"
  href: string;
}

export interface FooterData {
  logo: StaticImageData;
  companyName: string;
  companyTagline: string;
  quickLinks: LinkItem[];
  services: LinkItem[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  socialLinks: SocialLink[];
  copyrightText: string;
}