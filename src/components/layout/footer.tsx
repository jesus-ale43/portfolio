import { getTranslations } from 'next-intl/server';

import { contactLinks } from '@/constants/site';

export default async function Footer() {
  const tContact = await getTranslations('contact');
  const tFooter = await getTranslations('footer');

  return (
    <footer id="contact" className="mt-12 lg:mt-16">
      <div className="container-px">
        <div className="border-t border-border pt-10 lg:pt-12">
          <div className="mb-12 grid grid-cols-1 items-start gap-12 lg:mb-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="micro-label mb-6 block text-muted">
                {tContact('invitation')}
              </span>
              <h2
                id="contact-title"
                className="font-editorial text-6xl leading-none text-foreground sm:text-8xl lg:text-[clamp(6rem,9vw,11rem)]"
              >
                <a
                  href={contactLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline text-balance text-secondary transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
                >
                  <span className="leading-none">{tContact('title')}</span>
                  <span
                    aria-hidden="true"
                    className="ml-4 inline-block transform font-sans text-4xl font-light transition-transform duration-300 group-hover:translate-x-3 group-hover:-translate-y-3 motion-reduce:transform-none sm:ml-6 sm:text-6xl lg:text-[clamp(4rem,7vw,8rem)]"
                  >
                    ↗
                  </span>
                </a>
              </h2>
            </div>

            <div className="flex flex-col justify-between border-t border-border pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div className="grid grid-cols-1 gap-6 font-mono text-xs">
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <span className="micro-label shrink-0 text-muted">
                    {tContact('emailLabel')}
                  </span>
                  <a
                    href={`mailto:${contactLinks.email}`}
                    className="min-w-0 break-all text-right text-foreground transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
                  >
                    {contactLinks.email}
                  </a>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <span className="micro-label shrink-0 text-muted">
                    {tContact('openSourceLabel')}
                  </span>
                  <a
                    href={contactLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-1 text-right text-foreground transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
                  >
                    <span className="break-all">
                      {contactLinks.github.replace('https://', '')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[10px] text-muted transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-foreground"
                    >
                      ↗
                    </span>
                  </a>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <span className="micro-label shrink-0 text-muted">
                    {tContact('professionalLabel')}
                  </span>
                  <a
                    href={contactLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-1 text-right text-foreground transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
                  >
                    <span className="break-all">
                      {contactLinks.linkedin.replace('https://', '')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[10px] text-muted transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-foreground"
                    >
                      ↗
                    </span>
                  </a>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <span className="micro-label shrink-0 text-muted">
                    {tContact('baseLabel')}
                  </span>
                  <span className="min-w-0 wrap-break-word text-right tracking-wider text-secondary">
                    {tContact('baseValue')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="micro-label flex flex-col items-start justify-between gap-4 border-t border-border py-8 text-muted sm:flex-row sm:items-center">
            <p>{tFooter('rights')}</p>
            <p>{tFooter('domain')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
