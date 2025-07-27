// middleware/auth.ts
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  // Jika user belum terisi, coba restore session
  if (!auth.user) {
    await auth.restoreSession();
  }

  // Proteksi halaman dashboard
  if (!auth.user && to.path.startsWith("/dashboard")) {
    return navigateTo("/auth/login");
  }
});
