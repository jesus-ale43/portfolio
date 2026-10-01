const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jesusale.com';

export const siteUrl = rawSiteUrl.replace(/\/$/, '');

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Jesús Alejandro';

export const gaId = process.env.NEXT_PUBLIC_GA_ID || undefined;
