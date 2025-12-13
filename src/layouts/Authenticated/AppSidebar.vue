<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <StoreSwitcher :stores="apps" />
    </SidebarHeader>
    <SidebarContent class="flex flex-col justify-between items-start h-full">
      <div class="w-full">
        <NavMain :items="storeDashboard" group-name="Dashboard" />
        <NavMain :items="storeEssentials" group-name="Modules" />
      </div>
      <NavMain :items="storeSettings" group-name="Settings" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="navUser" />
    </SidebarFooter>
  </Sidebar>
</template>
<script setup lang="ts">
import SidebarHeader from '@/components/ui/sidebar/SidebarHeader.vue'
import { storeToRefs } from 'pinia'
import NavMain from './NavMain.vue'
import NavUser from './NavUser.vue'
import StoreSwitcher from './StoreSwitcher.vue'

import type { SidebarProps } from '@/components/ui/sidebar'
import {
  Home,
  LifeBuoy,
  Settings,
  GitBranch,
  Smartphone,
  Radio,
  AppWindow,
  ScrollText,
  BarChart3,
} from 'lucide-vue-next'

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const navUser = {
  name: user.value?.email?.split('@')[0] ?? '',
  email: user.value?.email ?? '',
  avatar: '/avatars/shadcn.jpg',
}

const apps = [
  {
    name: 'Vuena',
    logo: Smartphone,
    plan: 'Enterprise',
  },
]

const storeDashboard = [
  {
    title: 'Dashboard',
    url: '/dashboard/',
    icon: Home,
    isActive: true,
  },
]

const storeEssentials = [
  {
    title: 'Apps',
    url: '/apps',
    icon: AppWindow,
    items: [
      { title: 'All Apps', url: '/apps' },
      { title: 'Create App', url: '/apps/create' },
    ],
  },
  {
    title: 'Updates & Bundles',
    url: '/updates-bundles',
    icon: GitBranch,
    items: [
      { title: 'All Updates', url: '/updates-bundles' },
      { title: 'Upload Bundle', url: '/updates-bundles/upload' },
    ],
  },
  {
    title: 'Channels',
    url: '/channels',
    icon: Radio,
    items: [
      { title: 'All Channels', url: '/channels' },
      { title: 'Create Channel', url: '/channels/create' },
    ],
  },
  {
    title: 'Devices',
    url: '/devices',
    icon: Smartphone,
    items: [
      { title: 'All Devices', url: '/devices' },
      { title: 'Device Map', url: '/devices/map' },
    ],
  },
  {
    title: 'Update Logs',
    url: '/update-logs',
    icon: ScrollText,
    items: [{ title: 'Activity Feed', url: '/update-logs' }],
  },
  {
    title: 'Statistics',
    url: '/statistics',
    icon: BarChart3,
    items: [
      { title: 'Overview', url: '/statistics' },
      { title: 'Analytics', url: '/statistics/analytics' },
    ],
  },
]

const storeSettings = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    items: [
      { title: 'General', url: '/settings' },
      { title: 'API Keys', url: '/settings/api-keys' },
      { title: 'Webhooks', url: '/settings/webhooks' },
    ],
  },
  {
    title: 'Support',
    url: '/support',
    icon: LifeBuoy,
    items: [
      { title: 'Documentation', url: '/support/docs' },
      { title: 'Feedback', url: '/support/feedback' },
    ],
  },
]
</script>
