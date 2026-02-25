import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://torresmotorsports.com';

  const legalPages = await client.fetch<{ slug: string; _updatedAt: string }[]>(
    groq`*[_type == "legalPage"] { "slug": slug.current, _updatedAt }`
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const legalPageEntries: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...legalPageEntries];
}
