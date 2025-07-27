<script setup lang="ts">
const activeSection = ref(""); // State untuk menyimpan ID section yang aktif
const observer = ref<IntersectionObserver | null>(null);
onMounted(() => {
  const options = {
    rootMargin: "0px",
    threshold: 0.5, // Section dianggap aktif jika 50% terlihat
  };

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options);

  document.querySelectorAll("main section[id]").forEach((section) => {
    observer.value?.observe(section);
  });
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div>
    <headerSection :active-section="activeSection" />

    <main>
      <slot />
    </main>

    <footerSection />
  </div>
</template>
