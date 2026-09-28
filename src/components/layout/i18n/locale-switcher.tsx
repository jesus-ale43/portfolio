'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { defaultLocale, type Locale, locales } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { getUserLocale, setUserLocale } from '@/services/locale';

export default function LocaleSwitcher() {
  const t = useTranslations('language');
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    getUserLocale().then(setCurrentLocale);
  }, []);

  async function handleLocaleChange(locale: Locale) {
    if (locale === currentLocale || isTransitioning) return;

    setIsTransitioning(true);

    try {
      await setUserLocale(locale);
      setCurrentLocale(locale);
      router.refresh();
    } finally {
      setIsTransitioning(false);
    }
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton
        type="button"
        disabled={isTransitioning}
        aria-label={t('change')}
        className="flex size-7 shrink-0 items-center justify-center leading-none text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-0"
      >
        <Languages className="block size-3.5" />
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: 'bottom end', gap: '0.75rem' }}
        className="w-36 border border-border bg-background p-1 shadow-xl transition duration-150 ease-out data-closed:-translate-y-2 data-closed:opacity-0 focus:outline-none"
      >
        {locales.map((locale) => (
          <MenuItem key={locale.code}>
            {({ focus }) => (
              <button
                type="button"
                onClick={() => handleLocaleChange(locale.code)}
                className={cn(
                  'micro-label flex w-full px-3 py-2 text-left transition-colors',
                  locale.code === currentLocale
                    ? 'text-foreground'
                    : 'text-muted',
                  focus && 'bg-secondary/10 text-foreground',
                  'focus:outline-none',
                )}
              >
                {locale.label}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
