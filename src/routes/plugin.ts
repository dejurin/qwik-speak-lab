import type { RequestHandler } from '@builder.io/qwik-city';
import type { RewriteRouteOption} from 'qwik-speak';
import { extractFromDomain, extractFromUrl, validateLocale } from 'qwik-speak';

import { config } from '../speak-config';
export const rewriteRoutes: RewriteRouteOption[] = [
    // No prefix/paths for default locale
    {
      domain: 'emoj.info',
      paths: {}
    },
    {
      prefix: 'it',
      domain: 'it.emoj.info',
      paths: {}

    }
  ];

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
    lang = extractFromDomain(url, rewriteRoutes) || config.defaultLocale.lang;
  }

  // Set Qwik locale
  locale(lang);
};