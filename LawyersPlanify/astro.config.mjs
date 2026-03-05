import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.lawyersplanify.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwind()],
  },
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
});
