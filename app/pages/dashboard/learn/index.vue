<script setup lang="ts">
import { useVapi } from "~/composables/useVapi";

definePageMeta({
  layout: "dashboard",
});

const route = useRoute();
const config = useRuntimeConfig();

const subject = computed(() => (route.query.subject as string) || "Umum");

const assistantId: string = config.public.vapiAssistantId;
const publicKey: string = config.public.vapiPublicKey;

console.log("Assistant ID:", assistantId);
console.log("Public Key:", publicKey);

// Menggunakan composable untuk mengelola state dan logika Vapi
const { isCalling, statusInfo, transcript, toggleCall } = useVapi(
  assistantId,
  publicKey
);

const chatContainer = ref<HTMLElement | null>(null);

// Auto-scroll ke pesan terbaru
watch(
  transcript,
  () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto bg-gray-50 py-20">
    <header
      class="p-4 border-b bg-white flex justify-between items-center shadow-sm"
    >
      <div>
        <h2 class="text-xl font-bold text-gray-800">Belajar {{ subject }}</h2>
        <div class="flex items-center gap-2 mt-1">
          <span
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-full',
              statusInfo.class,
            ]"
          >
            {{ statusInfo.text }}
          </span>
          <div v-if="isCalling" class="flex items-center gap-1">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
              ></span>
            </span>
          </div>
        </div>
      </div>
      <NuxtLink to="/dashboard" class="text-sm text-blue-600 hover:underline">
        Pilih Mapel Lain
      </NuxtLink>
    </header>

    <main ref="chatContainer" class="flex-1 p-6 overflow-y-auto space-y-6">
      <div
        v-if="transcript.length === 0"
        class="text-center text-gray-500 mt-10"
      >
        <p>Tekan tombol "Mulai Belajar" untuk berbicara dengan asisten AI.</p>
      </div>

      <div
        v-for="(message, index) in transcript"
        :key="index"
        class="flex"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-md p-3 rounded-xl"
          :class="{
            'bg-blue-500 text-white': message.role === 'user',
            'bg-white text-gray-800 shadow-sm border':
              message.role === 'assistant',
          }"
        >
          <p class="text-sm">{{ message.text }}</p>
        </div>
      </div>
    </main>

    <footer class="p-4 bg-white border-t">
      <button
        class="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 transform active:scale-95"
        :class="
          isCalling
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        "
        :disabled="statusInfo.text === 'Menghubungkan...'"
        @click="toggleCall(instructions)"
      >
        <span v-if="statusInfo.text === 'Menghubungkan...'">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
        <span v-else>
          {{ isCalling ? "Hentikan Sesi" : "Mulai Belajar" }}
        </span>
      </button>
    </footer>
  </div>
</template>
