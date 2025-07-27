<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  price: { type: [String, Number], required: true },
  period: { type: String, default: "" },
  description: { type: String, required: true },
  features: { type: Array, required: true },
  buttonText: { type: String, required: true },
  popular: { type: Boolean, default: false },
});
</script>

<template>
  <div
    class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all relative hover:-translate-y-2 ease-in-out duration-300"
    :class="{ 'border-2 border-primary': popular }"
  >
    <div
      v-if="popular"
      class="absolute -top-4 left-1/2 transform -translate-x-1/2"
    >
      <span
        class="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold"
      >
        Most Popular
      </span>
    </div>

    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold text-navy mb-2">{{ name }}</h3>
      <div class="text-4xl font-bold text-primary mb-2">
        <span v-if="typeof price === 'number'">${{ price }}</span>
        <span v-else>{{ price }}</span>
        <span class="text-lg text-gray-500">{{ period }}</span>
      </div>
      <p class="text-gray-600">{{ description }}</p>
    </div>

    <ul class="space-y-4 mb-8">
      <li
        v-for="(feature, index) in features"
        :key="index"
        class="flex items-center"
      >
        <div class="w-5 h-5 bg-secondary rounded-full mr-3 shrink-0"></div>
        <span>{{ feature }}</span>
      </li>
    </ul>

    <button
      class="w-full py-3 rounded-lg font-semibold transition-colors"
      :class="
        popular
          ? 'bg-primary text-white hover:bg-blue-600'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      "
    >
      {{ buttonText }}
    </button>
  </div>
</template>
