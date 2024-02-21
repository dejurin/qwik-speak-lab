import type { SpeakConfig } from 'qwik-speak';

export const config: SpeakConfig = {
  defaultLocale: { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
  supportedLocales: [
    { lang: 'it-IT', currency: 'EUR', timeZone: 'Europe/Rome' },
    { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' }
  ],
  domainBasedRouting: {
    prefix: 'as-needed'
  },
  // Translations available in the whole app
  assets: [
    'app'
  ],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: [
    'runtime'
  ]
};