import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('home');

  return (
    <section className="container-px pt-24 flex flex-col items-center justify-center gap-4">
      <p>{t('construction')}</p>

      <a
        href="https://www.instagram.com/jesus_ale43/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('instagram')}
      </a>
    </section>
  );
}
