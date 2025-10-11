export interface ServiceItem {
  iconName: string; // Icon ke liye string name
  title: string;
  desc: string;
}

export interface ServicesData {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}