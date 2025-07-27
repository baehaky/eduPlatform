<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

interface LoginPayload {
  email: string;
  password: string;
}

async function performLogin(payload: LoginPayload) {
  console.log("Data diterima dari komponen form:", payload);

  try {
    // const response = await $fetch('/api/login', {
    //   method: 'POST',
    //   body: payload,
    // });
    // console.log('Login berhasil:', response);
    // await navigateTo('/dashboard');

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`Login berhasil untuk: ${payload.email}`);
  } catch (error) {
    console.error("Gagal melakukan login:", error);
    alert("Login gagal, silakan coba lagi.");
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 mt-10"
  >
    <div class="max-w-md w-full space-y-8">
      <loginForms @submit="performLogin" />
    </div>
  </div>
</template>
