'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { Bio as BioType } from '@/types';
import { urlFor } from '@/lib/sanity';

interface BioProps {
  bio: BioType;
}

export default function Bio({ bio }: BioProps) {
  if (!bio) return null;

  const hasImage = !!bio.image;

  return (
    <section id="about" className="section-padding bg-primary-black">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className={`${
            hasImage
              ? 'grid md:grid-cols-2 gap-8 md:gap-12 items-center'
              : 'max-w-3xl mx-auto text-center'
          }`}
        >
          {/* Image */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <Image
                src={urlFor(bio.image!).width(600).height(750).quality(85).url()}
                alt={bio.heading}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}

          {/* Content */}
          <div className={hasImage ? '' : ''}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: hasImage ? 0.3 : 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase"
            >
              {bio.heading}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: hasImage ? 0.4 : 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <PortableText
                value={bio.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mb-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-white mb-2">{children}</h3>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">{children}</strong>
                    ),
                    em: ({ children }) => <em className="italic">{children}</em>,
                    link: ({ value, children }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-red hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-300 mb-4">{children}</ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 mb-4">{children}</ol>
                    ),
                  },
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
