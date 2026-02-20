'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sponsor } from '@/types';
import { urlFor } from '@/lib/sanity';

interface SponsorsProps {
  sponsors: Sponsor[];
}

export default function Sponsors({ sponsors }: SponsorsProps) {
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section id="sponsors" className="section-padding bg-zinc-900">
      <div className="container-custom mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 uppercase"
        >
          Sponsors
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {sponsor.link ? (
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg p-6 hover:shadow-xl hover:shadow-primary-red/10 transition-all duration-300 group"
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={urlFor(sponsor.image).width(300).height(200).quality(85).url()}
                      alt={sponsor.altText}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </a>
              ) : (
                <div className="bg-white rounded-lg p-6">
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={urlFor(sponsor.image).width(300).height(200).quality(85).url()}
                      alt={sponsor.altText}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
