<script setup lang="ts">
defineProps<{
  subject: string;
  icon: string;
}>();

// Mendefinisikan event yang akan di-emit ke parent
const emit = defineEmits(["select"]);

const handleSelect = (subjectName: string) => {
  emit("select", subjectName);
};
</script>

<template>
  <div
    class="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-500 hover:-translate-y-2"
    @click="handleSelect(subject)"
  >
    <div
      class="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110"
    >
      {{ icon }}
    </div>
    <h3 class="text-xl font-bold text-gray-800 text-center">
      {{ subject }}
    </h3>
  </div>
</template>
