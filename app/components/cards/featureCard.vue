<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
<div
    class="bg-white p-6 rounded-2xl shadow-lg group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
  >
    <div
      class="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-tr from-primary to-blue-400 shadow-md mb-4 mx-auto"
    >
      <Icon :name="icon" size="32" class="text-white" />
    </div>
    <h3
      class="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors text-center"
    >
      {{ title }}
    </h3>
    <p class="text-gray-600 text-base leading-relaxed text-center">
      {{ description }}
    </p>
  </div>
</template>
