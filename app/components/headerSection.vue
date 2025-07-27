<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

defineProps({
  activeSection: {
    type: String,
    default: "",
  },
});

// State management
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

// Navigation data
const navLinks = ref([
  {
    name: "Home",
    href: "#home",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Features",
    href: "#features",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Pricing",
    href: "#pricing",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
]);

// Computed properties
const headerClass = computed(() => {
  return isScrolled.value
    ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
    : "bg-white/90 backdrop-blur-md border-b border-gray-100";
});

// Methods
const scrollToSection = (event: MouseEvent, selector: string) => {
  event.preventDefault();

  const element = document.querySelector(selector);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Close mobile menu after navigation
    isMobileMenuOpen.value = false;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".mobile-menu-container")) {
      isMobileMenuOpen.value = false;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    :class="headerClass"
    class="fixed w-full top-0 z-50 transition-all duration-300"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo & Brand -->
        <div class="flex items-center space-x-3 flex-shrink-0">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl"
          >
            <span class="text-white font-bold text-lg sm:text-xl">E</span>
          </div>
          <div>
            <h1
              class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide"
            >
              EduPlatform
            </h1>
            <p class="text-xs text-gray-500 hidden sm:block -mt-1">
              Learn. Grow. Excel.
            </p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            @click="scrollToSection($event, link.href)"
            class="group relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-200 rounded-lg hover:bg-indigo-50"
            :class="{
              '!text-indigo-600 !bg-indigo-50 font-semibold':
                link.href === '#' + activeSection,
            }"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="link.icon"
                />
              </svg>
              <span>{{ link.name }}</span>
            </div>

            <!-- Active indicator -->
            <div
              v-if="link.href === '#' + activeSection"
              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"
            ></div>
          </a>
        </nav>

        <!-- Desktop CTA Buttons -->
        <div class="hidden md:flex items-center space-x-3">
          <NuxtLink to="/auth/login">
            <button
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-200 rounded-lg hover:bg-gray-50"
            >
              Login
            </button>
          </NuxtLink>
          <NuxtLink to="/auth/register">
            <button
              class="relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden group"
            >
              <span class="relative z-10">Get Started</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              ></div>
            </button>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden mobile-menu-container">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg
              class="w-6 h-6 transition-transform duration-300"
              :class="{ 'rotate-90': isMobileMenuOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 -translate-y-4"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl mobile-menu-container"
        >
          <div class="px-4 py-6 space-y-6">
            <!-- Mobile Navigation Links -->
            <nav class="space-y-2">
              <a
                v-for="link in navLinks"
                :key="link.name"
                :href="link.href"
                @click="scrollToSection($event, link.href)"
                class="group flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
                :class="{
                  '!text-indigo-600 !bg-indigo-50 font-semibold':
                    link.href === '#' + activeSection,
                }"
              >
                <div
                  class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-indigo-100 transition-colors duration-200"
                  :class="{
                    '!bg-indigo-100': link.href === '#' + activeSection,
                  }"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="link.icon"
                    />
                  </svg>
                </div>
                <span>{{ link.name }}</span>

                <!-- Active indicator -->
                <div
                  v-if="link.href === '#' + activeSection"
                  class="ml-auto w-2 h-2 bg-indigo-600 rounded-full"
                ></div>
              </a>
            </nav>

            <!-- Mobile CTA Buttons -->
            <div class="space-y-3 pt-6 border-t border-gray-100">
              <NuxtLink to="/auth/login" class="block">
                <button
                  @click="closeMobileMenu"
                  class="w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200"
                >
                  Login
                </button>
              </NuxtLink>

              <NuxtLink to="/auth/register" class="block">
                <button
                  @click="closeMobileMenu"
                  class="w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started Free
                </button>
              </NuxtLink>
            </div>

            <!-- Mobile Additional Info -->
            <div class="pt-4 border-t border-gray-100">
              <div
                class="flex items-center justify-center space-x-4 text-xs text-gray-500"
              >
                <span class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Free Trial Available</span>
                </span>
                <span>•</span>
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
/* Custom scrollbar for mobile menu if needed */
.mobile-menu-container::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu-container::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-menu-container::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 2px;
}

/* Ensure mobile menu doesn't overflow */
@media (max-height: 600px) {
  .mobile-menu-container {
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }
}

/* Additional responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
