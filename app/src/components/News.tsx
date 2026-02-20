'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/types';
import { urlFor } from '@/lib/sanity';

interface NewsProps {
  articles: NewsArticle[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function News({ articles }: NewsProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section id="news" className="section-padding bg-zinc-900">
      <div className="container-custom mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 uppercase"
        >
          Latest News
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <motion.article
              key={article._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary-black rounded-lg overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                {article.image && (
                  <Image
                    src={urlFor(article.image).width(600).height(340).quality(80).url()}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <time className="text-primary-red text-sm font-medium">
                  {formatDate(article.date)}
                </time>
                <h3 className="text-xl font-bold text-white mt-2 mb-3 line-clamp-2 group-hover:text-primary-red transition-colors">
                  {article.title}
                </h3>
                {article.externalLink && (
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-red hover:text-red-400 transition-colors font-medium"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
