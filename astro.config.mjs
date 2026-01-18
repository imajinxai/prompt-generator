import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://google-prompt-generator.vercel.app',
  integrations: [
    react(),
    tailwind(),
    sitemap()
  ],
  vite: {
    ssr: {
      noExternal: ['@google/genai']
    }
  }
});
