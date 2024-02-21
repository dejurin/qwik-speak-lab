import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikSpeakInline, toPrefixAsNeeded } from 'qwik-speak/inline';
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "./src/speak-config";

export default defineConfig(({ mode }): UserConfig => {
  return {
    plugins: [qwikCity({
      rewriteRoutes: toPrefixAsNeeded([
        {
          domain: 'emoj.info',
          paths: {}
        },
        {
          domain: 'it-it.emoj.info',
          paths: {}
        },
      ], mode)
    }), qwikVite(), tsconfigPaths(), qwikSpeakInline({
      supportedLangs: ['en-US', 'it-IT'],
      defaultLang: 'en-US',
      assetsPath: 'i18n'
    }),],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
