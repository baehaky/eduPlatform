<script setup lang="ts">
const plans = ref([
  {
    name: "Starter",
    price: 29,
    period: "/month",
    description: "Perfect for individual educators",
    features: [
      "Up to 100 students",
      "5 courses",
      "Basic analytics",
      "Email support",
    ],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: 79,
    period: "/month",
    description: "Ideal for schools and departments",
    features: [
      "Up to 500 students",
      "Unlimited courses",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large institutions",
    features: [
      "Unlimited students",
      "Unlimited courses",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
]);
</script>

<template>
  <section id="pricing" class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-navy mb-4">
          Simple Pricing
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your educational needs
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Starter Plan -->
        <CardsPricingCard
          v-for="(plan, index) in plans"
          :key="index"
          v-bind="plan"
        />
      </div>
    </div>
  </section>
</template>
