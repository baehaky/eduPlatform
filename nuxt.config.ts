// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      vapiAssistantId: process.env.NUXT_PUBLIC_VAPI_ASSISTANT_ID,
      vapiPublicKey: process.env.NUXT_PUBLIC_VAPI_KEY,
    },
  },
  supabase: {
    redirect: false,
  },
});
