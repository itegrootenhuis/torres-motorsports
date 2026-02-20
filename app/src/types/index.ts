import { PortableTextBlock } from '@portabletext/types';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  logo?: SanityImage;
  footerLogo?: SanityImage;
  footerText?: string;
  socialLinks?: {
    tiktok?: string;
    youtube?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  privacyPolicyPage?: LegalPage;
  termsOfUsePage?: LegalPage;
}

export interface Hero {
  _id: string;
  _type: 'hero';
  image: SanityImage;
}

export interface Bio {
  _id: string;
  _type: 'bio';
  image?: SanityImage;
  heading: string;
  body: PortableTextBlock[];
}

export interface NewsArticle {
  _id: string;
  _type: 'newsArticle';
  title: string;
  body: PortableTextBlock[];
  image: SanityImage;
  date: string;
  externalLink?: string;
}

export interface Video {
  _id: string;
  _type: 'video';
  youtubeUrl: string;
}

export interface GalleryImage {
  _id: string;
  _type: 'galleryImage';
  image: SanityImage;
  altText: string;
  order?: number;
}

export interface Sponsor {
  _id: string;
  _type: 'sponsor';
  image: SanityImage;
  altText: string;
  link?: string;
  order?: number;
}

export interface LegalPage {
  _id: string;
  _type: 'legalPage';
  title: string;
  slug: {
    current: string;
  };
  body: PortableTextBlock[];
}

export interface ContactSection {
  _id: string;
  _type: 'contactSection';
  title: string;
  body: string;
  buttonText: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  details: string;
}

export interface HomePageData {
  siteSettings: SiteSettings;
  hero: Hero;
  bio: Bio;
  newsArticles: NewsArticle[];
  videos: Video[];
  galleryImages: GalleryImage[];
  sponsors: Sponsor[];
  contactSection: ContactSection;
}
