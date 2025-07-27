import { useAuthStore } from "@/stores/auth";
import { useSupabaseClient, useSupabaseUser } from "#imports";
import { useClerk } from "#imports";

export const useAuth = () => {
  const authStore = useAuthStore();
  const supabase = useSupabaseClient();
  const supabaseUser = useSupabaseUser();

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        authStore.setUser({
          id: data.user.id,
          email: data.user.email,
          isAuthenticated: true,
          provider: "supabase",
        });
      }
    } catch (error) {
      console.error("Supabase login error:", error);
    }
  };

  const logout = async () => {
    authStore.logout();
    // switch (authStore.user?.provider) {
    //   case "clerk":
    //     await signOut();
    //     break;
    //   case "supabase":
    //     await supabase.auth.signOut();
    //     break;
    //   default:
    //     console.warn("Unknown auth provider, no logout action taken.");
    //     break;
    // }
  };

  watch([user, supabaseUser], () => {
    if (user.value) {
      authStore.setUser({
        id: user.value.id,
        email: user.value.primaryEmailAddress?.emailAddress || "",
        username: user.value.fullName,
        image: user.value.imageUrl,
        isAuthenticated: true,
        provider: "clerk",
      });
    } else if (supabaseUser.value) {
      authStore.setUser({
        id: supabaseUser.value.id,
        email: supabaseUser.value.email,
        isAuthenticated: true,
        provider: "supabase",
      });
    } else {
      authStore.logout();
    }
  });
  return { loginWithClerk, loginWithSupabase, logout, user: authStore.user };
};
