import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikSpeakInline, toPrefixAsNeeded } from 'qwik-speak/inline';
import tsconfigPaths from "vite-tsconfig-paths";
import { rewriteRoutes } from "./src/routes/plugin";

export default defineConfig(({ mode }): UserConfig => {
  return {
    plugins: [qwikCity({
      rewriteRoutes: toPrefixAsNeeded(rewriteRoutes, mode)
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
