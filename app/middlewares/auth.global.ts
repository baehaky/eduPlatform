// auth.global.ts

import { useSupabaseClient, useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  if (!user.value && to.path.startsWith("/dashboard")) {
    return navigateTo("/auth/login");
  }
});
