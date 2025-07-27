<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  profilePic: { type: String, required: true },
  position: { type: String, required: true },
  testimonial: { type: String, required: true },
});
</script>

<template>
  <div class="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all card-3d">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-primary rounded-full mr-4">
        <NuxtImg
          v-slot="{ slotProfilePic, isLoaded, imgAttrs }"
          :src="profilePic"
          :alt="name"
          :custom="true"
          loading="lazy"
        >
          <img v-if="isLoaded" v-bind="imgAttrs" :src="slotProfilePic" />
          <img v-else src="https://placehold.co/400x400" alt="placeholder" />
        </NuxtImg>
      </div>
      <div>
        <h4 class="font-bold text-navy">{{ name }}</h4>
        <p class="text-gray-600 text-sm">{{ position }}</p>
      </div>
    </div>
    <p class="text-gray-700 italic">"{{ testimonial }}"</p>
  </div>
</template>
