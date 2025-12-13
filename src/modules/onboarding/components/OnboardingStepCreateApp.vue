<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="space-y-2 text-center">
      <h1 class="text-3xl font-bold tracking-tight">Create your app</h1>
      <p class="text-muted-foreground">
        Let's start by naming your application and choosing its platform.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <Label for="appName">App Name</Label>
        <Input
          id="appName"
          v-model="store.appName"
          placeholder="My Awesome App"
          autofocus
          :disabled="isLoading"
        />
      </div>

      <div class="space-y-2">
        <Label for="appId">Bundle ID</Label>
        <Input
          id="appId"
          v-model="store.appId"
          placeholder="com.company.app"
          :disabled="isLoading"
        />
        <p class="text-xs text-muted-foreground">
          Unique identifier for your app (e.g. com.example.app)
        </p>
      </div>

      <div class="space-y-2">
        <Label>Platform / Framework</Label>
        <Select v-model="store.platform" :disabled="isLoading">
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="capacitor">Capacitor (Ionic)</SelectItem>
            <SelectItem value="react-native">React Native</SelectItem>
            <SelectItem value="flutter">Flutter</SelectItem>
            <SelectItem value="cordova">Cordova</SelectItem>
            <SelectItem value="android">Native Android</SelectItem>
            <SelectItem value="ios">Native iOS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div v-if="error" class="p-3 text-sm text-red-600 bg-red-50 rounded-md">
        {{ error }}
      </div>

      <div class="pt-4 flex justify-between gap-2">
        <Button type="button" variant="ghost" @click="emit('back')" :disabled="isLoading"
          >Cancel</Button
        >
        <Button type="submit" :disabled="!isValid || isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Next
          <ArrowRight v-if="!isLoading" class="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useOnboardingStore } from '@/modules/onboarding/stores/onboarding.store'
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
import { ArrowRight, Loader2 } from 'lucide-vue-next'
import { useCreateAppMutation } from '@/modules/apps/composables/useAppsQuery'
import { useAppStore } from '@/stores/app.store'
import { useQueryClient } from '@tanstack/vue-query'

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'back'): void
}>()

const store = useOnboardingStore()
const appStore = useAppStore()
const queryClient = useQueryClient()
const createMutation = useCreateAppMutation()

const isLoading = ref(false)
const error = ref<string | null>(null)

const isValid = computed(() => {
  return store.appName.length > 0 && store.appId.length > 0
})

const handleSubmit = async () => {
  if (!isValid.value) return

  error.value = null
  isLoading.value = true

  try {
    // Create the app
    const newApp = await createMutation.mutateAsync({
      app_id: store.appId,
      name: store.appName,
      // platform will be used in instructions step, not stored in app model yet
    })

    // Set as active app
    appStore.setActiveApp(newApp)

    // Invalidate queries
    await queryClient.invalidateQueries({ queryKey: ['apps'] })

    // Proceed
    emit('next')
  } catch (err: any) {
    error.value = err.message || 'Failed to create app. Bundle ID might be taken.'
  } finally {
    isLoading.value = false
  }
}
</script>
