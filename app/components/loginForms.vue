<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const emit = defineEmits(["submit"]);

async function handleLogin() {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    emit("submit", {
      email: email.value,
      password: password.value,
    });
    await auth.signIn(email.value, password.value);

    navigateTo("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="glass-effect rounded-2xl shadow-2xl p-8 card-3d animate-fade-in">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-navy mb-2">Selamat Datang Kembali</h2>
      <p class="text-gray-600">
        Masuk ke akun
        <NuxtLink to="/">
          <span
            class="font-semibold bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 bg-clip-text text-transparent gradient animate-gradient-x bg-[length:200%_200%]"
            >EduPlatform</span
          >
        </NuxtLink>
        Anda
      </p>
    </div>

    <form class="space-y-6" @submit.prevent="handleLogin">
      <FormsFormInput
        v-model="email"
        label="Email Address"
        type="email"
        placeholder="nama@example.com"
        icon="cib:mail-ru"
      />

      <FormsFormInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="Masukkan password Anda"
        icon="material-symbols-light:visibility"
      />

      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <Icon name="material-symbols-light:lock" size="20" />
          </span>
          {{ isLoading ? "Memproses..." : "Masuk" }}
        </button>
      </div>
    </form>

    <!-- Login Clerk -->

    <div class="text-center mt-6">
      <p class="text-sm text-gray-600">
        Belum punya akun?
        <NuxtLink
          to="/auth/register"
          class="font-medium text-primary hover:text-blue-600 transition-colors"
        >
          Daftar sekarang
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
