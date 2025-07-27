<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const subjects = ref([
  { name: "Matematika", icon: "🧮" },
  { name: "Fisika", icon: "⚛️" },
  { name: "Bahasa Inggris", icon: "🇬🇧" },
  { name: "Kimia", icon: "🧪" },
]);

const startLearning = (subjectName: string) => {
  navigateTo(`/dashboard/learn?subject=${subjectName}`);
};
</script>

<template>
  <div class="mx-auto py-32">
    <div class="text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">
        Selamat Datang!
      </h1>
      <p class="mt-2 text-lg text-gray-600">
        Pilih mata pelajaran yang ingin kamu pelajari hari ini.
      </p>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <CardsSubjectCard
        v-for="subject in subjects"
        :key="subject.name"
        :subject="subject.name"
        :icon="subject.icon"
        @select="startLearning"
      />
    </div>
  </div>
</template>
