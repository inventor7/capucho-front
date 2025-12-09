<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Settings</h1>
      <p class="text-muted-foreground">Manage your account and business settings</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar navigation -->
      <div class="lg:col-span-1">
        <div class="border rounded-lg">
          <div class="p-4 border-b">
            <h2 class="font-semibold">Settings</h2>
          </div>
          <div class="p-2">
            <nav class="space-y-1">
              <RouterLink
                to="/settings"
                :class="[
                  $route.path === '/settings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideSettings class="h-4 w-4" />
                Profile
              </RouterLink>
              <RouterLink
                to="/settings/store"
                :class="[
                  $route.path === '/settings/store'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideStore class="h-4 w-4" />
                Store
              </RouterLink>
              <RouterLink
                to="/settings/business-hours"
                :class="[
                  $route.path === '/settings/business-hours'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideClock class="h-4 w-4" />
                Business Hours
              </RouterLink>
              <RouterLink
                to="/settings/delivery-zone"
                :class="[
                  $route.path === '/settings/delivery-zone'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideMapPin class="h-4 w-4" />
                Delivery Zones
              </RouterLink>
              <RouterLink
                to="/settings/billing"
                :class="[
                  $route.path === '/settings/billing'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideCreditCard class="h-4 w-4" />
                Billing
              </RouterLink>
              <RouterLink
                to="/settings/limits"
                :class="[
                  $route.path === '/settings/limits'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideBarChart3 class="h-4 w-4" />
                Limits
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Profile Settings</CardTitle>
            <CardDescription>Manage your personal information and account details</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="saveProfile">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <Label for="name">Full Name</Label>
                    <Input id="name" v-model="profile.name" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <Label for="email">Email Address</Label>
                    <Input
                      id="email"
                      v-model="profile.email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label for="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      v-model="profile.phone"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div class="space-y-4">
                  <div>
                    <Label for="avatar">Profile Picture</Label>
                    <div class="flex items-center gap-4">
                      <Avatar class="h-16 w-16">
                        <AvatarImage :src="profile.avatar" :alt="profile.name" />
                        <AvatarFallback>{{ getInitials(profile.name) }}</AvatarFallback>
                      </Avatar>
                      <Button type="button" variant="outline" size="sm"> Change </Button>
                    </div>
                  </div>

                  <div>
                    <Label for="timezone">Timezone</Label>
                    <Select v-model="profile.timezone">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC+1">UTC+1 (Algeria)</SelectItem>
                        <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                        <SelectItem value="UTC+2">UTC+2 (CEST)</SelectItem>
                        <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="changePassword">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <Label for="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      v-model="password.current"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <Label for="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      v-model="password.new"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <Label for="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      v-model="password.confirm"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end">
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/composables/useToast'

// Define page metadata for routing
definePage({
  meta: {
    title: 'Settings - Jawbli Admin',
    description: 'Manage your account and business settings',
  },
})

const { showSuccess, showError } = useToast()

// Mock profile data
const profile = ref({
  name: 'Ahmed Benali',
  email: 'ahmed@example.com',
  phone: '+213 123 456 789',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ahmed+Benali',
  timezone: 'UTC+1',
})

// Password form data
const password = ref({
  current: '',
  new: '',
  confirm: '',
})

// Initialize form data
onMounted(() => {
  // In a real app, we would fetch user data from API
  // For now, using mock data
})

// Helper to get initials from name
const getInitials = (name: string) => {
  const names = name.split(' ')
  return names
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

// Save profile function
const saveProfile = () => {
  // In a real app, this would make an API call to save profile
  showSuccess('Profile updated successfully!')
  console.log('Profile updated:', profile.value)
}

// Change password function
const changePassword = () => {
  if (password.value.new !== password.value.confirm) {
    showError('New passwords do not match')
    return
  }

  // In a real app, this would make an API call to change password
  showSuccess('Password updated successfully!')
  console.log('Password updated')

  // Reset form
  password.value = {
    current: '',
    new: '',
    confirm: '',
  }
}
</script>
