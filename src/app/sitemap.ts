import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';
const locales = ['fr', 'en'] as const;

const pages = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/a-propos', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/assurance-protection', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/epargne-investissement', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
  { path: '/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
