<script setup>
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const message = ref("");
const isLoading = ref(false);

const emit = defineEmits(["submit"]);

async function handleRegister() {
  isLoading.value = true;
  console.log("Email type:", typeof email.value, email);
  console.log("Password type:", typeof password.value, password);
  console.log("Username type:", typeof username.value, username);
  try {
    emit("submit", {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
    if (password.value !== confirmPassword.value) {
      message.value = "Password dan konfirmasi password tidak cocok.";
      isLoading.value = false;
      return;
    }
    await auth.signUp(email, password, username);
    message.value = "Cek email Anda untuk konfirmasi akun.";
  } catch (error) {
    message.value = error.message;
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
            class="font-semibold bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 bg-clip-text text-transparent gradient animate-gradient-x bg-[length:200%_200%] text-shadow"
            >EduPlatform</span
          >
        </NuxtLink>
        Anda
      </p>
    </div>

    <form class="space-y-6" @submit.prevent="handleRegister">
      <FormsFormInput
        v-model="username"
        label="Username"
        type="text"
        placeholder="John Doe"
        icon="cib:mail-ru"
      />
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
      <FormsFormInput
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Konfirmasi password Anda"
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
    <p v-if="message" class="mt-4 text-sm text-blue-600">{{ message }}</p>

    <div class="text-center mt-6">
      <p class="text-sm text-gray-600">
        Sudah punya akun?
        <NuxtLink
          to="/auth/login"
          class="font-medium text-primary hover:text-blue-600 transition-colors"
        >
          Masuk sekarang
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
