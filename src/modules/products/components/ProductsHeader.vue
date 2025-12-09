<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <h1 class="text-3xl font-heading font-bold">Products</h1>
      <p class="text-muted-foreground">Manage your products and inventory</p>
    </div>

    <div class="flex gap-2">
      <Button @click="$router.push('/products/new')">
        <ILucidePlus class="h-4 w-4 mr-2" />
        Add Product
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
