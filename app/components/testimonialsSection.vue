<script setup lang="ts">
const testimonials = ref([
  {
    name: "Dr. Sarah Johnson",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    position: "University of California",
    testimonial:
      "EduPlatform has transformed how we deliver online courses. The analytics help us understand student engagement like never before.",
  },
  {
    name: "Michael Chen",
    profilePic: "https://avatar.iran.liara.run/public/boy",
    position: "Lincoln High School",
    testimonial:
      "The interactive features keep my students engaged, and the mobile app means learning doesn't stop at the classroom door.",
  },
  {
    name: "Emily Rodriguez",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    position: "Community College District",
    testimonial:
      "Implementation was seamless, and the support team has been incredible. Our student satisfaction scores have improved significantly.",
  },
]);
</script>

<template>
  <section
    id="testimonials"
    class="py-20 bg-gradient-to-br from-sky-50 to-emerald-50"
  >
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-navy mb-4">
          Loved by Educators
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          See what educators and institutions are saying about EduPlatform
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardsTestimonialsCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :name="testimonial.name"
          :profile-pic="testimonial.profilePic"
          :position="testimonial.position"
          :testimonial="testimonial.testimonial"
        />
      </div>
    </div>
  </section>
</template>
