<template>
  <Hero />
</template>

<script setup lang="ts">
import Hero from './components/Hero.vue'

definePage({
  meta: {
    title: 'Landing Page',
    description: 'Welcome to Jawbli - AI-powered e-commerce platform for Algerian businesses',
    category: 'home',
    hideFromSearch: false,
    layout: 'public',
  },
})
</script>

<style scoped></style>
