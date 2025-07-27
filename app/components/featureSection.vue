<script setup lang="ts">
const features = ref([
  {
    icon: "octicon:book-24",
    title: "Advanced Analytics",
    description:
      "Create engaging, interactive lessons with multimedia, quizzes, and real-time collaboration tools.",
  },
  {
    icon: "octicon:device-camera-video-24",
    title: "Interactive Learning",
    description:
      "Track student progress with detailed analytics and reports to provide personalized feedback.",
  },
  {
    icon: "octicon:people-24",
    title: "Community Support",
    description:
      "Join a vibrant community of educators to share resources, ideas, and best practices.",
  },
]);
</script>

<template>
  <section id="features" class="mt-16 max-w-5xl mx-auto relative">
    <div class="bg-white rounded-2xl shadow-2xl p-8">
      <div class="bg-gray-100 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex space-x-2">
            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div class="text-sm text-gray-500">
            <h2 class="font-bold">Powerful Features for Modern Education</h2>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardsFeatureCard
            v-for="(feature, index) in features"
            :key="index"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>
