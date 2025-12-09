<template>
  <div class="space-y-6">
    <ProductsHeader />

    <ProductsTable />
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: 'Products - Jawebli',
    description: 'Manage your product catalog',
    category: 'products',
    hideFromSearch: false,
  },
})
</script>
