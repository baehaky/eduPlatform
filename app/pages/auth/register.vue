<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

async function performRegister(payload: RegisterPayload) {
  console.log("Data diterima dari komponen form:", payload);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(
      `Register berhasil untuk: ${payload.username} dengan email: ${payload.email}`
    );
  } catch (error) {
    console.error("Gagal melakukan registrasi:", error);
    alert("Registrasi gagal, silakan coba lagi.");
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 mt-10"
  >
    <div class="max-w-md w-full space-y-8">
      <registerForms @submit="performRegister" />
    </div>
  </div>
</template>
