<script setup>
import { useSupabaseClient } from "#imports";
import { useRoute } from "vue-router";

const route = useRoute();
const client = useSupabaseClient();
const message = ref("Memproses konfirmasi...");

onMounted(async () => {
  const token = route.query.token || route.query.code; // fallback jika masih code
  const type = route.query.type || "signup";

  console.log("Token:", token, "Type:", type);

  if (!token) {
    message.value = "Token tidak ditemukan di URL.";
    return;
  }

  try {
    const { error } = await client.auth.verifyOtp({ token_hash: token, type });
    if (error) throw error;
    message.value = "Email berhasil dikonfirmasi! Silakan login.";
  } catch (e) {
    message.value = `Konfirmasi gagal: ${e.message}`;
  }
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <h1 class="text-2xl font-bold mb-4">Konfirmasi Email</h1>
      <p class="text-gray-700">{{ message }}</p>
      <div v-if="isLoading" class="mt-4 animate-spin text-blue-500">🔄</div>
    </div>
  </div>
</template>
