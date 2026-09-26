import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}