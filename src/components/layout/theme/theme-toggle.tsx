'use client';

import { Button } from '@headlessui/react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useThemeToggle } from '@/hooks/use-theme-toggle';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const t = useTranslations('theme');
  const { theme, toggleTheme, mounted } = useThemeToggle();

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label={t('toggle')}
      className={cn(
        'flex size-7 shrink-0 items-center justify-center leading-none',
        'text-muted transition-[opacity,transform,color] duration-300 ease-out',
        'hover:text-foreground active:scale-90',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        mounted ? 'opacity-100' : 'opacity-0',
      )}
    >
      {theme === 'light' ? (
        <Moon className="size-3.5" />
      ) : (
        <Sun className="size-3.5" />
      )}
    </Button>
  );
}
