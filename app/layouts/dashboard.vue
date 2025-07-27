<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const isMobileMenuOpen = ref(false);
const showUserDropdown = ref(false);

// Fungsi logout
const handleLogout = async () => {
  try {
    await auth.signOut();
    showUserDropdown.value = false;
  } catch (err) {
    console.error("Logout gagal:", err);
  }
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Toggle user dropdown
const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value;
};

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showUserDropdown.value = false;
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  auth.restoreSession();
  // Close dropdowns when clicking outside
  document.addEventListener("click", closeDropdowns);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdowns);
});
</script>

<template>
  <div>
    <header
      class="bg-white/95 backdrop-blur-lg fixed w-full top-0 z-50 shadow-lg border-b border-gray-100 transition-all duration-300"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo & Brand -->
          <div class="flex items-center space-x-3 flex-shrink-0">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200"
            >
              <span class="text-white font-bold text-lg sm:text-2xl">E</span>
            </div>
            <div class="hidden sm:block">
              <h1
                class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide"
              >
                EduPlatform
              </h1>
            </div>
          </div>

          <!-- Desktop User Profile -->
          <div class="hidden md:flex items-center space-x-4">
            <div
              class="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <div class="flex flex-col items-end">
                <h3
                  class="text-sm font-semibold text-gray-800 truncate max-w-32"
                >
                  {{
                    auth.user?.user_metadata?.username ||
                    auth.user?.email ||
                    "Guest"
                  }}
                </h3>
                <span class="text-xs text-gray-500">Online</span>
              </div>

              <!-- User Avatar with Dropdown -->
              <div class="relative" @click.stop="toggleUserDropdown">
                <button
                  class="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
                >
                  <NuxtImg
                    v-slot="{ isLoaded, imgAttrs }"
                    src="https://avatar.iran.liara.run/public/girl"
                    class="w-10 h-10 rounded-full border-2 border-indigo-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    alt="User Avatar"
                    :custom="true"
                    loading="lazy"
                  >
                    <img
                      v-if="isLoaded"
                      v-bind="imgAttrs"
                      :src="imgAttrs.src"
                      alt="User Avatar"
                      class="w-10 h-10 rounded-full border-2 border-indigo-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full border-2 border-indigo-200 shadow-sm bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center"
                    >
                      <span class="text-white text-sm font-medium">
                        {{
                          (auth.user?.user_metadata?.username ||
                            auth.user?.email ||
                            "G")[0].toUpperCase()
                        }}
                      </span>
                    </div>
                  </NuxtImg>
                </button>

                <!-- User Dropdown Menu -->
                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-if="showUserDropdown"
                    class="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    @click.stop
                  >
                    <div class="px-4 py-3 border-b border-gray-100">
                      <p class="text-sm font-medium text-gray-800 truncate">
                        {{
                          auth.user?.user_metadata?.username ||
                          auth.user?.email ||
                          "Guest"
                        }}
                      </p>
                      <p class="text-xs text-gray-500 truncate">
                        {{ auth.user?.email }}
                      </p>
                    </div>

                    <a
                      href="#"
                      class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profil Saya
                    </a>

                    <a
                      href="#"
                      class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Pengaturan
                    </a>

                    <hr class="my-2 border-gray-100" />

                    <button
                      @click="handleLogout"
                      class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Keluar
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              @click.stop="toggleMobileMenu"
              class="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                class="w-6 h-6 transition-transform duration-200"
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
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 -translate-y-2"
        >
          <div
            v-if="isMobileMenuOpen"
            class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg"
          >
            <div class="px-4 py-4 space-y-4">
              <!-- Mobile User Info -->
              <div
                class="flex items-center space-x-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl"
              >
                <NuxtImg
                  v-slot="{ isLoaded, imgAttrs }"
                  src="https://avatar.iran.liara.run/public/girl"
                  class="w-12 h-12 rounded-full border-2 border-indigo-200 shadow-sm"
                  alt="User Avatar"
                  :custom="true"
                  loading="lazy"
                >
                  <img
                    v-if="isLoaded"
                    v-bind="imgAttrs"
                    :src="imgAttrs.src"
                    alt="User Avatar"
                    class="w-12 h-12 rounded-full border-2 border-indigo-200 shadow-sm"
                  />
                  <div
                    v-else
                    class="w-12 h-12 rounded-full border-2 border-indigo-200 shadow-sm bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center"
                  >
                    <span class="text-white text-lg font-medium">
                      {{
                        (auth.user?.user_metadata?.username ||
                          auth.user?.email ||
                          "G")[0].toUpperCase()
                      }}
                    </span>
                  </div>
                </NuxtImg>

                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-800 truncate">
                    {{
                      auth.user?.user_metadata?.username ||
                      auth.user?.email ||
                      "Guest"
                    }}
                  </h3>
                  <p class="text-xs text-gray-500 truncate">
                    {{ auth.user?.email }}
                  </p>
                  <div class="flex items-center mt-1">
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span class="text-xs text-green-600 font-medium"
                      >Online</span
                    >
                  </div>
                </div>
              </div>

              <!-- Mobile Menu Items -->
              <div class="space-y-1">
                <a
                  href="#"
                  class="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  <svg
                    class="w-5 h-5 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profil Saya
                </a>

                <a
                  href="#"
                  class="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  <svg
                    class="w-5 h-5 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Pengaturan
                </a>

                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                >
                  <svg
                    class="w-5 h-5 mr-3 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </header>

    <!-- Main content with proper spacing -->
    <main class="pt-16 lg:pt-20">
      <slot />
    </main>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
