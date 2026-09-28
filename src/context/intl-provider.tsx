'use client';

import { NextIntlClientProvider } from 'next-intl';

export function IntlProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextIntlClientProvider>) {
  return <NextIntlClientProvider {...props}>{children}</NextIntlClientProvider>;
}
