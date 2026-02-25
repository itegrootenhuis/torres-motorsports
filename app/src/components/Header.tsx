'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTiktok, FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { SiteSettings } from '@/types';
import { urlFor } from '@/lib/sanity';

interface HeaderProps {
  settings: SiteSettings;
  hasSponsors?: boolean;
}

const allNavLinks = [
  { href: '#about', label: 'About' },
  { href: '#news', label: 'News' },
  { href: '#videos', label: 'Videos' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ settings, hasSponsors = true }: HeaderProps) {
  const navLinks = hasSponsors 
    ? allNavLinks 
    : allNavLinks.filter(link => link.href !== '#sponsors');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = settings?.socialLinks;

  const socialIcons = [
    { key: 'tiktok', icon: FaTiktok, url: socialLinks?.tiktok },
    { key: 'youtube', icon: FaYoutube, url: socialLinks?.youtube },
    { key: 'facebook', icon: FaFacebookF, url: socialLinks?.facebook },
    { key: 'twitter', icon: FaTwitter, url: socialLinks?.twitter },
    { key: 'instagram', icon: FaInstagram, url: socialLinks?.instagram },
    { key: 'threads', icon: FaThreads, url: socialLinks?.threads },
  ].filter((social) => social.url);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95'
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10">
            {settings?.logo ? (
              <Image
                src={urlFor(settings.logo).width(200).height(60).url()}
                alt="Torres Motorsports"
                width={200}
                height={60}
                className="h-10 md:h-14 w-auto object-contain"
                priority
              />
            ) : (
              <span className="text-xl md:text-2xl font-bold text-primary-black">
                Torres Motorsports
              </span>
            )}
          </Link>

          {/* Desktop Navigation - Absolutely Centered */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-black hover:text-primary-red transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links - same breakpoint as nav so both are in hamburger below lg */}
          <div className="hidden lg:flex items-center space-x-4 z-10">
            {socialIcons.map((social) => (
              <a
                key={social.key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-black hover:text-primary-red transition-colors duration-200"
                aria-label={social.key}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-black p-2 z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container-custom mx-auto px-4 py-4 text-right">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-primary-black hover:text-primary-red transition-colors duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t mt-4">
              {socialIcons.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-black hover:text-primary-red transition-colors duration-200"
                  aria-label={social.key}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
