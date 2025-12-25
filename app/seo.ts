// SEO utilities and metadata helpers for better search engine optimization
import { Metadata } from 'next';

const baseUrl = 'https://parththakar2003.github.io';

interface PageSEO {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = '/images/og-image.png'
}: PageSEO): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title} | Parth Thakar - Cybersecurity Professional`;
  
  return {
    title,
    description,
    keywords: [
      'Parth Thakar',
      'Cybersecurity',
      'Digital Forensics',
      'DFIR',
      'SOC Operations',
      ...keywords
    ],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Parth Thakar - Cybersecurity Professional Portfolio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@parththakar',
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

// Common keywords for all pages
export const commonKeywords = [
  'Parth Thakar',
  'Cybersecurity Professional',
  'Digital Forensics',
  'Information Security',
  'DFIR Specialist',
  'SOC Analyst',
  'Security Expert',
  'India',
  'Ahmedabad'
];
