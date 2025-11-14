import type { StaticImageData } from 'next/image';

export interface DropdownItem {
  name: string;
  href: string;
}

export interface NavigationLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface BookNowLink {
  name: string;
  href: string;
}

export interface CompanyInfo {
  logo: StaticImageData;
  name?: string;
  tagline?: string;
  phone: string;
  location?: string;
  workingHours?: string;
}

export interface NavbarData {
  companyInfo: CompanyInfo;
  navigationLinks: NavigationLink[];
  bookNowLink: BookNowLink;
}