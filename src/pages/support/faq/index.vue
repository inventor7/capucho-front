<template>
  <Card class="mt-6">
    <CardHeader>
      <CardTitle class="font-heading">Frequently Asked Questions</CardTitle>
      <CardDescription>Find answers to common questions</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="border rounded-lg">
          <button
            class="flex justify-between items-center w-full p-4 text-left"
            @click="toggleFaq(index)"
          >
            <span class="font-medium">{{ faq.question }}</span>
            <ILucideChevronDown
              class="h-5 w-5 transition-transform"
              :class="{ 'rotate-180': faq.open }"
            />
          </button>
          <div v-if="faq.open" class="px-4 pb-4 border-t">
            <p class="text-muted-foreground">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
// Toggle FAQ item
const toggleFaq = (index: number) => {
  if (faqs.value[index]) faqs.value[index].open = !faqs.value[index].open
}

// FAQ items
const faqs = ref([
  {
    question: 'How do I set up my chatbot?',
    answer:
      'To set up your chatbot, go to the Chatbot section in your dashboard and follow the step-by-step setup wizard. You can customize responses, add product information, and integrate with your store.',
    open: false,
  },
  {
    question: 'Can I connect my WhatsApp business account?',
    answer:
      'Yes, you can connect your WhatsApp business account by navigating to the Integrations section. You will need to provide your WhatsApp Business API credentials to establish the connection.',
    open: false,
  },
  {
    question: 'How do I manage delivery zones?',
    answer:
      'You can manage delivery zones in the Settings section under Delivery Zones. Here you can define areas, set pricing, and configure delivery times for different regions.',
    open: false,
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We support various payment methods including CIB, Baridimob, and cash on delivery. You can configure which methods are available to your customers in the Payment Settings section.',
    open: false,
  },
  {
    question: 'How do I upgrade my plan?',
    answer:
      'To upgrade your plan, go to the Billing section in your settings. You can view all available plans and upgrade directly from there. Your new features will be activated immediately.',
    open: false,
  },
])
</script>
