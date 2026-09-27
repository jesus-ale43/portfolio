import type { MetadataRoute } from 'next';

const LAST_MODIFIED = '2026-09-26';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jesusale.com',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
