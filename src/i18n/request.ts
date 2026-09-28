import { getRequestConfig } from 'next-intl/server';

import { defaultTimeZone } from '@/i18n/config';
import { getUserLocale } from '@/services/locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    timeZone: defaultTimeZone,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
