'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { Video } from '@/types';
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/youtube';
import { urlFor } from '@/lib/sanity';

interface VideoSectionProps {
  videos: Video[];
}

function isYouTubeVideo(video: Video): boolean {
  return !!video.youtubeUrl && !!extractYouTubeId(video.youtubeUrl);
}

function isUploadedVideo(video: Video): boolean {
  return !!video.videoFileUrl;
}

function getThumbnailUrl(video: Video, index: number): string | null {
  if (video.thumbnail) {
    return urlFor(video.thumbnail).width(400).height(225).url();
  }
  if (video.youtubeUrl) {
    const videoId = extractYouTubeId(video.youtubeUrl);
    if (videoId) return getYouTubeThumbnail(videoId);
  }
  return null;
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!videos || videos.length === 0) return null;

  const activeVideo = videos[activeIndex];
  const isActiveYouTube = isYouTubeVideo(activeVideo);
  const isActiveUploaded = isUploadedVideo(activeVideo);
  const activeVideoId = isActiveYouTube ? extractYouTubeId(activeVideo.youtubeUrl!) : null;

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -containerWidth : containerWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section id="videos" className="section-padding bg-primary-black">
      <div className="container-custom mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 uppercase"
        >
          Videos
        </motion.h2>

        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video w-full max-w-4xl mx-auto mb-8 rounded-lg overflow-hidden bg-zinc-900"
        >
          {isActiveYouTube && activeVideoId ? (
            <iframe
              src={getYouTubeEmbedUrl(activeVideoId)}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : isActiveUploaded && activeVideo.videoFileUrl ? (
            <video
              src={activeVideo.videoFileUrl}
              controls
              className="absolute inset-0 w-full h-full object-contain"
              poster={activeVideo.thumbnail ? urlFor(activeVideo.thumbnail).width(1280).height(720).url() : undefined}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No video available
            </div>
          )}
        </motion.div>

        {/* Carousel */}
        {videos.length > 1 && (
          <div className="relative">
            {/* Navigation Buttons - inset from edges */}
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary-red/90 hover:bg-primary-red text-white p-3 rounded-full shadow-lg transition-colors"
              aria-label="Previous videos"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary-red/90 hover:bg-primary-red text-white p-3 rounded-full shadow-lg transition-colors"
              aria-label="Next videos"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel: 1 thumb mobile (<640), 2 thumb tablet (sm–lg), 3 thumb desktop (lg+); scroll by visible amount */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {videos.map((video, index) => {
                const thumbnailUrl = getThumbnailUrl(video, index);
                if (!thumbnailUrl && !isUploadedVideo(video)) return null;

                return (
                  <button
                    key={video._id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex-shrink-0 w-full min-w-full sm:w-[calc(50%-0.5rem)] sm:min-w-[200px] lg:w-[calc(33.333%-0.5rem)] lg:min-w-[200px] snap-center snap-always sm:snap-start relative aspect-video rounded-lg overflow-hidden group transition-all duration-300 ${
                      index === activeIndex
                        ? 'ring-4 ring-primary-red'
                        : 'hover:ring-2 hover:ring-white/50'
                    }`}
                  >
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={`Video ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                        <FaPlay className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-colors ${
                        index === activeIndex ? 'bg-black/30' : 'bg-black/50 group-hover:bg-black/30'
                      }`}
                    >
                      <FaPlay
                        className={`w-8 h-8 transition-transform ${
                          index === activeIndex ? 'text-primary-red scale-110' : 'text-white group-hover:scale-110'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
