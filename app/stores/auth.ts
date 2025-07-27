import { defineStore } from "pinia";
import type { User } from "@supabase/supabase-js";

export const useAuthStore = defineStore("auth", () => {
  const client = useSupabaseClient();
  const user = ref<User | null>(null);

  const restoreSession = async () => {
    const { data, error } = await client.auth.getUser();
    if (!error && data?.user) {
      user.value = data.user;
    }
  };

  // Register
  const signUp = async (
    email: Ref<string>,
    password: Ref<string>,
    username: Ref<string>
  ) => {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: { username: username.value },
      },
    });
    if (error) throw error;
    return data;
  };

  // Login
  const signIn = async (email: string, password: string) => {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    user.value = data.user;
    return data;
  };

  // Logout
  const signOut = async () => {
    await client.auth.signOut();
    user.value = null;
    navigateTo("/");
  };

  return { user, signUp, signIn, signOut, restoreSession };
});
