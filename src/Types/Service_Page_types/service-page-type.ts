// /types/services-types.ts
import type { StaticImageData } from "next/image";

export type BeforeAfterImage = string | StaticImageData;

export interface ParagraphContent {
  type: "paragraph";
  text: string;
  animationClass?: string;
}
export interface HeadingContent {
  type: "heading";
  text: string;
  animationClass?: string;
}
export interface ListContent {
  type: "list";
  items: { title: string; description: string; animationClass?: string }[];
  animationClass?: string;
}
export interface NumberedListContent {
  type: "numbered-list";
  items: string[];
  animationClass?: string;
}
export type ContentItem =
  | ParagraphContent
  | HeadingContent
  | ListContent
  | NumberedListContent;

export interface ServiceData {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  price?: string;
  duration?: string;
  heroImage: string | StaticImageData;
  heroAnimationClass?: string;
  content: ContentItem[];
  beforeAfter: {
    before: BeforeAfterImage;
    after: BeforeAfterImage;
    caption: string;
  }[];
  testimonials: { name: string; quote: string; rating: number }[];
  slug?: string;
}

export interface ServicesRecord {
  [key: string]: ServiceData;
}
