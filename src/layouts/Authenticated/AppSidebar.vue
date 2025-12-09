<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <StoreSwitcher :stores="apps" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="storeDashboard" group-name="Dashboard" />
      <NavMain :items="storeEssentials" group-name="Product" />
      <NavMain :items="storeSettings" group-name="Settings" />
      <!-- <NavSecondary :items="navSecondary" class="mt-auto" /> -->
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
  BarChart3,
  Home,
  LifeBuoy,
  Megaphone,
  MessagesSquare,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Tv2,
  Users,
  Phone,
  Book,
  Wrench,
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
    logo: Phone,
    plan: 'Enterprise',
  },
  {
    name: 'E-lmni',
    logo: Book,
    plan: 'Startup',
  },
  {
    name: 'Vueta',
    logo: Tv2,
    plan: 'Free',
  },
]

const storeDashboard = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    isActive: true,
  },
]
const storeEssentials = [
  {
    title: 'Products',
    url: '/products',
    icon: Package,
    items: [
      {
        title: 'All Products',
        url: '/products',
      },
      {
        title: 'Categories',
        url: '/products/categories',
      },
      {
        title: 'Inventory',
        url: '/inventory',
      },
      {
        title: 'Add Product',
        url: '/products/new',
      },
    ],
  },
]

const storeSettings = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    items: [
      {
        title: 'Profile',
        url: '/settings',
      },
      {
        title: 'Store Settings',
        url: '/settings/store',
      },
      {
        title: 'Business Hours',
        url: '/settings/business-hours',
      },
      {
        title: 'Delivery Zone',
        url: '/settings/delivery-zone',
      },
      {
        title: 'Payment Methods',
        url: '/settings/payments',
      },
      {
        title: 'Notifications',
        url: '/settings/notifications',
      },
    ],
  },
  {
    title: 'Support',
    url: '/support',
    icon: LifeBuoy,
    items: [
      {
        title: 'FeedBack',
        url: '/support/feedback',
      },
      {
        title: 'FAQ',
        url: '/support/faq',
      },
      {
        title: 'Resources',
        url: '/support/resources',
      },
    ],
  },
]
</script>
