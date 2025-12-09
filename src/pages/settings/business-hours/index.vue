<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Business Hours</h1>
      <p class="text-muted-foreground">Manage your store opening and closing times</p>
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
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Business Hours</CardTitle>
            <CardDescription
              >Set your store's opening and closing times for each day of the week</CardDescription
            >
          </CardHeader>
          <CardContent>
            <form @submit.prevent="saveBusinessHours">
              <div class="space-y-4">
                <div
                  v-for="day in days"
                  :key="day.value"
                  class="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <Checkbox
                      :id="day.value"
                      v-model:model-value="day.enabled"
                      @update:model-value="
                        (value: CheckboxCheckedState) =>
                          (day.enabled = typeof value === 'boolean' ? value : false)
                      "
                    />
                    <Label :for="day.value" class="font-medium">{{ day.label }}</Label>
                  </div>

                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <Select v-model="day.openTime" :disabled="!day.enabled" class="w-24">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem v-for="time in timeOptions" :key="time" :value="time">
                            {{ time }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <span>to</span>
                      <Select v-model="day.closeTime" :disabled="!day.enabled" class="w-24">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem v-for="time in timeOptions" :key="time" :value="time">
                            {{ time }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      @click="toggleSpecialHours(day)"
                      :disabled="!day.enabled"
                    >
                      {{ day.hasSpecialHours ? 'Edit Special Hours' : 'Add Special Hours' }}
                    </Button>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-between">
                <Button type="button" variant="outline" @click="resetToDefault">
                  Reset to Default
                </Button>
                <Button type="submit">Save Business Hours</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Special Hours</CardTitle>
            <CardDescription
              >Manage special opening hours for holidays or special events</CardDescription
            >
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium">Special Hours</h3>
                <Button type="button" variant="outline" size="sm" @click="addSpecialHour">
                  <ILucidePlus class="h-4 w-4 mr-2" />
                  Add Special Hour
                </Button>
              </div>

              <div v-if="specialHours.length === 0" class="text-center py-8 text-muted-foreground">
                <ILucideCalendar class="h-12 w-12 mx-auto mb-3" />
                <p>No special hours set. Add special hours for holidays or events.</p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="(special, index) in specialHours"
                  :key="index"
                  class="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div class="font-medium">{{ formatDate(special.date) }}</div>
                    <div class="text-sm text-muted-foreground">
                      {{ special.openTime }} to {{ special.closeTime }}
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      @click="editSpecialHour(index)"
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      @click="removeSpecialHour(index)"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Special Hours Dialog -->
    <Dialog v-model:open="showSpecialHourDialog">
      <DialogTrigger as-child>
        <div class="hidden"></div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{
            editingSpecialHourIndex !== null ? 'Edit Special Hour' : 'Add Special Hour'
          }}</DialogTitle>
          <DialogDescription> Set special opening hours for a specific date </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div>
            <Label for="specialDate">Date</Label>
            <DatePicker v-model="currentSpecialHour.date" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="specialOpenTime">Opening Time</Label>
              <Select v-model="currentSpecialHour.openTime">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="time in timeOptions" :key="time" :value="time">
                    {{ time }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label for="specialCloseTime">Closing Time</Label>
              <Select v-model="currentSpecialHour.closeTime">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="time in timeOptions" :key="time" :value="time">
                    {{ time }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" @click="closeSpecialHourDialog"> Cancel </Button>
          <Button type="button" @click="saveSpecialHour">
            {{ editingSpecialHourIndex !== null ? 'Update' : 'Add' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import type { CheckboxCheckedState } from 'reka-ui'

interface SpecialHour {
  date: string
  openTime: string
  closeTime: string
}

const { showSuccess } = useToast()

// Days of the week
const days = ref([
  {
    value: 'monday',
    label: 'Monday',
    enabled: true,
    openTime: '09:00',
    closeTime: '18:00',
    hasSpecialHours: false,
  },
  {
    value: 'tuesday',
    label: 'Tuesday',
    enabled: true,
    openTime: '09:00',
    closeTime: '18:00',
    hasSpecialHours: false,
  },
  {
    value: 'wednesday',
    label: 'Wednesday',
    enabled: true,
    openTime: '09:00',
    closeTime: '18:00',
    hasSpecialHours: false,
  },
  {
    value: 'thursday',
    label: 'Thursday',
    enabled: true,
    openTime: '09:00',
    closeTime: '18:00',
    hasSpecialHours: false,
  },
  {
    value: 'friday',
    label: 'Friday',
    enabled: true,
    openTime: '09:00',
    closeTime: '18:00',
    hasSpecialHours: false,
  },
  {
    value: 'saturday',
    label: 'Saturday',
    enabled: true,
    openTime: '10:00',
    closeTime: '16:00',
    hasSpecialHours: false,
  },
  {
    value: 'sunday',
    label: 'Sunday',
    enabled: false,
    openTime: '00:00',
    closeTime: '00:00',
    hasSpecialHours: false,
  },
])

// Time options in 30-minute increments
const timeOptions = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
]

// Special hours
const specialHours = ref<SpecialHour[]>([
  { date: '2023-12-25', openTime: '10:00', closeTime: '14:00' }, // Christmas
  { date: '2024-01-01', openTime: '12:00', closeTime: '16:00' }, // New Year
])

// Special hour dialog
const showSpecialHourDialog = ref(false)
const editingSpecialHourIndex = ref<number | null>(null)
const dateStr = new Date().toISOString().split('T')[0]!
const currentSpecialHour = ref<SpecialHour>({
  date: dateStr,
  openTime: '09:00',
  closeTime: '18:00',
})

// Save business hours
const saveBusinessHours = () => {
  showSuccess('Business hours updated successfully!')
  console.log('Business hours updated:', days.value)
}

// Reset to default hours
const resetToDefault = () => {
  days.value = [
    {
      value: 'monday',
      label: 'Monday',
      enabled: true,
      openTime: '09:00',
      closeTime: '18:00',
      hasSpecialHours: false,
    },
    {
      value: 'tuesday',
      label: 'Tuesday',
      enabled: true,
      openTime: '09:00',
      closeTime: '18:00',
      hasSpecialHours: false,
    },
    {
      value: 'wednesday',
      label: 'Wednesday',
      enabled: true,
      openTime: '09:00',
      closeTime: '18:00',
      hasSpecialHours: false,
    },
    {
      value: 'thursday',
      label: 'Thursday',
      enabled: true,
      openTime: '09:00',
      closeTime: '18:00',
      hasSpecialHours: false,
    },
    {
      value: 'friday',
      label: 'Friday',
      enabled: true,
      openTime: '09:00',
      closeTime: '18:00',
      hasSpecialHours: false,
    },
    {
      value: 'saturday',
      label: 'Saturday',
      enabled: true,
      openTime: '10:00',
      closeTime: '16:00',
      hasSpecialHours: false,
    },
    {
      value: 'sunday',
      label: 'Sunday',
      enabled: false,
      openTime: '00:00',
      closeTime: '00:00',
      hasSpecialHours: false,
    },
  ]
  showSuccess('Business hours reset to default')
}

// Toggle special hours for a day
const toggleSpecialHours = (day: any) => {
  if (day.enabled) {
    day.hasSpecialHours = !day.hasSpecialHours
    showSuccess(`${day.label} special hours ${day.hasSpecialHours ? 'enabled' : 'disabled'}`)
  }
}

// Add special hour
const addSpecialHour = () => {
  editingSpecialHourIndex.value = null
  currentSpecialHour.value = {
    date: new Date().toISOString().split('T')[0]!, // Format as YYYY-MM-DD
    openTime: '09:00',
    closeTime: '18:00',
  }
  showSpecialHourDialog.value = true
}

// Edit special hour
const editSpecialHour = (index: number) => {
  editingSpecialHourIndex.value = index
  const specialHour = { ...specialHours.value[index] }
  // For dates that are already in the correct format (YYYY-MM-DD), use as is
  const dateValue = specialHour.date || new Date().toISOString().split('T')[0]!

  // Ensure we're copying with correct types and default values
  currentSpecialHour.value = {
    date: dateValue,
    openTime: specialHour.openTime || '09:00',
    closeTime: specialHour.closeTime || '18:00',
  }
  showSpecialHourDialog.value = true
}

// Remove special hour
const removeSpecialHour = (index: number) => {
  specialHours.value.splice(index, 1)
  showSuccess('Special hour removed')
}

// Save special hour
const saveSpecialHour = () => {
  if (editingSpecialHourIndex.value !== null) {
    // Update existing
    specialHours.value[editingSpecialHourIndex.value] = { ...currentSpecialHour.value }
    showSuccess('Special hour updated')
  } else {
    // Add new
    specialHours.value.push({ ...currentSpecialHour.value })
    showSuccess('Special hour added')
  }
  closeSpecialHourDialog()
}

// Close special hour dialog
const closeSpecialHourDialog = () => {
  showSpecialHourDialog.value = false
  editingSpecialHourIndex.value = null
}

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
</script>
