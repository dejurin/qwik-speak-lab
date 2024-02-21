import type { RequestHandler } from '@builder.io/qwik-city';
import { extractFromDomain, extractFromUrl, validateLocale } from 'qwik-speak';

import { config } from '../speak-config';

export const onRequest: RequestHandler = ({ locale, error, url }) => {
  let lang: string | undefined = undefined;

  const prefix = extractFromUrl(url);

  if (prefix && validateLocale(prefix)) {
    // Check supported locales
    lang = config.supportedLocales.find(value => value.lang === prefix)?.lang;
    // 404 error page
    if (!lang) throw error(404, 'Page not found');
  } else {
    // Extract from domain
    lang = extractFromDomain(url, config.supportedLocales) || config.defaultLocale.lang;
  }

  // Set Qwik locale
  locale(lang);
};