import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '@/lib/sanity';
import { legalPageQuery, siteSettingsQuery } from '@/lib/queries';
import { LegalPage, SiteSettings } from '@/types';
import { FaArrowLeft } from 'react-icons/fa';

interface PageProps {
  params: { slug: string };
}

async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return await client.fetch(legalPageQuery, { slug }, { next: { revalidate: 60 } });
}

async function getSiteSettings(): Promise<SiteSettings> {
  return await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getLegalPage(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.title,
    description: `${page.title} for Torres Motorsports`,
  };
}

export default async function LegalPageRoute({ params }: PageProps) {
  const [page, settings] = await Promise.all([
    getLegalPage(params.slug),
    getSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Header */}
      <header className="bg-white py-4">
        <div className="container-custom mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary-black hover:text-primary-red transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="section-padding">
        <div className="container-custom mx-auto">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              {page.title}
            </h1>
            <div className="prose prose-lg prose-invert max-w-none">
              <PortableText
                value={page.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mb-3 mt-6">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-white mb-2 mt-4">{children}</h3>
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
                      <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">{children}</ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 mb-4 ml-4">{children}</ol>
                    ),
                  },
                }}
              />
            </div>
          </article>
        </div>
      </main>

    </div>
  );
}
