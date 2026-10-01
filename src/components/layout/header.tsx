'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import LocaleSwitcher from '@/components/layout/i18n/locale-switcher';
import ThemeToggle from '@/components/layout/theme/theme-toggle';
import { defaultTimeZone } from '@/i18n/config';
import { cn } from '@/lib/utils';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('header');
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: defaultTimeZone,
      hour: '2-digit',
      hourCycle: 'h23',
      minute: '2-digit',
      second: '2-digit',
    });

    function update() {
      setTime(formatter.format(new Date()));
    }

    update();

    const msToNextSecond = 1000 - new Date().getMilliseconds();
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      update();
      interval = setInterval(update, 1000);
    }, msToNextSecond);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [locale]);

  return (
    <header
      id="header"
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md py-2.5"
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
          <span className="hidden text-muted sm:inline">{t('role')}</span>
        </div>

        <div className="flex items-center gap-8 micro-label leading-none">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-muted">JOINVILLE, BR</span>
            <span
              id="clock"
              suppressHydrationWarning
              className={cn(
                'w-[8ch] shrink-0 text-right font-mono tabular-nums text-foreground leading-none transition-opacity duration-500',
                time ? 'opacity-100' : 'opacity-0',
              )}
            >
              {time ?? <span aria-hidden="true">00:00:00</span>}
            </span>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/60 opacity-75 motion-reduce:animate-none" />
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
