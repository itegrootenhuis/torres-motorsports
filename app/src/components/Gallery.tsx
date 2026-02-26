'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GalleryImage } from '@/types';
import { urlFor } from '@/lib/sanity';

interface GalleryProps {
  images: GalleryImage[];
}

const INITIAL_VISIBLE_MOBILE = 6;
const INITIAL_VISIBLE_DESKTOP = 12;
const BATCH_MOBILE = 6;
const BATCH_DESKTOP = 12;

export default function Gallery({ images }: GalleryProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_MOBILE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      setVisibleCount((prev) => {
        const initial = desktop ? INITIAL_VISIBLE_DESKTOP : INITIAL_VISIBLE_MOBILE;
        return Math.max(prev, Math.min(initial, images.length));
      });
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [images.length]);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    },
    [closeLightbox, goToPrevious, goToNext]
  );

  const loadMore = () => {
    const batch = isDesktop ? BATCH_DESKTOP : BATCH_MOBILE;
    setVisibleCount((prev) => Math.min(prev + batch, images.length));
  };

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="bg-primary-black">
      <div className="container-custom mx-auto py-12 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-0 uppercase"
        >
          Gallery
        </motion.h2>
      </div>

      {/* Gallery Grid - single column on mobile, 3 columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        {visibleImages.map((image, index) => (
          <motion.button
            key={image._id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: (index % INITIAL_VISIBLE_DESKTOP) * 0.05 }}
            onClick={() => openLightbox(index)}
            className="relative aspect-square overflow-hidden group cursor-pointer"
          >
            <Image
              src={urlFor(image.image).width(600).height(600).fit('crop').quality(80).url()}
              alt={image.altText}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center py-12">
          <button onClick={loadMore} className="btn-primary">
            Show More ({images.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary-red transition-colors z-10 p-2"
              aria-label="Close lightbox"
            >
              <FaTimes className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-red transition-colors z-10 p-2"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-red transition-colors z-10 p-2"
              aria-label="Next image"
            >
              <FaChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={urlFor(images[lightboxIndex].image).width(1600).height(1200).quality(90).url()}
                alt={images[lightboxIndex].altText}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
