import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('home.hero.about');
  const capabilities = t.raw('capabilities.items') as string[];

  return (
    <section id="hero" className="overflow-hidden" aria-labelledby="hero-title">
      <div className="container-px relative isolate flex min-h-[min(100svh,64rem)] flex-col justify-start pt-28 sm:justify-end lg:pt-36">
        <div className="relative flex items-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-20 z-0 size-[min(90vw,56rem)] animate-pulse rounded-full bg-hero-halo opacity-70 blur-3xl motion-reduce:animate-none [animation-duration:7s] sm:left-1/4"
          />

          <h1
            id="hero-title"
            className="font-editorial relative z-10 flex select-none flex-col text-[clamp(5rem,24vw,15.625rem)] leading-[0.85] tracking-[-0.04em] text-foreground sm:text-[clamp(5rem,13vw,15.625rem)] pl-[0.065em]"
          >
            <span>Jesús</span>
            <span className="italic text-secondary">Alejandro</span>
          </h1>
        </div>

        <div className="relative z-10 mt-12 grid grid-cols-1 items-start gap-8 border-t border-border py-10 md:grid-cols-12 lg:mt-16 lg:py-12">
          <div className="md:col-span-3 self-start">
            <span className="micro-label block text-muted">{t('label')}</span>
          </div>

          <div className="md:col-span-7 self-start md:max-w-4xl">
            <p className="font-editorial text-3xl leading-[1.2] text-secondary sm:text-4xl lg:text-5xl">
              {t('description')}
            </p>
          </div>

          <div className="md:col-span-2 self-start md:text-right">
            <span className="micro-label block text-secondary">
              {t('capabilities.label')}
            </span>

            <ul className="mt-2 space-y-0.5 font-mono text-xs leading-relaxed text-muted">
              {capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
