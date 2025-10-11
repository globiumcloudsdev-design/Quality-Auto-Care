export interface ContactInfoItem {
  iconName: string;
  title: string;
  description: string;
}

export interface SocialLink {
  iconName: string;
  href: string;
  colorClass: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
  formTitle: string;
  formButtonText: string;
}