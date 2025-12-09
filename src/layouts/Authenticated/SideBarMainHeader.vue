<template>
  <header class="flex flex-row justify-between items-center h-16 shrink-0 gap-2 border-b">
    <div class="flex gap-2 items-center px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Bread class="hidden md:block" />
    </div>

    <Button @click="openCommandPalette" variant="outline" class="w-80 justify-start hidden md:flex">
      <span class="mr-2 text-muted-foreground">
        <SearchCommand class="size-4" />
      </span>
      {{ t('404.search_placeholder') }}
      <span class="ml-auto text-xs text-muted-foreground">
        {{ t('404.press_slash', 'Press /') }}
      </span>
    </Button>

    <div class="flex flex-row justify-between items-center gap-2 px-4">
      <ThemeToggle />
      <Internationalization />
    </div>
  </header>
</template>

<script setup lang="ts">
import Bread from './Bread.vue'
import SearchCommand from './SearchCommand.vue'

const { searchCommandRef } = defineProps<{
  searchCommandRef: InstanceType<typeof SearchCommand> | null
}>()

const { t } = useI18n()

const openCommandPalette = () => {
  if (searchCommandRef?.openCommandPalette) {
    searchCommandRef.openCommandPalette()
  }
}
</script>

<style scoped></style>
