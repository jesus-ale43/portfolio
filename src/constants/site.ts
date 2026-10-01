const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jesusale.com';

export const siteUrl = rawSiteUrl.replace(/\/$/, '');

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Jesús Alejandro';

export const gaId = process.env.NEXT_PUBLIC_GA_ID || undefined;

export const contactLinks = {
  email: 'jesus@jesusale.com',
  instagram: 'https://instagram.com/jesus_ale43',
  github: 'https://github.com/jesus-ale43',
  linkedin: 'https://linkedin.com/in/jesusale43',
} as const;
