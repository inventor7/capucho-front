<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent bg-card data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <img
                v-if="activeApp && activeApp.icon_url"
                :src="activeApp.icon_url"
                class="size-4 object-cover"
              />
              <AppWindow v-else class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ activeApp?.name || 'Select App' }}
              </span>
              <span class="truncate text-xs">{{ activeApp?.app_id || 'No app selected' }}</span>
            </div>
            <ILucideChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground"> Apps </DropdownMenuLabel>
          <div v-if="isLoading" class="p-2 text-xs text-muted-foreground">Loading apps...</div>
          <template v-else>
            <DropdownMenuItem
              v-for="(app, index) in apps"
              :key="app.id"
              class="gap-2 p-2"
              @click="activeApp = app"
            >
              <div class="flex size-6 items-center justify-center rounded-sm border">
                <img v-if="app.icon_url" :src="app.icon_url" class="size-4 shrink-0 object-cover" />
                <AppWindow v-else class="size-4 shrink-0" />
              </div>
              {{ app.name }}
              <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </template>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2" @click="navigateToCreate">
            <div class="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground">Add app</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppsQuery } from '@/modules/apps/composables/useAppsQuery'
import { useAppStore } from '@/stores/app.store'
import { AppWindow, Plus } from 'lucide-vue-next'
import { watchEffect } from 'vue'

const router = useRouter()
const { isMobile } = useSidebar()
const appStore = useAppStore()

// Fetch apps
const { data: apps, isLoading } = useAppsQuery()

// Manage active app
const activeApp = computed({
  get: () => appStore.activeApp,
  set: (app) => appStore.setActiveApp(app || null),
})

// Set initial active app if none selected and apps loaded
watchEffect(() => {
  if (!activeApp.value && apps.value && apps.value.length > 0) {
    const firstApp = apps.value[0]
    if (firstApp) {
      activeApp.value = firstApp
    }
  }
})

// Navigation handlers
const navigateToCreate = () => {
  router.push('/apps/create')
}
</script>
