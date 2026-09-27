'use client';

import { Moon, Sun } from 'lucide-react';

import { useThemeToggle } from '@/hooks/use-theme-toggle';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useThemeToggle();

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="transition-transform active:scale-90"
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}
