import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    // We enable `Volar Takeover Mode`, so we can disable the shim `*.vue` generation
    // see https://v3.nuxtjs.org/getting-started/introduction#prerequisites
    shim: false,
    strict: true,
  },
  build: {
    // Get tailwind working
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: [
    '~/assets/css/tailwind.css', 
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },
});
