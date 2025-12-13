<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="icon" @click="router.back()">
            <ArrowLeft class="h-4 w-4" />
          </Button>
          <div class="flex items-center gap-3">
            <div v-if="app?.icon_url" class="h-10 w-10 rounded-lg overflow-hidden border">
              <img :src="app.icon_url" :alt="app.name" class="h-full w-full object-cover" />
            </div>
            <div v-else class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <AppWindow class="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight">{{ app?.name || 'Loading...' }}</h1>
              <p class="text-sm text-muted-foreground font-mono">{{ app?.app_id }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" @click="router.push(`/apps/${id}/edit`)">
          <Settings class="mr-2 h-4 w-4" />
          configure
        </Button>
        <Button variant="destructive" size="sm" @click="handleDelete" :disabled="isDeleting">
          <Trash2 class="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loader2 class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <template v-else-if="app">
      <!-- Stats -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Devices</CardTitle>
            <Smartphone class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ app.total_devices ?? 0 }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Bundles</CardTitle>
            <Package class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ app.total_bundles ?? 0 }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Channels</CardTitle>
            <Radio class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ app.total_channels ?? 0 }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Created</CardTitle>
            <Clock class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ formatDate(app.created_at) }}</div>
            <p class="text-xs text-muted-foreground">Registration Date</p>
          </CardContent>
        </Card>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-6">
          <!-- API Keys (Placeholder for now) -->
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Use these keys to configure your SDK.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <Label>Public API Key</Label>
                <div class="flex items-center gap-2">
                  <Input
                    readonly
                    value="pk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                    class="font-mono bg-muted"
                  />
                  <Button variant="outline" size="icon">
                    <Copy class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Raw Data -->
          <Card>
            <CardHeader>
              <CardTitle>Raw Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="bg-muted p-4 rounded-md font-mono text-xs overflow-x-auto">
                <pre>{{ JSON.stringify(app, null, 2) }}</pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2">
              <Button
                class="w-full justify-start"
                variant="outline"
                @click="router.push(`/channels?app_id=${app.id}`)"
              >
                <Radio class="mr-2 h-4 w-4" />
                Manage Channels
              </Button>
              <Button
                class="w-full justify-start"
                variant="outline"
                @click="router.push(`/updates-bundles?app_id=${app.id}`)"
              >
                <Package class="mr-2 h-4 w-4" />
                Manage Bundles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </template>

    <div
      v-else
      class="flex flex-col items-center justify-center py-12 text-center text-muted-foreground"
    >
      <AlertCircle class="h-12 w-12 mb-4" />
      <h3 class="text-lg font-semibold">App not found</h3>
      <p class="mb-4">The requested app could not be found.</p>
      <Button @click="router.push('/apps')">Back to Apps</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft,
  Loader2,
  Settings,
  Trash2,
  AppWindow,
  Smartphone,
  Package,
  Radio,
  Clock,
  Copy,
  AlertCircle,
} from 'lucide-vue-next'
import { useAppQuery, useDeleteAppMutation } from '@/modules/apps/composables/useAppsQuery'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const { data: app, isLoading } = useAppQuery(computed(() => props.id))
const deleteMutation = useDeleteAppMutation(props.id)
const isDeleting = ref(false)

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this app? This action cannot be undone.')) return

  isDeleting.value = true
  try {
    await deleteMutation.mutateAsync(undefined)
    router.push('/apps')
  } catch (error) {
    console.error('Failed to delete app:', error)
  } finally {
    isDeleting.value = false
  }
}

definePage({
  meta: {
    title: 'App Details - CapGO Updater',
    category: 'apps',
  },
  props: true,
})
</script>
