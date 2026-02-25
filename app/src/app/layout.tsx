import type { Metadata } from 'next';
import { Inter, Racing_Sans_One } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const racingSansOne = Racing_Sans_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-racing',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://torresmotorsports.com'),
  title: {
    default: 'Torres Motorsports | Ricardo Torres Racing',
    template: '%s | Torres Motorsports',
  },
  description:
    'Official website of Ricardo Torres and Torres Motorsports. Follow the racing journey, latest news, videos, and sponsorship opportunities.',
  keywords: [
    'Torres Motorsports',
    'Ricardo Torres',
    'Ricardo Torres Racing',
    'motorsports',
    'racing',
    'race car driver',
    'professional racing',
  ],
  authors: [{ name: 'Torres Motorsports' }],
  creator: 'Torres Motorsports',
  publisher: 'Torres Motorsports',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://torresmotorsports.com',
    siteName: 'Torres Motorsports',
    title: 'Torres Motorsports | Ricardo Torres Racing',
    description:
      'Official website of Ricardo Torres and Torres Motorsports. Follow the racing journey, latest news, videos, and sponsorship opportunities.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Torres Motorsports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Torres Motorsports | Ricardo Torres Racing',
    description:
      'Official website of Ricardo Torres and Torres Motorsports. Follow the racing journey, latest news, videos, and sponsorship opportunities.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${racingSansOne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            async
            defer
          />
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://torresmotorsports.com/#organization',
                  name: 'Torres Motorsports',
                  url: 'https://torresmotorsports.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://torresmotorsports.com/logo.png',
                  },
                  sameAs: [],
                },
                {
                  '@type': 'Person',
                  '@id': 'https://torresmotorsports.com/#person',
                  name: 'Ricardo Torres',
                  jobTitle: 'Professional Race Car Driver',
                  worksFor: {
                    '@id': 'https://torresmotorsports.com/#organization',
                  },
                  url: 'https://torresmotorsports.com',
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://torresmotorsports.com/#website',
                  url: 'https://torresmotorsports.com',
                  name: 'Torres Motorsports',
                  publisher: {
                    '@id': 'https://torresmotorsports.com/#organization',
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
