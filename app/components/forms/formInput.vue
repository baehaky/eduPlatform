<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const isPasswordVisible = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return isPasswordVisible.value ? "text" : "password";
  }
  return props.type;
});

const passwordIcon = computed(() => {
  return isPasswordVisible.value
    ? "material-symbols-light:visibility-off"
    : "material-symbols-light:visibility";
});

function updateValue(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div>
    <label :for="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="label"
        :name="label"
        :type="inputType"
        :value="modelValue"
        class="input-focus appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 transition-all duration-300"
        :placeholder="placeholder"
        required
        @input="updateValue"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          v-if="type === 'password'"
          type="button"
          class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
          @click="isPasswordVisible = !isPasswordVisible"
        >
          <Icon :name="passwordIcon" size="20" />
        </button>
        <div v-else class="w-5 h-5 text-gray-400">
          <Icon :name="icon" size="15" />
        </div>
      </div>
    </div>
  </div>
</template>
