import '@/styles/globals.css';
import 'lenis/dist/lenis.css';

import type { Metadata } from 'next';

import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';

import { LenisProvider } from '@/context/lenis-provider';
import { ThemeProvider } from '@/context/theme-provider';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://jesusale.com'),

  title: {
    default: 'Jesús Alejandro · Web Developer',
    template: '%s · Jesús Alejandro',
  },
  description: 'Developer and industrial automation student.',

  authors: [
    {
      name: 'Jesús Alejandro',
      url: 'https://jesusale.com',
    },
  ],

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Jesús Alejandro · Web Developer',
    description: 'Developer and industrial automation student.',
    url: 'https://jesusale.com',
    siteName: 'Jesús Alejandro Portfolio',
    locale: 'en_US',
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
      { url: '/favicon.png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: light)' },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        jakarta.variable,
        instrument.variable,
        jetbrains.variable,
        'antialiased',
      )}
    >
      <body>
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
