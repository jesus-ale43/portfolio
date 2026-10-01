import '@/styles/globals.css';
import 'lenis/dist/lenis.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import SmoothCursor from '@/components/layout/smooth-cursor';
import { gaId, siteUrl } from '@/constants/site';
import { IntlProvider } from '@/context/intl-provider';
import { LenisProvider } from '@/context/lenis-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { defaultTimeZone } from '@/i18n/config';
import { cn } from '@/lib/utils';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jakarta',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const GA_MEASUREMENT_ID = gaId;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jesús Alejandro · Web Developer',
    template: '%s · Jesús Alejandro',
  },
  description: 'Developer and industrial automation student.',
  authors: [
    {
      name: 'Jesús Alejandro',
      url: siteUrl,
    },
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Jesús Alejandro · Web Developer',
    description: 'Developer and industrial automation student.',
    url: siteUrl,
    siteName: 'Jesús Alejandro Portfolio',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'es_MX', 'pt_BR', 'pt_PT'],
    type: 'website',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Jesús Alejandro · Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jesús Alejandro · Web Developer',
    description: 'Developer and industrial automation student.',
    images: ['/og-image.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon-light.png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: light)' },
    ],
  },
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(jakarta.variable, instrument.variable, jetbrains.variable)}
    >
      <body>
        <IntlProvider
          locale={locale}
          timeZone={defaultTimeZone}
          messages={messages}
        >
          <ThemeProvider>
            <LenisProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </LenisProvider>
          </ThemeProvider>
        </IntlProvider>

        <SmoothCursor />
        {GA_MEASUREMENT_ID ? (
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        ) : null}
      </body>
    </html>
  );
}
