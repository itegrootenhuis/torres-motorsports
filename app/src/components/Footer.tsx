'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SiteSettings } from '@/types';
import { urlFor } from '@/lib/sanity';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-white text-primary-black py-8">
      <div className="container-custom mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Text */}
          <div className="flex items-center gap-6">
            {settings?.footerLogo ? (
              <Image
                src={urlFor(settings.footerLogo).width(150).height(50).url()}
                alt="Torres Motorsports"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
              />
            ) : settings?.logo ? (
              <Image
                src={urlFor(settings.logo).width(150).height(50).url()}
                alt="Torres Motorsports"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-lg font-bold">Torres Motorsports</span>
            )}
            {settings?.footerText && (
              <p className="text-sm text-gray-600 max-w-md">{settings.footerText}</p>
            )}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            {settings?.privacyPolicyPage?.slug?.current && (
              <Link
                href={`/${settings.privacyPolicyPage.slug.current}`}
                className="text-gray-600 hover:text-primary-red transition-colors"
              >
                Privacy Policy
              </Link>
            )}
            {settings?.termsOfUsePage?.slug?.current && (
              <Link
                href={`/${settings.termsOfUsePage.slug.current}`}
                className="text-gray-600 hover:text-primary-red transition-colors"
              >
                Terms of Use
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
