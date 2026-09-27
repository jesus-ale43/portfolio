import { getTranslations } from 'next-intl/server';

import LocaleSwitcher from '@/components/layout/i18n/locale-switcher';
import ThemeToggle from '@/components/layout/theme/theme-toggle';

export default async function Home() {
  const t = await getTranslations('home');

  return (
    <main>
      <section>
        <p>{t('construction')}</p>

        <a
          href="https://www.instagram.com/jesus_ale43/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('instagram')}
        </a>
      </section>

      <br />
      <br />

      <section>
        <p>{t('language')}</p>

        <LocaleSwitcher />
        <br />
        <br />
        <ThemeToggle />
      </section>
    </main>
  );
}
