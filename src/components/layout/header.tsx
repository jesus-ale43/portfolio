'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import LocaleSwitcher from '@/components/layout/i18n/locale-switcher';
import ThemeToggle from '@/components/layout/theme/theme-toggle';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('header');
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    function update() {
      setTime(formatter.format(new Date()));
    }

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [locale]);

  return (
    <header
      id="header"
      className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-md py-2.5"
    >
      <nav
        id="header-container"
        className="container-px relative flex items-center justify-between "
      >
        <div className="flex items-center gap-6 micro-label leading-none">
          <Link
            href="/"
            className="font-medium text-foreground transition-colors hover:text-secondary"
          >
            JESÚS ALEJANDRO
          </Link>
          <span className="hidden text-border sm:inline">/</span>
          <span className="hidden text-muted/75 sm:inline">{t('role')}</span>
        </div>

        <div className="flex items-center gap-8 micro-label leading-none">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-muted/75">JOINVILLE, BR</span>
            <span id="clock" className="font-mono text-foreground leading-none">
              {time ?? '12:00:00'}
            </span>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/60 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-foreground" />
            </span>

            <span className="text-foreground leading-none">
              {t('availability')}
            </span>
          </div>

          <span className="hidden text-border sm:inline">/</span>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />

            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
