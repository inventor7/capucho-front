<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Account Limits</h1>
      <p class="text-muted-foreground">View your usage and account limits</p>
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
              <RouterLink
                to="/settings/feedback"
                :class="[
                  $route.path === '/settings/feedback'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideMessageCircle class="h-4 w-4" />
                Feedback
              </RouterLink>
              <RouterLink
                to="/settings/support"
                :class="[
                  $route.path === '/settings/support'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideHelpCircle class="h-4 w-4" />
                Support
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="lg:col-span-3">
        <!-- Usage Overview -->
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Usage Overview</CardTitle>
            <CardDescription>Your current usage compared to your plan limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-medium">Messages Sent</span>
                  <span class="text-sm text-muted-foreground"
                    >{{ usage.messages.used }} / {{ usage.messages.limit }}</span
                  >
                </div>
                <Progress
                  :value="calculatePercentage(usage.messages.used, usage.messages.limit)"
                  class="h-2"
                />
                <p class="text-xs text-muted-foreground mt-1">
                  {{ usage.messages.used }} of {{ usage.messages.limit }} messages used
                </p>
              </div>

              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-medium">Active Conversations</span>
                  <span class="text-sm text-muted-foreground"
                    >{{ usage.conversations.used }} / {{ usage.conversations.limit }}</span
                  >
                </div>
                <Progress
                  :value="calculatePercentage(usage.conversations.used, usage.conversations.limit)"
                  class="h-2"
                />
                <p class="text-xs text-muted-foreground mt-1">
                  {{ usage.conversations.used }} of {{ usage.conversations.limit }} conversations
                  active
                </p>
              </div>

              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-medium">Products Listed</span>
                  <span class="text-sm text-muted-foreground"
                    >{{ usage.products.used }} / {{ usage.products.limit }}</span
                  >
                </div>
                <Progress
                  :value="calculatePercentage(usage.products.used, usage.products.limit)"
                  class="h-2"
                />
                <p class="text-xs text-muted-foreground mt-1">
                  {{ usage.products.used }} of {{ usage.products.limit }} products listed
                </p>
              </div>

              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-medium">Storage Used</span>
                  <span class="text-sm text-muted-foreground"
                    >{{ usage.storage.used }} / {{ usage.storage.limit }}</span
                  >
                </div>
                <Progress
                  :value="calculatePercentage(usage.storage.used, usage.storage.limit)"
                  class="h-2"
                />
                <p class="text-xs text-muted-foreground mt-1">
                  {{ usage.storage.used }} of {{ usage.storage.limit }} storage used
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Limits Details -->
        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Account Limits</CardTitle>
            <CardDescription>Detailed view of your plan limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 class="font-medium">Messages per Month</h3>
                  <p class="text-sm text-muted-foreground">
                    Number of messages you can send per month
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatNumber(usage.messages.limit) }}</p>
                  <p class="text-sm text-muted-foreground">{{ usage.messages.used }} used</p>
                </div>
              </div>

              <div class="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 class="font-medium">Conversations</h3>
                  <p class="text-sm text-muted-foreground">Number of active conversations</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatNumber(usage.conversations.limit) }}</p>
                  <p class="text-sm text-muted-foreground">{{ usage.conversations.used }} active</p>
                </div>
              </div>

              <div class="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 class="font-medium">Products</h3>
                  <p class="text-sm text-muted-foreground">Number of products you can list</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatNumber(usage.products.limit) }}</p>
                  <p class="text-sm text-muted-foreground">{{ usage.products.used }} listed</p>
                </div>
              </div>

              <div class="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 class="font-medium">Storage</h3>
                  <p class="text-sm text-muted-foreground">File storage for images and documents</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatStorage(usage.storage.limit) }}</p>
                  <p class="text-sm text-muted-foreground">
                    {{ formatStorage(usage.storage.used) }} used
                  </p>
                </div>
              </div>

              <div class="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 class="font-medium">Team Members</h3>
                  <p class="text-sm text-muted-foreground">Number of team members you can invite</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatNumber(usage.team.limit) }}</p>
                  <p class="text-sm text-muted-foreground">{{ usage.team.used }} active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Plan Upgrade -->
        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Upgrade Plan</CardTitle>
            <CardDescription>Get more features and higher limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 class="text-lg font-medium">Current Plan: {{ currentPlan.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ currentPlan.description }}</p>
              </div>
              <Button @click="upgradePlan"> Upgrade to {{ getNextPlanName() }} </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Usage History -->
        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Usage History</CardTitle>
            <CardDescription>Your usage over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="h-64">
              <!-- In a real app, this would be a chart component -->
              <div class="flex items-end h-full gap-2 border-b border-l pl-8 pb-4">
                <div
                  v-for="(day, index) in usageHistory"
                  :key="index"
                  class="flex flex-col items-center flex-1"
                  :style="{ height: '100%' }"
                >
                  <div
                    class="w-full bg-primary rounded-t"
                    :style="{ height: `${(day.messages / 100) * 80}%` }"
                  ></div>
                  <span class="text-xs mt-2 text-muted-foreground">{{ day.date }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/composables/useToast'

const { showSuccess } = useToast()

// Mock usage data
const usage = ref({
  messages: {
    used: 85,
    limit: 100,
  },
  conversations: {
    used: 12,
    limit: 50,
  },
  products: {
    used: 45,
    limit: 100,
  },
  storage: {
    used: 2.5, // in GB
    limit: 5, // in GB
  },
  team: {
    used: 3,
    limit: 5,
  },
})

// Current plan
const currentPlan = {
  name: 'Starter Plan',
  description: 'Free plan with basic features',
}

// Usage history for the past 30 days (mock data)
const usageHistory = [
  { date: '1', messages: 75 },
  { date: '2', messages: 82 },
  { date: '3', messages: 68 },
  { date: '4', messages: 91 },
  { date: '5', messages: 77 },
  { date: '6', messages: 85 },
  { date: '7', messages: 93 },
  { date: '8', messages: 88 },
  { date: '9', messages: 76 },
  { date: '10', messages: 84 },
  { date: '11', messages: 90 },
  { date: '12', messages: 79 },
  { date: '13', messages: 87 },
  { date: '14', messages: 95 },
  { date: '15', messages: 83 },
  { date: '16', messages: 92 },
  { date: '17', messages: 86 },
  { date: '18', messages: 74 },
  { date: '19', messages: 89 },
  { date: '20', messages: 96 },
  { date: '21', messages: 81 },
  { date: '22', messages: 78 },
  { date: '23', messages: 94 },
  { date: '24', messages: 85 },
  { date: '25', messages: 87 },
  { date: '26', messages: 93 },
  { date: '27', messages: 82 },
  { date: '28', messages: 88 },
  { date: '29', messages: 90 },
  { date: '30', messages: 95 },
]

// Calculate percentage for progress bars
const calculatePercentage = (used: number, limit: number) => {
  return (used / limit) * 100
}

// Format number with thousands separator
const formatNumber = (num: number) => {
  return num.toLocaleString()
}

// Format storage size
const formatStorage = (gb: number) => {
  return `${gb} GB`
}

// Get next plan name
const getNextPlanName = () => {
  return 'Pro Plan'
}

// Upgrade plan function
const upgradePlan = () => {
  showSuccess('Plan upgrade process initiated')
  console.log('Upgrading plan')
}
</script>
