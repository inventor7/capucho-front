<template>
  <div class="grid gap-2">
    <div class="flex items-center gap-2">
      <div class="space-y-2">
        <Label for="start-date">Start Date</Label>
        <input
          id="start-date"
          type="date"
          :value="startDate"
          @change="handleStartDateChange"
          class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div class="space-y-2">
        <Label for="end-date">End Date</Label>
        <input
          id="end-date"
          type="date"
          :value="endDate"
          @change="handleEndDateChange"
          class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'

interface Props {
  startDate?: string
  endDate?: string
}

interface Emits {
  (e: 'update:startDate', value: string): void
  (e: 'update:endDate', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleStartDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:startDate', target.value)
}

const handleEndDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:endDate', target.value)
}
</script>
